import { useState, useEffect } from "react";
import { useTransition, config } from "react-spring";
import human from "../../../images/v2/Header/humans.png";
import "./carousel.css";

export const Carousel = () => {
  const [time, settime] = useState(0);
  const [toggle, set] = useState(false);
  useEffect(() => {
    return () => clearTimeout(time);
  }, [time]);
  const transitions = useTransition(!toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 0,
    config: config.molasses,
    onRest: () => {
      set(!toggle);
      settime(time + 1);
    },
  });

  return transitions(({ opacity }, item) => (
    <img className="human" src={human} alt="human" />
  ));
};
