import { useContext, type FC } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

interface Props {}

const BidHistory: FC<Props> = () => {
  const { bids } = useContext(GameStateContext);
  return (
    <>
      {bids.map(({ bid, key }) => (
        <Bid bid={bid} key={key}></Bid>
      ))}
    </>
  );
};

const Bid = ({ bid }: { bid: number }) => {
  return <>{bid}</>;
};

export default BidHistory;
