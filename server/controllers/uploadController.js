const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Course = require('../models/Course');

// Configure multer for different file types
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/courses/videos/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const tutorialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/courses/tutorials/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const thumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/courses/thumbnails/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filters
const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|avi|mov|wmv|mkv|webm/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /video/.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only video files are allowed!'), false);
  }
};

const tutorialFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|ppt|pptx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only document files are allowed!'), false);
  }
};

const thumbnailFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /image/.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer configurations
const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: videoFilter
});

const uploadTutorial = multer({
  storage: tutorialStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: tutorialFilter
});

const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: thumbnailFilter
});

// Upload video to course
const uploadCourseVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const { courseId, title } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to upload to this course' });
    }

    // Add video to course
    const videoFile = {
      title: title || req.file.originalname,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: `/uploads/courses/videos/${req.file.filename}`,
      status: 'ready'
    };

    course.videoFiles.push(videoFile);
    await course.save();

    res.json({
      message: 'Video uploaded successfully',
      video: videoFile,
      course: {
        id: course._id,
        title: course.title,
        totalVideos: course.videoFiles.length
      }
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Upload tutorial to course
const uploadCourseTutorial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No tutorial file uploaded' });
    }

    const { courseId, title } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to upload to this course' });
    }

    // Add tutorial to course
    const tutorialFile = {
      title: title || req.file.originalname,
      filename: req.file.filename,
      originalName: req.file.originalname,
      type: path.extname(req.file.originalname).toLowerCase().substring(1),
      size: req.file.size,
      url: `/uploads/courses/tutorials/${req.file.filename}`
    };

    course.tutorialFiles.push(tutorialFile);
    await course.save();

    res.json({
      message: 'Tutorial uploaded successfully',
      tutorial: tutorialFile,
      course: {
        id: course._id,
        title: course.title,
        totalTutorials: course.tutorialFiles.length
      }
    });
  } catch (error) {
    console.error('Tutorial upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Upload course thumbnail
const uploadCourseThumbnail = async (req, res) => {
  try {
    console.log('Thumbnail upload request received');
    if (!req.file) {
      console.log('No thumbnail file uploaded');
      return res.status(400).json({ message: 'No thumbnail file uploaded' });
    }

    const { courseId } = req.body;
    console.log('Course ID:', courseId);
    const course = await Course.findById(courseId);

    if (!course) {
      console.log('Course not found');
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId) {
      console.log('Unauthorized upload attempt by user:', req.userId);
      return res.status(403).json({ message: 'Unauthorized to upload to this course' });
    }

    // Update course thumbnail
    course.thumbnail = `/uploads/courses/thumbnails/${req.file.filename}`;
    await course.save();
    console.log('Course thumbnail updated:', course.thumbnail);

    res.json({
      message: 'Thumbnail uploaded successfully',
      thumbnail: course.thumbnail,
      course: {
        id: course._id,
        title: course.title
      }
    });
  } catch (error) {
    console.error('Thumbnail upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get course files
const getCourseFiles = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate('instructor', 'name email')
      .select('title videoFiles tutorialFiles thumbnail');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to view this course' });
    }

    res.json({
      course: {
        id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        videos: course.videoFiles,
        tutorials: course.tutorialFiles
      }
    });
  } catch (error) {
    console.error('Get course files error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete course file
const deleteCourseFile = async (req, res) => {
  try {
    const { courseId, fileType, fileId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to modify this course' });
    }

    let fileDeleted = false;

    if (fileType === 'video') {
      const videoIndex = course.videoFiles.findIndex(v => v._id.toString() === fileId);
      if (videoIndex !== -1) {
        const videoFile = course.videoFiles[videoIndex];
        // Delete file from filesystem
        const filePath = path.join(__dirname, '..', 'uploads', 'courses', 'videos', videoFile.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        course.videoFiles.splice(videoIndex, 1);
        fileDeleted = true;
      }
    } else if (fileType === 'tutorial') {
      const tutorialIndex = course.tutorialFiles.findIndex(t => t._id.toString() === fileId);
      if (tutorialIndex !== -1) {
        const tutorialFile = course.tutorialFiles[tutorialIndex];
        // Delete file from filesystem
        const filePath = path.join(__dirname, '..', 'uploads', 'courses', 'tutorials', tutorialFile.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        course.tutorialFiles.splice(tutorialIndex, 1);
        fileDeleted = true;
      }
    }

    if (fileDeleted) {
      await course.save();
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Delete course file error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  uploadVideo,
  uploadTutorial,
  uploadThumbnail,
  uploadCourseVideo,
  uploadCourseTutorial,
  uploadCourseThumbnail,
  getCourseFiles,
  deleteCourseFile
};
