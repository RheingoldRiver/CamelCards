import * as Toolbar from "@radix-ui/react-toolbar";
import * as Toggle from "@radix-ui/react-toggle";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";

function PreferencesToolbar() {
  const { useJokers, toggleUseJokers, cardsPerHand, setCardsPerHand, allowCheat, toggleAllowCheat } =
    useContext(GameStateContext);
  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <Toggle.Root
        className={clsx("p-2 border border-solid border-gray-900", useJokers ? "bg-green-500" : "bg-gray-200")}
        aria-label="Toggle jokers"
        pressed={useJokers}
        onPressedChange={toggleUseJokers}
      >
        Jokers
      </Toggle.Root>
      <Toggle.Root
        className={clsx("p-2 border border-solid border-gray-900", allowCheat ? "bg-green-500" : "bg-gray-200")}
        aria-label="Toggle jokers"
        pressed={allowCheat}
        onPressedChange={toggleAllowCheat}
      >
        Cheat?
      </Toggle.Root>

      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.Button className="ToolbarButton" style={{ marginLeft: "auto" }}>
        Play game!
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

export default PreferencesToolbar;
