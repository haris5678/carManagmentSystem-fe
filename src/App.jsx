import Car from "./components/AdminCar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddCar from "./components/AddCar";
import "bootstrap/dist/css/bootstrap.min.css";
import CarDetails from "./components/CarDetails";
import Dashboard from "./components/UserDashboard";
import UserProfile from "./components/UserProfile";
import AddCategory from "./components/AddCategory";
import ForgetPassword from "./components/ForgetPassword";
import AdminDashboard from "./components/AdminDashboard";
import DashboardMain from "./components/DashboardMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardMain />} />
          <Route path="cars" element={<Car />} />
        </Route>
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
