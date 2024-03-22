import "./App.css";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import SplashScreen from "./Pages/SplashScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
