# Vriddhi Coin Economy Implementation

## Backend Changes
- [ ] Update User model: Add vriddhiBalance (Number, default 0) and badges (Array of strings, default [])
- [ ] Update Course model: Add vriddhiPrice (Number, default 0)
- [ ] Create vriddhiController.js with functions:
  - purchaseCoins (integrate payment gateway)
  - getBalance
  - getBadges
  - earnCoins (for task completion)
  - transferCoins (for barter system)
  - awardBadge
- [ ] Update courseController.js: Modify enrollInCourse to support vriddhi payments
- [ ] Update userController.js: Add vriddhi and badge management endpoints
- [ ] Create routes/vriddhi.js for coin-related endpoints
- [ ] Update server.js to include vriddhi routes

## Frontend Changes
- [ ] Implement Settings tab in TeacherDashboard.jsx:
  - Display vriddhi balance
  - Show badge showcase
  - Coin purchase options
  - Badge management
- [ ] Update StudentDashboard.jsx: Add coin purchase and usage UI
- [ ] Update CourseDetails.jsx: Add vriddhi payment option
- [ ] Create components for:
  - CoinPurchaseModal
  - BadgeShowcase
  - VriddhiBalanceDisplay
  - BarterSystemModal

## Features to Implement
- [ ] Payment gateway integration (Stripe/Razorpay) for real money to vriddhi conversion
- [ ] Task completion rewards (ads watching, activities)
- [ ] Barter system: Badges allow free course access between teachers/students
- [ ] Badge earning logic when courses are purchased
- [ ] Coin earning from course enrollments (for teachers)

## Testing
- [ ] Test coin purchases
- [ ] Test course enrollment with vriddhi
- [ ] Test badge earning and barter system
- [ ] Test task completion rewards
