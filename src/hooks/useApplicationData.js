
import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = (event) => {
      socket.send("ping");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      console.log("Client Message Received:", data);

      if (data.type === 'SET_INTERVIEW') {
        // {
        //   type: "SET_INTERVIEW",
        //   id,
        //   interview: {
        //     student,
        //     interviewer: {
        //       id
        //       name,
        //       avatar
        //     }
        //   }
        // }

        dispatch({ type: SET_INTERVIEW, value: { id: data.id, interview: data.interview } })

      }
    }

    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      //console.log('All: ', all)
      dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } })
    });

    return () => {
      socket.close()
    }
  }, [])

  const bookInterview = (id, interview) => {

    //    console.log(id, interview);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { id, interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview } })
        //console.log('Updated state successfully')
      })
  }

  const cancelInterview = (id) => {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview: null } })
        console.log('Updated state successfully')
      })
  }

  const setDay = day => {
    dispatch({ type: SET_DAY, value: day })
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData
