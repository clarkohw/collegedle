import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { CONFETTI_MS_DELAY } from "../util/constants";
import { useState, useEffect } from "react";

function ConfettiShower(props) {
  const { width, height } = useWindowSize();
  const [run, setRun] = useState(false);
  useEffect(() => {
    setTimeout(() => setRun(props.run), CONFETTI_MS_DELAY);
  }, [props.run]);
  return (
    <Confetti
      numberOfPieces={300}
      gravity={0.05}
      width={width}
      height={height}
      run={run}
      recycle={false}
    />
  );
}

export default ConfettiShower;
