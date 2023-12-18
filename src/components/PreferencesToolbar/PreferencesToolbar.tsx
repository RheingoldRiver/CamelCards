import * as Toolbar from "@radix-ui/react-toolbar";
import * as Toggle from "@radix-ui/react-toggle";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";
import { motion } from "framer-motion";

function PreferencesToolbar() {
  const { useJokers, toggleUseJokers, allowCheat, toggleAllowCheat, newHands, setShowCards } =
    useContext(GameStateContext);
  return (
    <Toolbar.Root className="flex flex-row justify-start items-center" aria-label="Formatting options">
      <Toggle.Root
        className={clsx(
          "bg-sand-400 p-2 rounded-xl",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10",
          "inline-flex flex-row items-center"
        )}
        aria-label="Toggle jokers"
        pressed={useJokers}
        onPressedChange={toggleUseJokers}
      >
        <ToggleStatus status={useJokers} />
        Jokers
      </Toggle.Root>
      <Toggle.Root
        className={clsx(
          "bg-sand-400 p-2 rounded-xl",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10",
          "inline-flex flex-row items-center"
        )}
        aria-label="Toggle jokers"
        pressed={allowCheat}
        onPressedChange={toggleAllowCheat}
      >
        <ToggleStatus status={allowCheat} />
        Cheat?
      </Toggle.Root>

      <Toolbar.Button
        className={clsx(
          "bg-sand-400 p-2 rounded-xl",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10",
          "inline-flex flex-row items-center"
        )}
        onClick={() => {
          newHands();
          setShowCards(false);
        }}
      >
        Generate new hands
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

const ToggleStatus = ({ status }: { status: boolean }) => {
  return (
    <span
      className={clsx(
        "w-12 h-6 inline-flex flex-row",
        status ? "justify-end" : "justify-start",
        "border border-solid border-gray-300 rounded-[3em]"
      )}
    >
      <motion.span
        className={clsx("rounded-[300px] w-6 h-6", status ? "bg-green-700" : "bg-gray-300")}
        layout="position"
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        initial={false}
      ></motion.span>
    </span>
  );
};

export default PreferencesToolbar;
