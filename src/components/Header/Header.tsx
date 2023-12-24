import clsx from "clsx";

function Header() {
  return (
    <div className="pl-2 pt-2">
      <h1 className={clsx("text-[30px]")}>Welcome to Camel Cards!</h1>
      Click & Drag your hands to reorder bids. You can generate new hands if you give up on this round. Try to optimize
      your{" "}
      <a className="text-blue-400 underline" target="_blank" href="https://adventofcode.com/2023/day/7">
        score
      </a>
      !
    </div>
  );
}

export default Header;
