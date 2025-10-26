const Course = require('../models/Course');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { analyzeContent } = require('../utils/openai');

// Email configuration
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Content moderation categories
const MODERATION_CATEGORIES = {
  CYBER_FRAUD: 'cyber_fraud',
  TERRORISM: 'terrorism',
  HATE_SPEECH: 'hate_speech',
  ILLEGAL_CONTENT: 'illegal_content',
  INAPPROPRIATE: 'inappropriate'
};

// Analyze course content for moderation
const analyzeCourseContent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to moderate this course' });
    }

    // Analyze course title and description
    const titleAnalysis = await analyzeContent(course.title, 'course_title');
    const descriptionAnalysis = await analyzeContent(course.description, 'course_description');

    // Analyze video files if they exist
    let videoAnalysis = { score: 100, notes: 'No videos to analyze' };
    if (course.videoFiles && course.videoFiles.length > 0) {
      // For now, we'll analyze the first video title/description
      // In a real implementation, you'd need video transcription
      const videoContent = course.videoFiles.map(v => v.title).join(' ');
      videoAnalysis = await analyzeContent(videoContent, 'video_content');
    }

    // Calculate overall score
    const overallScore = Math.min(titleAnalysis.score, descriptionAnalysis.score, videoAnalysis.score);

    // Determine moderation status
    let moderationStatus = 'approved';
    let moderationNotes = 'Content appears appropriate';

    if (overallScore < 50) {
      moderationStatus = 'rejected';
      moderationNotes = 'Content flagged for inappropriate material';
    } else if (overallScore < 80) {
      moderationStatus = 'under_review';
      moderationNotes = 'Content requires manual review';
    }

    // Update course moderation status
    course.moderationStatus = moderationStatus;
    course.moderationNotes = moderationNotes;
    course.aiReviewScore = overallScore;
    course.aiReviewNotes = `Title: ${titleAnalysis.notes}, Description: ${descriptionAnalysis.notes}, Videos: ${videoAnalysis.notes}`;

    await course.save();

    // Send email notification if content is flagged
    if (moderationStatus === 'rejected' || moderationStatus === 'under_review') {
      await sendModerationNotification(course, moderationStatus, overallScore);
    }

    res.json({
      courseId: course._id,
      title: course.title,
      moderationStatus,
      moderationNotes,
      aiReviewScore: overallScore,
      aiReviewNotes: course.aiReviewNotes,
      analysis: {
        title: titleAnalysis,
        description: descriptionAnalysis,
        videos: videoAnalysis
      }
    });
  } catch (error) {
    console.error('Content analysis error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send moderation notification email
const sendModerationNotification = async (course, status, score) => {
  try {
    const instructor = await User.findById(course.instructor);
    const adminUsers = await User.find({ role: 'admin' });

    const emailContent = {
      subject: `Course Moderation Alert: ${course.title}`,
      html: `
        <h2>Course Content Moderation Alert</h2>
        <p><strong>Course:</strong> ${course.title}</p>
        <p><strong>Instructor:</strong> ${instructor.name} (${instructor.email})</p>
        <p><strong>Status:</strong> ${status.toUpperCase()}</p>
        <p><strong>AI Score:</strong> ${score}/100</p>
        <p><strong>AI Notes:</strong> ${course.aiReviewNotes}</p>
        <p><strong>Moderation Notes:</strong> ${course.moderationNotes}</p>
        <hr>
        <p>Please review this course content at your earliest convenience.</p>
        <p><a href="${process.env.FRONTEND_URL}/admin/course-review/${course._id}">Review Course</a></p>
      `
    };

    // Send to instructor
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: instructor.email,
      ...emailContent
    });

    // Send to all admins
    for (const admin of adminUsers) {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: admin.email,
        ...emailContent
      });
    }

    console.log('Moderation notification emails sent successfully');
  } catch (error) {
    console.error('Error sending moderation notification:', error);
  }
};

// Get courses pending moderation
const getPendingModeration = async (req, res) => {
  try {
    const courses = await Course.find({
      moderationStatus: { $in: ['pending', 'under_review'] }
    })
    .populate('instructor', 'name email')
    .sort({ createdAt: -1 });

    res.json({
      courses,
      total: courses.length
    });
  } catch (error) {
    console.error('Get pending moderation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve course content
const approveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { notes } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.moderationStatus = 'approved';
    course.moderationNotes = notes || 'Content approved by moderator';
    course.moderatedBy = req.userId;
    course.moderatedAt = new Date();

    await course.save();

    // Send approval notification to instructor
    await sendApprovalNotification(course, 'approved');

    res.json({
      message: 'Course approved successfully',
      course: {
        id: course._id,
        title: course.title,
        moderationStatus: course.moderationStatus
      }
    });
  } catch (error) {
    console.error('Approve course error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject course content
const rejectCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { notes } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.moderationStatus = 'rejected';
    course.moderationNotes = notes || 'Content rejected by moderator';
    course.moderatedBy = req.userId;
    course.moderatedAt = new Date();

    await course.save();

    // Send rejection notification to instructor
    await sendApprovalNotification(course, 'rejected');

    res.json({
      message: 'Course rejected',
      course: {
        id: course._id,
        title: course.title,
        moderationStatus: course.moderationStatus
      }
    });
  } catch (error) {
    console.error('Reject course error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send approval/rejection notification
const sendApprovalNotification = async (course, status) => {
  try {
    const instructor = await User.findById(course.instructor);

    const emailContent = {
      subject: `Course ${status === 'approved' ? 'Approved' : 'Rejected'}: ${course.title}`,
      html: `
        <h2>Course ${status === 'approved' ? 'Approved' : 'Rejected'}</h2>
        <p><strong>Course:</strong> ${course.title}</p>
        <p><strong>Status:</strong> ${status.toUpperCase()}</p>
        <p><strong>Moderator Notes:</strong> ${course.moderationNotes}</p>
        <hr>
        ${status === 'approved'
          ? '<p>Your course has been approved and is now live!</p>'
          : '<p>Your course has been rejected. Please review the moderator notes and make necessary changes.</p>'
        }
        <p><a href="${process.env.FRONTEND_URL}/teacher/course/${course._id}">View Course</a></p>
      `
    };

    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: instructor.email,
      ...emailContent
    });

    console.log(`${status} notification email sent successfully`);
  } catch (error) {
    console.error(`Error sending ${status} notification:`, error);
  }
};

// Get moderation statistics
const getModerationStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: '$moderationStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalCourses = await Course.countDocuments();
    const approvedCourses = await Course.countDocuments({ moderationStatus: 'approved' });
    const pendingCourses = await Course.countDocuments({ moderationStatus: { $in: ['pending', 'under_review'] } });

    res.json({
      total: totalCourses,
      approved: approvedCourses,
      pending: pendingCourses,
      rejected: totalCourses - approvedCourses - pendingCourses,
      breakdown: stats
    });
  } catch (error) {
    console.error('Get moderation stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  analyzeCourseContent,
  getPendingModeration,
  approveCourse,
  rejectCourse,
  getModerationStats,
  sendModerationNotification
};
