import { useContext, type FC } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

interface Props {}

const GameActions: FC<Props> = () => {
  const { scores } = useContext(GameStateContext);
  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <div>Total score: {scores.reduce((acc, s) => acc + s, 0)}</div>
      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.Button className="ToolbarButton" style={{ marginLeft: "auto" }}>
        Play game!
      </Toolbar.Button>
    </Toolbar.Root>
  );
};

export default GameActions;
