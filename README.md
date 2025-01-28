# Car Management Project

## Overview

The **Car Management Project** is a React-based web application for managing cars and categories. It includes user authentication, dashboards for admin and users, car details, and additional features like adding cars and categories.

## Features

- User authentication (Sign Up, Sign In, Forget Password)
- Admin dashboard for managing cars and categories
- User dashboard for viewing and managing car-related data
- Bootstrap integration for UI styling
- Routing with React Router DOM
- Form handling with Formik and validation with Yup

## Tech Stack

- **Frontend**: React.js, Bootstrap, React-Bootstrap
- **Routing**: React Router DOM
- **State Management**: Built-in React state
- **Form Handling**: Formik, Yup
- **CSS Framework**: Bootstrap

## Folder Structure

```
CAR-MANAGEMENT-PROJECT/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddCar.jsx
│   │   ├── AddCategory.jsx
│   │   ├── AdminCar.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── AppNavbar.jsx
│   │   ├── CarDetails.jsx
│   │   ├── CarDetailsModal.jsx
│   │   ├── DashboardMain.jsx
│   │   ├── ForgetPassword.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── UserProfile.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
```

## Installation

### Prerequisites

- Node.js (>= 16.x.x)
- npm (>= 8.x.x) or yarn

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/car-management-project.git
   ```
2. Navigate to the project directory:
   ```sh
   cd car-management-project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the application in the browser:
   ```
   http://localhost:5173
   ```

## Available Scripts

- **Start Development Server**: `npm run dev`
- **Build Production Files**: `npm run build`
- **Run Linter**: `npm run lint`
- **Preview Build**: `npm run preview`

## Routing

The application uses `react-router-dom` for client-side routing.

| Route                   | Component      | Description         |
| ----------------------- | -------------- | ------------------- |
| `/`                     | SignUp         | Sign-up page        |
| `/signin`               | SignIn         | Sign-in page        |
| `/forget-password`      | ForgetPassword | Password reset page |
| `/admin-dashboard`      | AdminDashboard | Admin dashboard     |
| `/admin-dashboard/cars` | AdminCar       | Manage cars         |
| `/add-category`         | AddCategory    | Add a car category  |
| `/dashboard`            | UserDashboard  | User dashboard      |
| `/profile`              | UserProfile    | User profile page   |
| `/add-car`              | AddCar         | Add a new car       |
| `/car-details/:id`      | CarDetails     | Car details page    |

## Dependencies

### Main Dependencies

```json
{
  "axios": "^1.7.9",
  "bootstrap": "^5.3.3",
  "formik": "^2.4.6",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.8",
  "react-dom": "^18.3.1",
  "react-icons": "^5.4.0",
  "react-router-dom": "^7.1.3",
  "yup": "^1.6.1"
}
```

### Dev Dependencies

```json
{
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react-swc": "^3.5.0",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "vite": "^6.0.5"
}
```

## Deployment

The project is deployed at:
[Car Managment Link](https://car-management-fe-prod.vercel.app/)
