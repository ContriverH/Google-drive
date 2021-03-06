import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./authentication/Signup";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Google drive */}
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="folder/:folderId"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
