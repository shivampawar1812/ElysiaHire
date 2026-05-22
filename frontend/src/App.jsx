import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import OTPVerification from "./pages/OTPVerification/OTPVerification";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetOTPVerification from "./pages/ResetOTPVerification/ResetOTPVerification";
import ResetPassword from "./pages/ResetPassword/ResetPassword";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/verify-otp"
          element={<OTPVerification />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-otp-verification"
          element={<ResetOTPVerification />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
      </Routes>

    </BrowserRouter>

  );

}

export default App;