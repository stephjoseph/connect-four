import { Link } from "react-router-dom";

interface MenuModalProps {
  showMenuModal: boolean;
  toggleMenu: () => void;
  resetGame: () => void;
}

const MenuModal = ({
  showMenuModal,
  toggleMenu,
  resetGame,
}: MenuModalProps) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-[70] flex h-screen w-full min-w-[375px] items-center justify-center bg-black/50 px-5 transition-opacity duration-75 ${
        showMenuModal
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex w-full max-w-[335px] flex-col items-center gap-[1.875rem] rounded-[40px] border-[3px] border-solid border-black bg-purple px-5 py-[1.875rem] shadow-[0_10px_0px_0px_rgba(0,0,0,1)] md:max-w-[480px] md:gap-11 md:px-10 md:py-[3.125rem]">
        <span className="text-[3.5rem] font-bold uppercase leading-[4.5rem] tracking-normal text-white">
          Pause
        </span>
        <div className="flex w-full flex-col gap-[1.875rem]">
          <button
            className="flex w-full items-center justify-center rounded-[20px] border-[3px] border-solid border-black bg-white p-5 text-2xl font-bold uppercase leading-[1.875rem] tracking-normal text-black shadow-[0_10px_0px_0px_rgba(0,0,0,1)] transition duration-75 hover:border-dark-purple hover:shadow-[0_10px_0px_0px_rgba(92,45,213,1)] active:translate-y-[5px] active:border-dark-purple active:shadow-[0_5px_0px_0px_rgba(92,45,213,1)]"
            onClick={toggleMenu}
          >
            <span>Continue Game</span>
          </button>
          <button
            className="flex w-full items-center justify-center rounded-[20px] border-[3px] border-solid border-black bg-white p-5 text-2xl font-bold uppercase leading-[1.875rem] tracking-normal text-black shadow-[0_10px_0px_0px_rgba(0,0,0,1)] transition duration-75 hover:border-dark-purple hover:shadow-[0_10px_0px_0px_rgba(92,45,213,1)] active:translate-y-[5px] active:border-dark-purple active:shadow-[0_5px_0px_0px_rgba(92,45,213,1)]"
            onClick={resetGame}
          >
            <span>Restart</span>
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-[20px] border-[3px] border-solid border-black bg-red p-5 text-2xl font-bold uppercase leading-[1.875rem] tracking-normal text-white shadow-[0_10px_0px_0px_rgba(0,0,0,1)] transition duration-75 hover:border-dark-purple hover:shadow-[0_10px_0px_0px_rgba(92,45,213,1)] active:translate-y-[5px] active:border-dark-purple active:shadow-[0_5px_0px_0px_rgba(92,45,213,1)]"
            to="/"
          >
            <span>Quit Game</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
