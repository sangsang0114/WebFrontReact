import MyBoard from './component/BoardMain';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyBoardDetail from './component/Article';
import MyBoardUpdate from './component/ArticleUpdate';
import MyBoardInsert from './component/ArticleInput';
import MyBoardManage from './component/BoardManage';

import MemberRegister from "./component/MemberRegister";
import MemberLogin from "./component/MemberLogin";
import MemberLogout from "./component/MemberLogout";
import MemberPage from './component/MemberPage';

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyBoard />}></Route>
          <Route path="/:id" element={<MyBoardDetail />}></Route>
          <Route path="/insert" element={<MyBoardInsert />}></Route>
          <Route path="/update/:id" element={<MyBoardUpdate />}></Route >
          <Route path="/register" element={<MemberRegister />}></Route >
          <Route path="/login" element={<MemberLogin />}></Route >
          <Route path="/logout" element={<MemberLogout />}></Route >
          <Route path="/mypage" element={<MemberPage />}></Route >
          <Route path="/manage" element={<MyBoardManage />}></Route >
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;