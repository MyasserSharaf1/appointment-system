# Frontend Application - Appointment Management System

![React](https://img.shields.io/badge/React-18.2-blue)
![MUI](https://img.shields.io/badge/Material_UI-5.0-purple)
![Context API](https://img.shields.io/badge/Context_API-Yes-green)

##  Features


### Core Functionality
- **Role-based authentication flow** (Patient, Doctor, Admin)
- **Appointment scheduling** with time slot validation
- **Real-time status updates** (Pending/Confirmed/Completed)
- **Responsive dashboard** for all user types

### Key Components
| Component | Description |
|-----------|-------------|
| `BookAppointment` | Interactive form with doctor/time selection |
| `AppointmentList` | Filterable/sortable data table |
| `CalendarView` | Visual day/week/month calendar |
| `AdminPanel` | User management interface |

##  Project Structure

src/
├── components/ # Reusable UI components
│ ├── auth/ # Authentication forms
│ ├── appointments/ # Appointment-related components
│ ├── layout/ # Main layout components
│ └── routing/ # Protected routes
├── context/ # Global state management
│ ├── authContext.js # Authentication state
│ ├── appointmentContext.js # Appointment data
│ └── alertContext.js # Notification system
├── pages/ # Route-based pages
├── services/ # API communication
├── styles/ # Global styling
└── assets/ # Static files


## ⚙️ Setup

### Prerequisites
- Node.js v16+
- Running backend server

### Installation
1. Clone the repository
2. Navigate to frontend folder:
   cd appointment-system/frontend

3. Install dependencies:
npm install

4. Create .env file:

REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_CAPTCHA_SITE_KEY=your_key_here


5. Available Scripts
npm start    # Start development server
npm build    # Create production build
npm test     # Run test suite
npm lint     # Run ESLint


