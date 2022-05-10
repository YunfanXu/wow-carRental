import { hot } from 'react-hot-loader/root';
import MainPage from './pages/MainPage';
import "./App.css";
import LoginForm from './components/LoginForm';
import JoinForm from './components/JoinForm';
import Checkout from "./pages/CheckoutPage";
import UserPage from "./pages/userPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/404Page";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };


  const [isShowJoin, setIsShowJoin] = useState(false);

  const handleJoinClick = () => {
    setIsShowJoin((isShowJoin) => !isShowJoin);
  };

  useEffect(() => {
    // localStorage.clear();
  }, [])
  return (
    <div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <Routes>

          <Route path="/" element={<MainPage handleLoginClick={handleLoginClick} handleJoinClick={handleJoinClick} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/payment" element={<Checkout />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/order" element={<OrderPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <LoginForm isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} handleJoinClick={handleJoinClick} />
      <JoinForm isShowJoin={isShowJoin} handleLoginClick={handleLoginClick} handleJoinClick={handleJoinClick} />
    </div>

  );
};

export default hot(App);
