import './App.css';
import { Routes, Route } from "react-router-dom";
import Live from './Pages/Live';
import Closed from './Pages/Closed';
import Winners from './Pages/Winners';
import Purchase from './Pages/Purchase';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact element={<Live/>} />
        <Route path="/closed" exact element={<Closed/>} />
        <Route path="/winners" exact element={<Winners/>} />
        <Route path="/purchase" exact element={<Purchase/>} />
      </Routes>
    </div>
  );
}

export default App;
