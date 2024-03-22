import MyBoard from './component/BoardMain';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyBoardDetail from './component/Article';
import MyBoardUpdate from './component/ArticleUpdate';
import MyBoardInsert from './component/ArticleInput';


function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyBoard />}></Route>
          <Route path="/:id" element={<MyBoardDetail />}></Route>
          <Route path="/insert" element={<MyBoardInsert />}></Route>
          <Route path="/update/:id" element={<MyBoardUpdate />}></Route >
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;