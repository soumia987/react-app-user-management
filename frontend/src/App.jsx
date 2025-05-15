import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;