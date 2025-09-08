# TODO: Frontend Fixes for Profile, StudentDashboard, Server Connection, and Responsiveness

## 1. Update Profile.jsx
- [x] Add useEffect to fetch user data from AuthContext on component load
- [x] Update handleSave to use AuthContext's updateProfile method instead of console.log
- [x] Handle loading and error states for profile updates
- [ ] Ensure profile image upload works with server

## 2. Update StudentDashboard.jsx
- [ ] Replace hardcoded userData with data from AuthContext
- [ ] Add useEffect to fetch courses from server on component load
- [ ] Replace hardcoded course data with fetched data
- [ ] Add loading states for data fetching
- [ ] Handle errors for failed API calls

## 3. Add Hamburger Menu for Mobile Responsiveness
- [ ] Add hamburger menu button to StudentDashboard navbar
- [ ] Implement toggle functionality for mobile menu
- [ ] Update CSS to hide/show nav links on mobile
- [ ] Ensure proper mobile layout with hamburger

## 4. Update Server Connection
- [ ] Add fetchCourses method to AuthContext or direct API call
- [ ] Ensure profile update sends data correctly to server
- [ ] Test API endpoints for courses and profile updates
- [ ] Handle authentication errors properly

## 5. Update CSS for Responsiveness
- [ ] Add CSS for hamburger menu
- [ ] Improve mobile layout for StudentDashboard
- [ ] Ensure Profile page is fully responsive
- [ ] Test on different screen sizes

## 6. Testing and Validation
- [ ] Test profile update functionality
- [ ] Test course fetching in StudentDashboard
- [ ] Test hamburger menu on mobile
- [ ] Ensure no console errors
- [ ] Verify server responses are handled correctly
