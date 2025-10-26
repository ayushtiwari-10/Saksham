# Profile Navigation and Icon Fix

## Issues to Fix:
1. Navigation confusion: When accessing profile from student dashboard and clicking cancel, it should go back to student dashboard, not based on role.
2. Add circular profile picture icon in teacher dashboard that opens profile on click.

## Plan:
- Modify Profile.jsx handleCancel to use navigate(-1) to go back to previous page instead of role-based navigation.
- Add profile icon to TeacherDashboard.jsx in nav-user section, similar to StudentDashboard.

## Files to Edit:
- client/src/pages/Profile.jsx: Change handleCancel logic.
- client/src/pages/TeacherDashboard.jsx: Add profile icon in nav-user.

## Followup:
- Test navigation from both dashboards to profile and back.
- Ensure profile icon displays user's image or initials.
