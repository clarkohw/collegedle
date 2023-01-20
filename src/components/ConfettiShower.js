import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function ConfettiShower(props) {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      numberOfPieces={300}
      gravity={0.05}
      width={width}
      height={height}
      run={props.run}
      recycle={false}
    />
  );
}

export default ConfettiShower;
