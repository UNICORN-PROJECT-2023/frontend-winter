import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListDetailScreen from './screens/ListDetailScreen';
import ListsScreen from './screens/ListsScreen';
import AppProvider from './providers/AppProvider';
import './App.css';

function App() {

  return (
    <div className="App">
      <AppProvider >
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/lists" element={<ListsScreen/>}/>
              <Route path="/list/:id" element={<ListDetailScreen/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
