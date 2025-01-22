import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Portfolio } from './pages/Portfolio';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
