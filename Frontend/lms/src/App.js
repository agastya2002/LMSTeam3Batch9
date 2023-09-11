import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login"
import CustomerDetails from './Pages/CustomerDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Services/ProtectedRoute';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<CustomerDetails/>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  ); 
}

export default App;
