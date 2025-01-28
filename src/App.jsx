import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "/src/components/SignIn";
import SignUp from "/src/components/SignUp";
import ForgetPassword from "/src/components/ForgetPassword";
import Dashboard from "/src/components/UserDashboard";
import UserProfile from "/src/components/UserProfile";
import AddCar from "/src/components/AddCar";
import CarDetails from "/src/components/CarDetails";
import AdminDashboard from "/src/components/AdminDashboard";
import AddCategory from "/src/components/AddCategory";
import Car from "/src/components/AdminCar";

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
