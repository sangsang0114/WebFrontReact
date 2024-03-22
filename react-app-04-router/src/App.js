import StudentList from './component/StudentList';
import StudentDetail from './component/StudentDetail';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentList />} >
          </Route>
          <Route path="/detail/:id" element={<StudentDetail />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;