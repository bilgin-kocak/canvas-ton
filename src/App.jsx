import { useTonAddress } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './page/Home/index';
import Login from './page/Login/index';
import Profile from './page/Profile/index';
// import NewProfile from './page/NewProfile/index';
import { Context } from './context/index';
import Rules from './page/Rules';
import Detail from './page/Detail';

// const tele = window.Telegram.WebApp;

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const tonAddress = useTonAddress();

  console.log(window.Telegram);

  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  useEffect(() => {
    const targetUrl = location.pathname + location.search;
    if (!tonAddress) {
      navigate(`/login?${targetUrl}`);
    } else {
      navigate('/');
    }
  }, []);
  if (tonAddress === undefined) return <></>;
  return (
    <Context.Provider value={{ userInfo }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/game" element={<Detail />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
