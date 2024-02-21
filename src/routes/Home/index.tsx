import { Link } from "react-router-dom";
import logo from "/images/logo.svg";
import playerVsPlayer from "/images/player-vs-player.svg";

const Home = () => {
  return (
    <main className="flex w-full max-w-[335px] flex-col items-center gap-20">
      <Link to="/">
        <img src={logo} alt="connect four logo" />
      </Link>
      <div className="flex w-full flex-col gap-[1.875rem] ">
        <Link
          to="/game"
          className="flex w-full items-center justify-between rounded-[20px] border-[3px] border-solid border-black bg-yellow py-3 pl-5 pr-4 text-2xl font-bold uppercase leading-[1.875rem] tracking-normal text-black shadow-[0_10px_0px_0px_rgba(0,0,0,1)] transition duration-75 hover:border-dark-purple hover:shadow-[0_10px_0px_0px_rgba(92,45,213,1)] active:translate-y-[5px] active:border-dark-purple active:shadow-[0_5px_0px_0px_rgba(92,45,213,1)]"
        >
          <span>Play vs Player</span>
          <img src={playerVsPlayer} alt="player vs player" />
        </Link>
        <Link
          to="/rules"
          className="flex w-full items-center justify-between rounded-[20px] border-[3px] border-solid border-black bg-white p-5 text-2xl font-bold uppercase leading-[1.875rem] tracking-normal text-black shadow-[0_10px_0px_0px_rgba(0,0,0,1)] transition duration-75 hover:border-dark-purple hover:shadow-[0_10px_0px_0px_rgba(92,45,213,1)] active:translate-y-[5px] active:border-dark-purple active:shadow-[0_5px_0px_0px_rgba(92,45,213,1)]"
        >
          <span>Game Rules</span>
        </Link>
      </div>
    </main>
  );
};

export default Home;
