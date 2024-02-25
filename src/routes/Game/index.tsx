import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo.svg";
import playerOne from "/images/player-one.svg";
import playerTwo from "/images/player-two.svg";
import boardLayerBlackSmall from "/images/board-layer-black-small.svg";
import boardLayerWhiteSmall from "/images/board-layer-white-small.svg";
import counterRedSmall from "/images/counter-red-small.svg";
import counterYellowSmall from "/images/counter-yellow-small.svg";
import turnBackgroundRed from "/images/turn-background-red.svg";
import turnBackgroundYellow from "/images/turn-background-yellow.svg";

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

  useEffect(() => {
    // Start the timer when the component mounts
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

    if (winner) {
      clearInterval(timerId);
    }

    // Clean up the timer when the component unmounts or when a player wins
    return () => {
      clearInterval(timerId);
    };
  }, [currentPlayer, winner]); // Empty dependency array ensures the effect runs only once on mount

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

    // Determine the starting player for the next game
    let nextStartingPlayer: Player;
    if (winner) {
      // If there's a winner or draw, the starter of the previous game goes second
      nextStartingPlayer = startingPlayer === "red" ? "yellow" : "red";
    } else {
      // If there's no winner, the starting player remains the same
      nextStartingPlayer = startingPlayer;
    }

    // Set the starting player for the next game
    setStartingPlayer(nextStartingPlayer);

    // Set the current player to be the starting player of the next game
    setCurrentPlayer(nextStartingPlayer);

    setWinner(null);
    setTimer(30);
  };

  return (
    <main className="flex w-full max-w-[335px] flex-col gap-[3.125rem] pb-24 pt-[3.125rem]">
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
          onClick={resetGame}
        >
          Restart
        </button>
      </div>
      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full items-center justify-center gap-5">
          {/* Player 1 */}
          <div className="relative flex max-w-[148px] flex-1 flex-col items-center gap-px rounded-[20px] border-[3px] border-solid border-black bg-white py-[0.625rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-base font-bold uppercase leading-5 tracking-normal text-black">
              Player 1
            </span>
            <span className="text-[2rem] font-bold leading-10 tracking-normal text-black">
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
          <div className="relative flex max-w-[148px] flex-1 flex-col items-center gap-px rounded-[20px] border-[3px] border-solid border-black bg-white py-[0.625rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-base font-bold uppercase leading-5 tracking-normal text-black">
              Player 2
            </span>
            <span className="text-[2rem] font-bold leading-10 tracking-normal text-black">
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
          <div className="relative h-[19.375rem] w-full">
            <div className="absolute left-0 top-0 z-10 h-[20rem] w-full">
              <img
                className="h-full w-full"
                src={boardLayerBlackSmall}
                alt="board layer black"
              />
            </div>
            <div className="absolute left-0 top-0 z-20 grid h-full w-full grid-cols-7 gap-[0.375rem] px-2 pb-7 pt-2">
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="flex w-full cursor-pointer flex-col justify-between"
                    onClick={() => dropPiece(colIndex)}
                  >
                    <div className="relative h-10 w-10">
                      {cell === "red" && (
                        <img
                          className="fall absolute left-0 top-0 w-full"
                          src={counterRedSmall}
                          alt="counter red"
                        />
                      )}
                      {cell === "yellow" && (
                        <img
                          className="fall absolute left-0 top-0 w-full"
                          src={counterYellowSmall}
                          alt="counter yellow"
                        />
                      )}
                    </div>
                  </div>
                )),
              )}
            </div>
            <div className="pointer-events-none absolute left-0 top-0 z-30 h-[19.375rem] w-full">
              <img src={boardLayerWhiteSmall} alt="board layer white" />
            </div>
          </div>
          {/* Turn indicator */}
          {winner ? (
            <div className="z-50 -mt-4 flex h-40 w-[17.813rem] flex-col items-center rounded-[20px] border-[3px] border-solid border-black bg-white py-4 shadow-[0_10px_0px_0px_rgba(0,0,0,1)]">
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
            <div className="relative z-[60] -mt-4 mb-[0.625rem] flex h-[9.375rem] w-[11.938rem] flex-col items-center gap-[0.125rem] px-7 pb-4 pt-10">
              <span className="z-10 text-base font-bold uppercase leading-5 tracking-normal text-white">
                {currentPlayer === "red" ? "Player 1" : "Player 2"}'s turn
              </span>
              <span className="z-10 text-[3.5rem] font-bold leading-[4.5rem] tracking-normal text-white">
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
        </div>
      </div>
    </main>
  );
};

export default Game;
