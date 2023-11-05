import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListDetailProvider from './providers/ListDetailProvider';

import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/list/:id" element={<ListDetailProvider/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
