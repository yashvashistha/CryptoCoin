import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import ChartDisplay from './Components/ChartDisplay.js';
import NavigationBar from './Components/NavigationBar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ChartDisplay />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
