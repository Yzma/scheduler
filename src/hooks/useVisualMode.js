
import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory(prev => { 
      if(replace) {
        prev[prev.length - 1] = newMode
      } else {
        prev.push(newMode) 
      }
      return prev
    })
  }

  const back = () => {
    setHistory(prev => {
      if(prev.length > 1) {
        prev.pop()
        setMode(prev[prev.length - 1])
        return prev
      }
      return prev
    })

    // Other version
    // if(history.length <= 1) {
    //   return
    // }

    // const newHistory = [...history]
    // console.log('newHistory: ', newHistory)
    // newHistory.pop()
    // console.log('newHistory after pop: ', newHistory)

    // setMode(newHistory[newHistory.length - 1])
    // setHistory(newHistory)
  }

  return { mode, transition, back };
}

export default useVisualMode