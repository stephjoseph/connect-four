import { Link } from "react-router-dom";
import iconCheck from "/images/icon-check.svg";

const Rules = () => {
  return (
    <main className="relative flex w-full max-w-[335px] flex-col gap-[1.875rem] rounded-[40px] border-[3px] border-black bg-white px-5 pb-[3.75rem] pt-[1.875rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)]">
      <h1 className="text-center text-[3.5rem] font-bold uppercase leading-[4.5rem] tracking-normal text-black">
        Rules
      </h1>
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-[1.25rem] font-bold uppercase leading-[1.625rem] tracking-normal text-purple">
            Objective
          </h2>
          <p className="text-base font-medium leading-[1.25rem] tracking-normal text-black/[0.67]">
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-[1.25rem] font-bold uppercase leading-[1.625rem] tracking-normal text-purple">
            How to play
          </h2>
          <ol className="flex w-full flex-col gap-[0.625rem]">
            <li
              className="relative pl-8 text-base font-medium leading-[1.25rem] tracking-normal text-black/[0.67] before:absolute before:left-0 before:top-0 before:h-0 before:w-0 before:text-base before:font-bold before:leading-[1.25rem] before:tracking-normal before:text-black before:content-[counter(count,decimal)]"
              style={{ counterIncrement: "count" }}
            >
              Red goes first in the first game.
            </li>
            <li
              className="relative pl-8 text-base font-medium leading-[1.25rem] tracking-normal text-black/[0.67] before:absolute before:left-0 before:top-0 before:h-0 before:w-0 before:text-base before:font-bold before:leading-[1.25rem] before:tracking-normal before:text-black before:content-[counter(count,decimal)]"
              style={{ counterIncrement: "count" }}
            >
              Players must alternate turns, and only one disc can be dropped in
              each turn.
            </li>
            <li
              className="relative pl-8 text-base font-medium leading-[1.25rem] tracking-normal text-black/[0.67] before:absolute before:left-0 before:top-0 before:h-0 before:w-0 before:text-base before:font-bold before:leading-[1.25rem] before:tracking-normal before:text-black before:content-[counter(count,decimal)]"
              style={{ counterIncrement: "count" }}
            >
              The game ends when there is a 4-in-a-row or a stalemate.
            </li>
            <li
              className="relative pl-8 text-base font-medium leading-[1.25rem] tracking-normal text-black/[0.67] before:absolute before:left-0 before:top-0 before:h-0 before:w-0 before:text-base before:font-bold before:leading-[1.25rem] before:tracking-normal before:text-black before:content-[counter(count,decimal)]"
              style={{ counterIncrement: "count" }}
            >
              The starter of the previous game goes second on the next game.
            </li>
          </ol>
        </div>
      </div>
      <Link
        to="/"
        className="absolute -bottom-8 left-[calc(50%-32px)] flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-solid border-black bg-red shadow-[0_5px_0px_0px_rgba(0,0,0,1)] transition duration-75 hover:border-dark-purple hover:shadow-[0_5px_0px_0px_rgba(92,45,213,1)] active:translate-y-[2.5px] active:border-dark-purple active:shadow-[0_2.5px_0px_0px_rgba(92,45,213,1)]"
      >
        <img src={iconCheck} alt="check icon" />
      </Link>
    </main>
  );
};

export default Rules;
