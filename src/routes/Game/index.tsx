import { Link } from "react-router-dom";
import logo from "/images/logo.svg";
import playerOne from "/images/player-one.svg";
import playerTwo from "/images/player-two.svg";
import boardLayerBlackSmall from "/images/board-layer-black-small.svg";
import boardLayerWhiteSmall from "/images/board-layer-white-small.svg";
import counterRedSmall from "/images/counter-red-small.svg";
import counterYellowSmall from "/images/counter-yellow-small.svg";
import turnBackgroundRed from "/images/turn-background-red.svg";

const Game = () => {
  return (
    <main className="flex w-full max-w-[335px] flex-col gap-[3.125rem] py-[3.125rem]">
      <div className="gap flex w-full items-center justify-between">
        <button
          type="button"
          className="flex h-10 w-[6.75rem] items-center justify-center rounded-[20px] bg-dark-purple text-base font-bold uppercase leading-5 tracking-normal text-white transition-colors duration-75 hover:bg-red active:bg-red"
        >
          Menu
        </button>
        <Link to="/" className="h-10 w-10">
          <img className="h-full w-full" src={logo} alt="connect four logo" />
        </Link>
        <button
          type="button"
          className="flex h-10 w-[6.75rem] items-center justify-center rounded-[20px] bg-dark-purple text-base font-bold uppercase leading-5 tracking-normal text-white transition-colors duration-75 hover:bg-red active:bg-red"
        >
          Restart
        </button>
      </div>
      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full items-center justify-center gap-5">
          <div className="relative flex max-w-[148px] flex-1 flex-col items-center gap-px rounded-[20px] border-[3px] border-solid border-black bg-white py-[0.625rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-base font-bold uppercase leading-5 tracking-normal text-black">
              Player 1
            </span>
            <span className="text-[2rem] font-bold leading-10 tracking-normal text-black">
              12 {/* player 1 score */}
            </span>
            <div className="absolute -left-[27px] h-[3.688rem] w-[3.375rem]">
              <img
                className="h-full w-full"
                src={playerOne}
                alt="player one icon"
              />
            </div>
          </div>
          <div className="relative flex max-w-[148px] flex-1 flex-col items-center gap-px rounded-[20px] border-[3px] border-solid border-black bg-white py-[0.625rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-base font-bold uppercase leading-5 tracking-normal text-black">
              Player 2
            </span>
            <span className="text-[2rem] font-bold leading-10 tracking-normal text-black">
              23 {/* player 2 score */}
            </span>
            <div className="absolute -right-[27px] h-[3.688rem] w-[3.375rem]">
              <img
                className="h-full w-full"
                src={playerTwo}
                alt="player two icon"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-[19.375rem] w-full">
            <div className="absolute left-0 top-0 z-10 h-[20rem] w-full">
              <img
                className="h-full w-full"
                src={boardLayerBlackSmall}
                alt="board layer black"
              />
            </div>
            <div className="absolute left-0 top-0 z-20 grid h-full w-full grid-cols-7 gap-[0.375rem] px-2 pb-7 pt-2">
              <div className="flex w-full flex-col justify-between">
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterRedSmall}
                    alt="counter red"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterRedSmall}
                    alt="counter red"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterRedSmall}
                    alt="counter red"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterRedSmall}
                    alt="counter red"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterRedSmall}
                    alt="counter red"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterRedSmall}
                    alt="counter red"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col justify-between">
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterYellowSmall}
                    alt="counter yellow"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterYellowSmall}
                    alt="counter yellow"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterYellowSmall}
                    alt="counter yellow"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterYellowSmall}
                    alt="counter yellow"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterYellowSmall}
                    alt="counter yellow"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <img
                    className="absolute left-0 top-0 w-full"
                    src={counterYellowSmall}
                    alt="counter yellow"
                  />
                </div>
              </div>
              <div className="w-full"></div>
              <div className="w-full"></div>
              <div className="w-full"></div>
              <div className="w-full"></div>
              <div className="w-full"></div>
            </div>
            <div className="absolute left-0 top-0 z-30 h-[19.375rem] w-full">
              <img src={boardLayerWhiteSmall} alt="board layer white" />
            </div>
          </div>
          {/* turn indicator */}
          <div className="relative z-[60] -mt-4 flex h-[9.375rem] w-[11.938rem] flex-col items-center gap-[0.125rem] px-7 pb-4 pt-10">
            <span className="z-10 text-base font-bold uppercase leading-5 tracking-normal text-white">
              Player 1's turn
            </span>
            <span className="z-10 text-[3.5rem] font-bold leading-[4.5rem] tracking-normal text-white">
              15s
            </span>
            <img
              className="absolute left-0 top-0"
              src={turnBackgroundRed}
              alt=""
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
