const express = require('express');
const {
  uploadCourseVideo,
  uploadCourseTutorial,
  uploadCourseThumbnail,
  getCourseFiles,
  deleteCourseFile,
  uploadVideo,
  uploadTutorial,
  uploadThumbnail
} = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Upload video to course
router.post('/course/video', auth, roleAuth('teacher', 'admin'), uploadVideo.single('video'), uploadCourseVideo);

// Upload tutorial to course
router.post('/course/tutorial', auth, roleAuth('teacher', 'admin'), uploadTutorial.single('tutorial'), uploadCourseTutorial);

// Upload course thumbnail
router.post('/course/thumbnail', auth, roleAuth('teacher', 'admin'), uploadThumbnail.single('thumbnail'), uploadCourseThumbnail);

// Get course files
router.get('/course/:courseId/files', auth, roleAuth('teacher', 'admin'), getCourseFiles);

// Delete course file
router.delete('/course/:courseId/:fileType/:fileId', auth, roleAuth('teacher', 'admin'), deleteCourseFile);

module.exports = router;
