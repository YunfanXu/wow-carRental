import { hot } from 'react-hot-loader/root';
import MainPage from './components/MainPage';
import "./App.css";
import LoginForm from './components/LoginForm';
import JoinForm from './components/JoinForm';

import { useState } from "react";

const App = () => {
  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };


  const [isShowJoin, setIsShowJoin] = useState(true);

  const handleJoinClick = () => {
    setIsShowJoin((isShowJoin) => !isShowJoin);
  };
  return (
    <div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <MainPage handleLoginClick={handleLoginClick} handleJoinClick={handleJoinClick} />
      </div>
      <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
      <JoinForm isShowJoin={isShowJoin}  handleJoinClick={handleJoinClick} />
    </div>

  );
};

export default hot(App);
