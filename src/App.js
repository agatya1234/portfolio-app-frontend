import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Portfolio } from './pages/Portfolio';
import Landing from './pages/Landing';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  return (
    <>
      {(location.pathname !== '/' && location.pathname !== '/login') && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
