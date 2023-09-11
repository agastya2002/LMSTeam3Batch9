import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login"
import CustomerDetails from './Pages/CustomerDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<CustomerDetails/>} />
      </Routes>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
