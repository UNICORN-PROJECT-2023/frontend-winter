import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListDetailScreen from './screens/ListDetailScreen';
import ListsScreen from './screens/ListsScreen';

import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/lists" element={<ListsScreen/>}/>
            <Route path="/list/:id" element={<ListDetailScreen/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
