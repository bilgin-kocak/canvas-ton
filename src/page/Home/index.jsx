import { TonConnectButton } from '@tonconnect/ui-react';
import { Button, Space } from 'antd-mobile';
import '../../style/Home.css';
import { useNavigate } from 'react-router-dom';
import { useTonAddress } from '@tonconnect/ui-react';
import { getPlayer, createPlayer, updatePlayRights } from '../../services/api';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const tonAddress = useTonAddress();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (!tonAddress) {
      navigate('/login');
    }
  }, []);

  const getPlayerInfo = async (address) => {
    let player = await getPlayer(address);

    console.log(player);
    if (!player) {
      await createPlayer(address);
    }

    setUserInfo(player);
  };

  useEffect(() => {
    if (tonAddress) {
      getPlayerInfo(tonAddress);
    }
  }, [tonAddress]);

  const goDetail = async () => {
    if (userInfo.playRights === 0) {
      alert('No tickets');
      return;
    } else {
      console.log('playRights', userInfo.playRights);
      // await updatePlayRights(tonAddress, userInfo.playRights - 1);
      navigate('/detail');
    }
  };

  const goProfile = () => {
    navigate('/profile');
  };

  const goRules = () => {
    navigate('/rules');
  };

  return (
    <div className="page home_page">
      <div className="header">
        <div className="header_l">
          <div>Your Token: {userInfo.score || 0}</div>
          <div>Tickets: {userInfo.playRights || 0}</div>
        </div>
        <div className="header_r">
          <TonConnectButton />
        </div>
      </div>
      <div className="body">
        <Space direction="vertical" className="action">
          <Button onClick={goDetail}>Play</Button>
          {/* <Button>Ranking</Button> */}
          <Button onClick={goProfile}>Profile</Button>
          <Button onClick={goRules}>Rules</Button>
        </Space>
      </div>
    </div>
  );
}

export default Home;
