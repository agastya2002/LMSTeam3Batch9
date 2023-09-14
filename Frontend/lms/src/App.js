import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login"
import CustomerDetails from './Pages/CustomerDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Services/ProtectedRoute';
import Profile from './Pages/Profile';
import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import ApplyForLoan from './Pages/ApplyForLoan';
import AdminEditLoan from './Pages/AdminEditLoan';
import { CustomerItemsPurchased } from './Pages/CustomerItemsPurchased';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<CustomerDetails/>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/UserDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          {/* <Route path="/ViewLoan" element={<ProtectedRoute><ViewLoans/></ProtectedRoute>} />*/}
          <Route path="/ApplyLoan" element={<ApplyForLoan/>} />
          <Route path="/ViewItem" element={<ProtectedRoute><CustomerItemsPurchased/></ProtectedRoute>} />
          {/*<Route path="/CustomerDataManagement" element={<ProtectedRoute><CustomerDataManagement/></ProtectedRoute>} />*/}
          {/* <Route path="/LoanCardManagement" element={<ProtectedRoute><LoanCardManagement/></ProtectedRoute>} />*/}
          {/*<Route path="/ItemsMasterData" element={<ProtectedRoute><ItemsMasterData/></ProtectedRoute>} /> */}
          <Route path="/adminEditLoan" element={<AdminEditLoan/>} />
          
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  ); 
}

export default App;
