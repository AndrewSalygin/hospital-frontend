import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./components/AppRouter"
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin'
import Registration from './pages/Registration'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/register" element={<Registration/>} />
          <Route path = "/admin-login" element={<AdminLogin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
