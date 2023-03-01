
import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory(prev => {
      if (replace) {
        prev[prev.length - 1] = newMode
      } else {
        prev.push(newMode)
      }
      return prev
    })
  }

  const back = () => {
    if (history.length <= 1) {
      return
    }

    setHistory(prev => {
      prev.pop()
      setMode(prev[prev.length - 1])
      return prev
    })
  }

  return { mode, transition, back };
}

export default useVisualMode