import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./components/UserDashboard";
import UserProfile from "./components/UserProfile";
import AddCar from "./components/AddCar";
import CarDetails from "./components/CarDetails";
import AdminDashboard from "./components/AdminDashboard";
import AddCategory from "./components/AddCategory";
import Car from "./components/AdminCar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/cars" element={<Car />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
