import { useState, useRef, useEffect } from 'react';
import { Dialog } from 'antd-mobile';
import qs from 'qs';
import { Context } from '../../context';
import '../../style/Detail.css';
import { useNavigate } from 'react-router-dom';
import {
  getRadiusByScore,
  getMarginRightByScore,
  randomCreatePillars,
  vw,
  vh,
} from '../../tool';
import Konva from 'konva';
import Human from './Human';
import Stick from './Stick';
import PillarsGroup from './PillarsGroup';
import exitIcon from '../../assets/exit.svg';
import AudioManage from './AudioManage';
import Timer from '../../components/Timer';
import {
  getPlayer,
  updatePlayRights,
  createPlayer,
  updateScore,
} from '../../services/api';
import { useTonAddress } from '@tonconnect/ui-react';

// data
let pillars = randomCreatePillars(3);

// Component
let layer,
  human,
  stick,
  pillarsGroup,
  total = 0,
  audioManage;

function Detail() {
  const navigate = useNavigate();
  const tonAddress = useTonAddress();
  const [userInfo, setUserInfo] = useState(null);
  const [restartTimer, setRestartTimer] = useState(false);

  const [score, setScore] = useState(0);

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

  useEffect(() => {
    if (!userInfo) return;
    init();
    return () => {
      audioManage.stopAllMusic();
      audioManage = null;
    };
  }, [userInfo]);

  const handleTimeUp = async () => {
    // add score to player
    console.log('score', score);
    console.log('userInfo', userInfo);
    await updateScore(tonAddress, score + userInfo.score);
    alert('Time is up!');
    navigate('/');
    // Dialog.alert({
    //   content: 'Time is Up!',
    //   confirmText: 'Play Again',
    //   onConfirm: async () => {
    //     restart();
    //   },
    // });
  };

  const init = () => {
    if (!audioManage) {
      audioManage = new AudioManage();
      audioManage.playBgMusic();
    }

    console.log(userInfo);

    if (userInfo.playRights > 0) {
      updatePlayRights(tonAddress, userInfo.playRights - 1);
    } else {
      Dialog.confirm({
        content: "You don't have any ticket. Do you want to buy one",
        onConfirm: async () => {
          navigate('/');
        },
        onCancel: async () => {
          navigate('/');
        },
        confirmText: 'Yes',
        cancelText: 'No',
      });
    }

    // handleStartGame();
    const stage = new Konva.Stage({
      container: 'container',
      width: vw(),
      height: vh(),
    });
    stage.container().style.backgroundColor = '#F7F7F7';
    layer = new Konva.Layer();
    layer.setAttr;

    human = new Human();
    stick = new Stick();
    pillarsGroup = new PillarsGroup(pillars);

    pillarsGroup.add(stick.node);
    layer.add(human.node);
    layer.add(pillarsGroup.node);
    stage.add(layer);

    stage.on('touchstart', () => {
      stick.stretch();
    });
    stage.on('mousedown', () => {
      stick.stretch();
    });
    stage.on('touchend', () => {
      stick.stopStretch(handleRes);
    });
    stage.on('mouseup', () => {
      stick.stopStretch(handleRes);
    });
  };

  function handleRes() {
    stick.clockwiseDown(handleFinish);
  }

  function handleFinish(long) {
    const success =
      long >= pillars[0].marginRight &&
      long <= pillars[0].marginRight + pillars[1].radius * 2;
    if (success) {
      const best = pillars[0].marginRight + pillars[1].radius;
      const current = best - Math.abs(best - long);
      if (Math.abs(best - current) < 8) {
        audioManage.playPerfect();
      }
      total += current;
      setScore(Math.floor(total));
      pillarsGroup.moveNextPillar(moveFinish);
    } else {
      audioManage.playGameOver();
      Dialog.alert({
        content: 'Game Over!',
        confirmText: 'Play Again',
        onConfirm: async () => {
          restart();
        },
      });
    }
  }

  function restart() {
    total = 0;
    layer = null;
    human = null;
    stick = null;
    pillarsGroup = null;
    total = 0;
    setScore(total);
    pillars = randomCreatePillars(3);
    // Restart the timer
    setRestartTimer(!restartTimer);
    init();
  }

  function moveFinish() {
    pillars = [
      ...pillars.slice(1),
      {
        radius: getRadiusByScore(total),
        marginRight: getMarginRightByScore(),
      },
    ];
    pillarsGroup.update(pillars);
    stick.reset(pillarsGroup);
  }

  const handleExit = () => {
    Dialog.confirm({
      content: 'Are you sure to exit?',
      onConfirm: async () => {
        navigate('/');
      },
      confirmText: 'Yes',
      cancelText: 'No',
    });
  };

  return (
    <div className="page detail_page">
      <div id="container"></div>
      <div className="score">
        <Timer onTimeUp={handleTimeUp} restartTimer={restartTimer} />
        <div>Best Score: {score}</div>
        <div>Current Score: {score}</div>
        {/* <div>Ranking: {score}</div> */}
      </div>
      <div className="close" onClick={handleExit}>
        <img className="exit" src={exitIcon} />
      </div>
    </div>
  );
}

export default Detail;
