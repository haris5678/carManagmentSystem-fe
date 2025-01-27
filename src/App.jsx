// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import Signup from "../src/components/signup"; // Import Signup component

// function App() {
//   return (
//     <Router>
//       <div>
//         <div>
//           <a href="https://vite.dev" target="_blank">
//             <img src={viteLogo} className="logo" alt="Vite logo" />
//           </a>
//           <a href="https://react.dev" target="_blank">
//             <img src={reactLogo} className="logo react" alt="React logo" />
//           </a>
//         </div>
//         <h1>Vite + React</h1>
//         <Routes>
//           <Route path="/signup" element={<Signup />} />

//           <Route
//             path="/"
//             element={
//               <p>Welcome! Use /signup to navigate to the signup page.</p>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Signup from "./components/Signup"; 
import SignIn from "./components/SignIn";
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./components/UserDashboard";
import UserProfile from "./components/UserProfile";
import SignUp from "./components/signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
