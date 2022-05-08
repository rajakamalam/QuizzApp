import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Questions from './Components/Questions'
import Summary from './Components/Summary'

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
