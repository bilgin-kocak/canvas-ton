import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer, createPlayer } from '../../services/api';
import '../../style/LoginSign.css';

function Login() {
  const navigate = useNavigate();
  const tonAddress = useTonAddress();

  const handleAddress = async (address) => {
    if (address) {
      if (location.search) {
        let player = await getPlayer(address);
        console.log(player);
        if (!player) {
          await createPlayer(address);
        }
        console.log('login success', location.search.substring(1));
        navigate('/');
      } else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    handleAddress(tonAddress);
  }, [tonAddress]);

  return (
    <div className="page login_page">
      <TonConnectButton />
    </div>
  );
}

export default Login;
