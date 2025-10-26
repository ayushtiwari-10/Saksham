# Implementing Placeholder Functionality

## Current Work
Implementing functionality for placeholder sections in the website, focusing on TeacherDashboard tabs, CourseDetails data display, and other incomplete components like chatbox, my-videos, schedule.

## Key Technical Concepts
- React hooks (useState, useEffect) for data fetching and state management.
- API integration using axios in services/api.js.
- MongoDB models (Course, User, Analytics, LocalClass) for data population.
- Seed data enhancement for testing.
- Responsive UI with CSS modules or styled-jsx.

## Relevant Files and Code
- client/src/pages/TeacherDashboard.jsx: Main file for dashboard tabs; currently has placeholder renders.
- server/seed-courses.js: Existing seed script; needs addition of lessons, learningObjectives, prerequisites.
- client/src/components/chatbox.jsx: UI for chat; needs useEffect to fetch from /chatbox.
- client/src/features/my-videos/page.jsx: My videos page; needs fetch from /myVideos.
- client/src/features/schedule/page.jsx: Schedule page; needs fetch from /schedule.
- client/src/components/CourseDetails.jsx: Displays course data; placeholders for missing fields.
- server/controllers/analyticsController.js: For educator analytics; may need getEducatorAnalytics if missing.
- New: server/seed-localclasses.js for LocalClass sample data.

## Problem Solving
- Placeholders indicate missing data or API integration; solve by populating seed data and adding fetch logic.
- Ensure authentication in fetches using AuthContext.
- Handle loading/error states in new implementations.

## Pending Tasks and Next Steps
1. [x] Update server/seed-courses.js: Add sample lessons (array of {title, description, duration}), learningObjectives (array of strings), prerequisites (array of course IDs or strings) to existing courses. Run the seed script to populate DB.
   - Quote: "Add sample lessons, learningObjectives, prerequisites to courses for testing."

2. [ ] Implement Students tab in client/src/pages/TeacherDashboard.jsx: Fetch teacher's courses via /courses/teacher, aggregate unique students from enrolledStudents, display list with names, courses enrolled, progress. Use useEffect and state for students data.
   - Quote: "Students tab: Fetch teacher's courses and display aggregated enrolled students list with names/progress."

3. [ ] Implement Analytics tab in client/src/pages/TeacherDashboard.jsx: Fetch from /analytics/educator (add endpoint if missing in analyticsController.js), display stats like total views, enrollments per course, simple bar chart using CSS or library.
   - Quote: "Analytics tab: Fetch from /analytics/educator and display charts/stats (views, enrollments per course)."

4. [ ] Implement Earnings tab in client/src/pages/TeacherDashboard.jsx: Fetch courses, calculate earnings as sum(course.price * paidEnrollments.length) assuming all enrollments paid; display total, per course breakdown.
   - Quote: "Earnings tab: Calculate and display total earnings from course prices * paid enrollments."

5. [ ] Implement Settings tab in client/src/pages/TeacherDashboard.jsx: Add form for updating name, bio, phone; on submit, call /users/update via api.put('/users', data).
   - Quote: "Settings tab: Add form to update user profile (name, bio, phone) via /users/update."

6. [ ] Update client/src/components/chatbox.jsx: Add useEffect to fetch messages/users from /chatbox, display in list with search filtering.
   - Quote: "Update chatbox.jsx: Add useEffect to fetch data from their APIs and display in cards."

7. [ ] Update client/src/features/my-videos/page.jsx: Add useEffect to fetch videos from /myVideos, display in grid with thumbnails/titles.
   - Quote: "Update my-videos.jsx: Add useEffect to fetch data from their APIs and display in cards."

8. [ ] Update client/src/features/schedule/page.jsx: Add useEffect to fetch schedule from /schedule, display calendar or list of events.
   - Quote: "Update schedule.jsx: Add useEffect to fetch data from their APIs and display in cards."

9. [ ] Create server/seed-localclasses.js: Add sample LocalClass data (title, description, location, instructor, etc.), run to populate if LocalClasses-new.jsx empty.
   - Quote: "Add sample LocalClass data to a new seed-localclasses.js if needed."

10. [ ] Minor tweaks to client/src/components/CourseDetails.jsx: Ensure lessons/objectives/prerequisites render properly with sample data; add loading if needed.
    - Quote: "Enhance CourseDetails.jsx: Ensure it displays lessons/objectives/prerequisites; no major changes needed if data added."

11. [ ] If needed, update server/controllers/analyticsController.js: Add getEducatorAnalytics to return views/enrollments for teacher's courses.
    - Quote: "server/controllers/analyticsController.js (if basic stats missing, add getEducatorAnalytics)."

12. [ ] Test: Login as teacher/student, navigate sections, verify no placeholders, data loads. Use browser_action for UI verification.
    - Quote: "Test: Login as teacher/student, navigate to dashboard tabs, verify data loads without placeholders. Enroll in a course to test PersonalLibrary and CourseDetails."
