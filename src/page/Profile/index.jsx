import {
  NavBar,
  Toast,
  Space,
  Button,
  Popup,
  Form,
  Stepper,
  Dialog,
} from 'antd-mobile';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultUser from '../../assets/defaultUser.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import { getPlayer, createPlayer, updatePlayRights } from '../../services/api';

import '../../style/Profile.css';

function createTransaction(amount) {
  return {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: 'EQBAkV45fqywDOfqGT8Fh0su-w_qvzDaQBNNgoGsHH8R4jLI',
        amount: `${(amount / 10) * 10 ** 9}`,
      },
    ],
  };
}

function Profile() {
  const navigate = useNavigate();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [submitAddrVisible, setSubmitAddrVisible] = useState(false);
  const [buyTicketAmount, setBuyTicketAmount] = useState(10);
  const tonAddress = useTonAddress();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!tonAddress) {
      navigate('/login');
    }
  }, [tonAddress]);

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

  const back = () => navigate('/');

  const transaction = {
    messages: [
      {
        address: '0QDu3flQkK2MxfMG-xn8AwKCkKokn-Yjkv1gTfbN6YkxA3ay', // destination address
        amount: '10000000', //Toncoin in nanotons
      },
    ],
  };

  const sendTransaction = async () => {
    tonConnectUI.sendTransaction(transaction);
  };

  const buyAmount = async () => {
    await sendTransaction();
    // Update the number of tickets
    await updatePlayRights(tonAddress, userInfo.playRights + buyTicketAmount);
    setSubmitAddrVisible(true);
  };

  const sellAmount = () => {
    Toast.show({ content: 'In development...' });
  };

  const reConfirm = (values) => {
    Dialog.confirm({
      content: (
        <div className="re_confirm_amount">
          <div className="title">Please Confirm</div>
          <div className="content">
            You will buy <b>{values.amount}</b> Ticket, Total Cost{' '}
            <b>{values.amount / 10}</b> TON
          </div>
        </div>
      ),
      onConfirm: async () => {
        await handleBuy(values);
      },
    });
  };

  const handleBuy = async (values) => {
    const { amount } = values;
    try {
      await tonConnectUI.sendTransaction(createTransaction(amount));
      Toast.show({ content: 'Purchase Completed' });
      setSubmitAddrVisible(false);
    } catch (error) {
      Toast.show({ content: 'Purchase error, please try again later' });
    }
  };

  return (
    <div className="page profile_page">
      <NavBar onBack={back}>Profile</NavBar>
      <div className="body">
        <img className="verify_icon" src={defaultUser} alt="" />
        <div className="name">Name</div>
        <div className="amount">
          Tickets：{userInfo ? userInfo.playRights : 0}
        </div>
        <Space direction="vertical" className="action">
          <Button onClick={buyAmount}>Buy Ticket</Button>
          {/* <Button onClick={sellAmount}>Sell Gold</Button> */}
        </Space>
      </div>
      <Popup
        visible={submitAddrVisible}
        onMaskClick={() => {
          setSubmitAddrVisible(false);
        }}
        onClose={() => {
          setSubmitAddrVisible(false);
        }}
      >
        <div className="confirm_amount_pop">
          <Form
            layout="horizontal"
            onFinish={reConfirm}
            footer={
              <div>
                <Button block type="submit" color="primary">
                  Purchase
                </Button>
              </div>
            }
          >
            <Form.Item
              name="amount"
              label="Number of Tickets"
              childElementPosition="right"
              onChange={(e) => {
                // setBuyTicketAmount(e.target.value);
                console.log(e);
              }}
              initialValue={buyTicketAmount}
            >
              <Stepper
                step={10}
                min={10}
                onChange={(value) => {
                  console.log(value);
                  setBuyTicketAmount(value);
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </Popup>
    </div>
  );
}

export default Profile;
