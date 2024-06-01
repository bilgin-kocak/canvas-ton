import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import '../../style/Rules.css';

function Rules() {
  const navigate = useNavigate();

  const back = () => navigate('/');

  return (
    <div className="page rules_page">
      <NavBar onBack={back}>Rules</NavBar>
      <div className="body">
        <section>
          <h3>Game Rules</h3>
          <p>
            Players control the length of the rod by long pressing the screen so
            that when the rod falls clockwise, it just lands on the next
            platform to ensure that the villain passes the gully safely,
            otherwise the game ends
          </p>
          <p>
            When the player gets the best score, the system prompts to save the
            score and consume <b>10</b> gold coins. If you don&apos;t save, no
            gold coins will be consumed
          </p>
          <p>
            The system settles once every day at <b>00:00</b>, and rewards all
            the gold coins consumed today to all the top <b>50%</b> players on
            the leaderboard
          </p>
        </section>
        <section>
          <h3>Reward Details</h3>
          <p>All daily income is returned to the players</p>
          <p>
            The top <b>50%</b> players share <b>50%</b> of all gold coins
          </p>
          <p>
            The top <b>30%</b> players will receive an additional <b>15%</b> of
            all gold coins
          </p>
          <p>
            The top <b>15%</b> players will receive an additional <b>15%</b> of
            all gold coins
          </p>
          <p>
            The top <b>5%</b> players will receive an additional <b>10%</b> of
            all gold coins
          </p>
          <p>
            The third player will receive an additional <b>2%</b> of all gold
            coins
          </p>
          <p>
            The second player will receive an additional <b>3%</b> of all gold
            coins
          </p>
          <p>
            The first player will receive an additional <b>5%</b> of all gold
            coins
          </p>
        </section>
      </div>
    </div>
  );
}

export default Rules;
