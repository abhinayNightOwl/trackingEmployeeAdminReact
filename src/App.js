import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Forget from "./Pages/Forget/Forget";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Terms from "./Pages/Terms/Terms";
import EmployeeHistory from "./Pages/Employee History/EmployeeHistory";
import EmployeeLeaveHistory from "./Pages/EmployeeLeaveHistory/EmployeeLeaveHistory";
import Profile from "./Pages/Profile/Profile";
import EmployeeLeaveProfile from "./Pages/EmployeeLeaveProfile/EmployeeLeaveProfile";
import EmployeeLocation from "./Pages/Dashboard/EmployeeLocation";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/location/:latitude/:longitude" element={<EmployeeLocation />} />
          <Route path="/employee-history" Component={EmployeeHistory} />
          <Route path="/employee-leave" Component={EmployeeLeaveHistory} />
          <Route path="/employee-leave-profile/:employeeId" element={<EmployeeLeaveProfile />} />
          <Route path="/profile/:userId" element={<Profile/>} />
          <Route path="/dashboard/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/forget" Component={Forget}/>
          <Route path="/terms" Component={Terms}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;