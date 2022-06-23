import './App.css';
import { Routes, Route } from "react-router-dom";
import Live from './Pages/Live';
import Closed from './Pages/Closed';
import Winners from './Pages/Winners';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact element={<Live/>} />
        <Route path="/closed" exact element={<Closed/>} />
        <Route path="/winners" exact element={<Winners/>} />
      </Routes>
    </div>
  );
}

export default App;
