import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuModal from "../../components/MenuModal";
import logo from "/images/logo.svg";
import playerOne from "/images/player-one.svg";
import playerTwo from "/images/player-two.svg";
import boardLayerBlackSmall from "/images/board-layer-black-small.svg";
import boardLayerBlackLarge from "/images/board-layer-black-large.svg";
import boardLayerWhiteSmall from "/images/board-layer-white-small.svg";
import boardLayerWhiteLarge from "/images/board-layer-white-large.svg";
import counterRedSmall from "/images/counter-red-small.svg";
import counterRedLarge from "/images/counter-red-large.svg";
import counterYellowSmall from "/images/counter-yellow-small.svg";
import counterYellowLarge from "/images/counter-yellow-large.svg";
import turnBackgroundRed from "/images/turn-background-red.svg";
import turnBackgroundYellow from "/images/turn-background-yellow.svg";
import iconCircle from "/images/icon-circle.svg";
import iconCircleLarge from "/images/icon-circle-large.svg";

const ROWS = 6;
const COLS = 7;

type Player = "red" | "yellow" | null;

const Game: React.FC = () => {
  const [board, setBoard] = useState<Player[][]>(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => null),
    ),
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("red");
  const [startingPlayer, setStartingPlayer] = useState<Player>("red");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [scores, setScores] = useState<{ red: number; yellow: number }>({
    red: 0,
    yellow: 0,
  });
  const [timer, setTimer] = useState(30); // Initial timer value
  const [winningCells, setWinningCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dropPiece = (col: number) => {
    if (winner) return;

    const newBoard = [...board];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        checkWinner(row, col);
        setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
        setTimer(30); // Reset timer

        return;
      }
    }
  };

  const checkWinner = (row: number, col: number) => {
    const player = board[row][col];

    // Check horizontally
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[row][c] === player &&
        board[row][c + 1] === player &&
        board[row][c + 2] === player &&
        board[row][c + 3] === player
      ) {
        setWinner(player);
        setWinningCells([
          { row, col: c },
          { row, col: c + 1 },
          { row, col: c + 2 },
          { row, col: c + 3 },
        ]);
        setScores((prevScores) => ({
          ...prevScores,
          [player === "red" ? "red" : "yellow"]:
            prevScores[player === "red" ? "red" : "yellow"] + 1,
        }));
        return;
      }
    }

    // Check vertically
    for (let r = 0; r <= ROWS - 4; r++) {
      if (
        board[r][col] === player &&
        board[r + 1][col] === player &&
        board[r + 2][col] === player &&
        board[r + 3][col] === player
      ) {
        setWinner(player);
        setWinningCells([
          { row: r, col },
          { row: r + 1, col },
          { row: r + 2, col },
          { row: r + 3, col },
        ]);
        setScores((prevScores) => ({
          ...prevScores,
          [player === "red" ? "red" : "yellow"]:
            prevScores[player === "red" ? "red" : "yellow"] + 1,
        }));
        return;
      }
    }

    // Check diagonally (top-left to bottom-right)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        if (
          board[r][c] === player &&
          board[r + 1][c + 1] === player &&
          board[r + 2][c + 2] === player &&
          board[r + 3][c + 3] === player
        ) {
          setWinner(player);
          setWinningCells([
            { row: r, col: c },
            { row: r + 1, col: c + 1 },
            { row: r + 2, col: c + 2 },
            { row: r + 3, col: c + 3 },
          ]);
          setScores((prevScores) => ({
            ...prevScores,
            [player === "red" ? "red" : "yellow"]:
              prevScores[player === "red" ? "red" : "yellow"] + 1,
          }));
          return;
        }
      }
    }

    // Check diagonally (top-right to bottom-left)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = COLS - 1; c >= 3; c--) {
        if (
          board[r][c] === player &&
          board[r + 1][c - 1] === player &&
          board[r + 2][c - 2] === player &&
          board[r + 3][c - 3] === player
        ) {
          setWinner(player);
          setWinningCells([
            { row: r, col: c },
            { row: r + 1, col: c - 1 },
            { row: r + 2, col: c - 2 },
            { row: r + 3, col: c - 3 },
          ]);
          setScores((prevScores) => ({
            ...prevScores,
            [player === "red" ? "red" : "yellow"]:
              prevScores[player === "red" ? "red" : "yellow"] + 1,
          }));
          return;
        }
      }
    }

    // Check for draw
    if (board.every((row) => row.every((cell) => cell !== null))) {
      setWinner("draw");
      return;
    }
  };

  const resetGame = () => {
    setBoard(
      Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => null),
      ),
    );

    let nextStartingPlayer: Player;
    if (winner) {
      nextStartingPlayer = startingPlayer === "red" ? "yellow" : "red";
    } else {
      nextStartingPlayer = startingPlayer;
    }

    if (showMenuModal) {
      toggleMenu();
    }

    setStartingPlayer(nextStartingPlayer);
    setCurrentPlayer(nextStartingPlayer);
    setWinningCells([]);
    setWinner(null);
    setTimer(30);
  };

  const toggleMenu = () => {
    setShowMenuModal((prevShowMenuModal) => !prevShowMenuModal);

    if (!showMenuModal) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Start the timer when the component mounts and modal is closed
    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerId);
          // Forfeit turn if timer runs out
          setCurrentPlayer((prevPlayer) =>
            prevPlayer === "red" ? "yellow" : "red",
          );
          setTimer(30); // Reset timer
        }
        return prevTimer > 0 ? prevTimer - 1 : prevTimer;
      });
    }, 1000);

    // Pause timer when modal is open
    if (showMenuModal) {
      clearInterval(timerId);
    }

    // Clean up the timer when the component unmounts or when a player wins
    return () => {
      clearInterval(timerId);
    };
  }, [currentPlayer, winner, showMenuModal]); // Add showMenuModal to the dependency array

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative flex w-full max-w-[335px] flex-col gap-[3.125rem] pb-24 pt-[3.125rem] md:max-w-[632px] md:gap-8 md:pb-[5.25rem] md:pt-[1.875rem]">
      <div className="gap flex w-full items-center justify-between">
        <button
          type="button"
          className="flex h-10 w-[6.75rem] items-center justify-center rounded-[20px] bg-dark-purple text-base font-bold uppercase leading-5 tracking-normal text-white transition-colors duration-75 hover:bg-red active:bg-red"
          onClick={toggleMenu}
        >
          Menu
        </button>
        <Link to="/" className="h-10 w-10">
          <img className="h-full w-full" src={logo} alt="connect four logo" />
        </Link>
        <button
          type="button"
          className="flex h-10 w-[6.75rem] items-center justify-center rounded-[20px] bg-dark-purple text-base font-bold uppercase leading-5 tracking-normal text-white transition-colors duration-75 hover:bg-red active:bg-red"
          onClick={resetGame}
        >
          Restart
        </button>
      </div>
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <div className="flex w-full items-center justify-center gap-5 md:gap-10">
          {/* Player 1 */}
          <div className="relative flex max-w-[148px] flex-1 flex-col items-center gap-px rounded-[20px] border-[3px] border-solid border-black bg-white py-[0.625rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)] md:max-w-[272px] md:flex-row md:justify-between md:py-[0.875rem] md:pl-11 md:pr-5">
            <span className="text-base font-bold uppercase leading-5 tracking-normal text-black md:text-[1.25rem] md:leading-[1.594rem]">
              Player 1
            </span>
            <span className="text-[2rem] font-bold leading-10 tracking-normal text-black md:text-[3.5rem] md:leading-[4.5rem]">
              {scores.red}
            </span>
            <div className="absolute -left-[27px] h-[3.688rem] w-[3.375rem]">
              <img
                className="h-full w-full"
                src={playerOne}
                alt="player one icon"
              />
            </div>
          </div>
          {/* Player 2 */}
          <div className="relative flex max-w-[148px] flex-1 flex-col items-center gap-px rounded-[20px] border-[3px] border-solid border-black bg-white py-[0.625rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)] md:max-w-[272px] md:flex-row-reverse md:justify-between md:py-[0.875rem] md:pl-5 md:pr-11">
            <span className="text-base font-bold uppercase leading-5 tracking-normal text-black md:text-[1.25rem] md:leading-[1.594rem]">
              Player 2
            </span>
            <span className="text-[2rem] font-bold leading-10 tracking-normal text-black md:text-[3.5rem] md:leading-[4.5rem]">
              {scores.yellow}
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
        {/* Game board */}
        <div className="flex flex-col items-center">
          <div className="relative h-[19.375rem] w-full md:h-[36.5rem]">
            <div className="absolute left-0 top-0 z-10 h-[20rem] w-full md:h-[37.125rem]">
              <img
                className="h-full w-full"
                src={
                  windowWidth < 768
                    ? boardLayerBlackSmall
                    : boardLayerBlackLarge
                }
                alt="board layer black"
              />
            </div>
            <div className="absolute left-0 top-0 z-20 grid h-full w-full grid-cols-7 gap-[0.375rem] px-2 pb-7 pt-2 md:gap-4 md:px-4 md:pb-14 md:pt-4">
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isWinningCell = winningCells.some(
                    (winningCell) =>
                      winningCell.row === rowIndex &&
                      winningCell.col === colIndex,
                  );

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`flex w-full cursor-pointer flex-col justify-between ${
                        isWinningCell ? "winning-cell" : ""
                      }`}
                      onClick={() => dropPiece(colIndex)}
                    >
                      <div className="relative flex h-10 w-10 items-center justify-center md:h-[4.5rem] md:w-[4.5rem]">
                        {cell === "red" && (
                          <img
                            className="fall absolute left-0 top-0 w-full"
                            src={
                              windowWidth < 768
                                ? counterRedSmall
                                : counterRedLarge
                            }
                            alt="counter red"
                          />
                        )}
                        {cell === "yellow" && (
                          <img
                            className="fall absolute left-0 top-0 w-full"
                            src={
                              windowWidth < 768
                                ? counterYellowSmall
                                : counterYellowLarge
                            }
                            alt="counter yellow"
                          />
                        )}
                        <img
                          className={`pointer-events-none z-10 transform transition delay-500 duration-500 ${
                            isWinningCell
                              ? "translate-y-0 opacity-100"
                              : "-translate-y-[100px] opacity-0 md:-translate-y-[200px]"
                          }`}
                          src={windowWidth < 768 ? iconCircle : iconCircleLarge}
                          alt="circle icon"
                        />
                      </div>
                    </div>
                  );
                }),
              )}
            </div>
            <div className="pointer-events-none absolute left-0 top-0 z-30 h-[19.375rem] w-full">
              <img
                src={
                  windowWidth < 768
                    ? boardLayerWhiteSmall
                    : boardLayerWhiteLarge
                }
                alt="board layer white"
              />
            </div>
          </div>
          {/* Turn indicator */}
          {winner ? (
            <div className="z-50 -mt-4 flex h-40 w-[17.813rem] flex-col items-center rounded-[20px] border-[3px] border-solid border-black bg-white py-4 shadow-[0_10px_0px_0px_rgba(0,0,0,1)] md:-mt-10">
              <div className="flex w-full flex-col items-center">
                <span className="text-base font-bold uppercase leading-5 tracking-normal text-black">
                  {winner === "red"
                    ? "Player 1"
                    : winner === "yellow"
                      ? "Player 2"
                      : "It's a tie!"}
                </span>
                <span className="-mt-1 text-[3.5rem] font-bold uppercase leading-[4.5rem] tracking-normal text-black">
                  {winner === "draw" ? "draw" : "wins"}
                </span>
              </div>
              <button
                type="button"
                className="flex h-10 w-[8.125rem] items-center justify-center rounded-[20px] bg-dark-purple text-base font-bold uppercase leading-5 tracking-normal text-white transition-colors duration-75 hover:bg-red active:bg-red"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="relative z-[60] -mt-4 mb-[0.625rem] flex h-[9.375rem] w-[11.938rem] flex-col items-center gap-[0.125rem] px-7 pb-4 pt-10 md:-mt-10">
              <span
                className={`z-10 text-base font-bold uppercase leading-5 tracking-normal ${currentPlayer === "red" ? "text-white" : "text-black"}`}
              >
                {currentPlayer === "red" ? "Player 1" : "Player 2"}'s turn
              </span>
              <span
                className={`z-10 text-[3.5rem] font-bold leading-[4.5rem] tracking-normal ${currentPlayer === "red" ? "text-white" : "text-black"}`}
              >
                {timer}s
              </span>
              <img
                className="absolute left-0 top-0"
                src={
                  currentPlayer === "red"
                    ? turnBackgroundRed
                    : turnBackgroundYellow
                }
                alt=""
              />
            </div>
          )}
          {/* background pattern */}
          <div
            className={`absolute -left-5 top-[36rem] min-h-[236px] w-[calc(100%+40px)] rounded-t-[60px] transition-colors delay-500 duration-500 md:-left-[4.25rem] md:top-[49.375rem] md:min-h-[234px] md:w-[calc(100%+136px)] ${winner === "red" ? "bg-red" : winner === "yellow" ? "bg-yellow" : "bg-dark-purple"}`}
          ></div>
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal
        showMenuModal={showMenuModal}
        toggleMenu={toggleMenu}
        resetGame={resetGame}
      />
    </main>
  );
};

export default Game;
