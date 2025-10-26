# Complete All 9 Features Plan

## Information Gathered:
- Project has UI for all features but missing API integrations, data flows, and seeding.
- Backend models/routes exist for most (Course, User, Progress, etc.), but controllers incomplete (e.g., no enroll, no Stripe).
- Frontend routes in App.jsx cover pages, but components like Courses.jsx lack handlers.
- No seeded enrollments; seed-courses.js needs extension for students/enrollments.
- AuthContext and api.js handle tokens, but roleAuth middleware underused.
- Dependencies: Need stripe for payments (install in server), socket.io for chat if real-time.

## Plan:
1. **Course Enrollment & My Library**:
   - Backend: Add /api/courses/enroll POST in courseController.js (add student to enrolledStudents, create Progress entry).
   - Frontend: In Courses.jsx, add "Enroll" button calling api.post('/courses/enroll', {courseId}).
   - Update PersonalLibrary.jsx to fetch /api/courses/enrolled and display with backend progress (remove localStorage).
   - Seed: Extend seed-courses.js to create test student and enroll.

2. **Teacher Course Creation**:
   - Backend: Complete createCourse in courseController to save wizard data, integrate uploadController for thumbnails.
   - Frontend: In CourseCreationWizard.jsx, add form submission to api.post('/courses', data), navigate to /teacher/course/:id.
   - Add moderation check in createCourse (status: 'pending').

3. **AI Chatbot**:
   - Backend: Ensure aiController handles /api/ai/chat POST with OpenAI.
   - Frontend: In AIChatbot.jsx, add message sending via api.post('/ai/chat', {message}), display responses.

4. **Personalization & Survey**:
   - Backend: Add learnerProfileController.js with saveSurvey POST to update LearnerProfile model.
   - Frontend: In SurveyForm.jsx, submit form to api.post('/learner-profile/survey', data).
   - Update StudentDashboard recommendations to use /api/courses/recommended based on profile.

5. **Local Classes**:
   - Backend: Add LocalClass model, localClassesController with CRUD routes /api/local-classes.
   - Frontend: In LocalClasses.jsx, fetch /api/local-classes, add create/view forms.

6. **Payments & Stripe**:
   - Backend: Install stripe, add paymentController with createPaymentIntent POST, webhook for success (update enrollment).
   - Frontend: In CourseDetails.jsx, add Stripe Elements for purchase, call /api/payments/create-intent.

7. **Chatbox, My Videos, Schedule**:
   - Backend: Complete chatboxController for /api/chatbox/messages, add socket.io for real-time.
   - Frontend: In chatbox.jsx, integrate socket.io-client for live chat.
   - My Videos: Use uploadController for video files, list in my-videos.jsx via /api/my-videos.
   - Schedule: Add scheduleController for /api/schedule/events, use react-calendar in schedule.jsx.

8. **Profile & Role Switching**:
   - Backend: In userController updateProfile, add role change validation (e.g., email confirmation).
   - Frontend: In Profile.jsx, after role change, redirect based on new role.

9. **Analytics & Moderation**:
   - Backend: Complete analyticsController for /api/analytics/teacher, fetch real data from models.
   - Frontend: In TeacherDashboard.jsx, fetch /api/analytics in analytics tab, display charts (add recharts).
   - Add moderation UI in new Moderation.jsx page, route /moderation, fetch /api/moderation/pending.

## Dependent Files:
- Backend: courseController.js, userController.js, new controllers (learnerProfile, payment, localClasses).
- Frontend: Courses.jsx, CourseCreationWizard.jsx, AIChatbot.jsx, SurveyForm.jsx, LocalClasses.jsx, CourseDetails.jsx, chatbox.jsx, my-videos.jsx, schedule.jsx, Profile.jsx, TeacherDashboard.jsx.
- Models: Add fields if needed (e.g., paymentStatus in Course).
- Install: stripe, socket.io, recharts (npm i in client/server).

## Followup Steps:
- Run extended seed script for test data.
- Test each feature: Launch browser, login student/teacher, perform actions, check network/console.
- Error handling: Add try-catch in all API calls.
- Security: Ensure roleAuth on teacher routes.

Proceed step-by-step: Start with 1 (enrollment), test, then 2, etc.
