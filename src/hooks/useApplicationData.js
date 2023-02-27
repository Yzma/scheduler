
import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      }

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      }

    case SET_INTERVIEW:
      console.log('reducer appointments: ', action.value.appointments)

      return {
        ...state,
        appointments: action.value.appointments,
        days: updateSpots(state, action.value.appointments)
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const updateSpots = (state, appointments) => {
  return state.days.map(stateDay => {
    if (stateDay.name !== state.day) {
      return stateDay
    }

    const spotsRemaining = stateDay.appointments.filter(e => appointments[e].interview === null).length
    return {
      ...stateDay,
      spots: spotsRemaining
    }
  })
}

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

      if(data.type === "SET_INTERVIEW") {

        console.log('copy copyTest: ', state)

        //dispatch({ type: SET_INTERVIEW, value: { appointments } })
      }
    }

    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log('All: ', all)
      dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } })
    });

    return () => {
      socket.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(id, interview);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { id, interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments } })
        console.log('Updated state successfully')
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { appointments } })
        console.log('Updated state successfully')
      })
  }

  const setDay = day => {
    dispatch({ type: SET_DAY, value: day })
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData
