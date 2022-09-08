import { Transition } from "react-transition-group";
import { useState } from "react";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const transitionStyles1 = {
  entering: { color: "red" },
  entered: { color: "blue" },
  exiting: { color: "green" },
  exited: { color: "black" },
};

export default function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={inProp} timeout={500} unmountOnExit>
        {(state) => {
          return (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              I'm a fade Transition!
            </div>
          );
        }}
      </Transition>
      {/* <div
        className={`transition-all ${
          inProp ? "opacity-0 hidden" : "opacity-100"
        } duration-1000`}
      >
        I'm a fade Transition!
      </div> */}
      <button onClick={() => setInProp(true)}>Click to Enter</button>
    </div>
  );
}
