
import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log('All: ', all)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
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
    const updatedDaysCopy = updateSpots(appointments)
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { id, interview })
      .then(() => {
        setState({ ...state, appointments, days: updatedDaysCopy })
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

    const updatedDaysCopy = updateSpots(appointments)

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: updatedDaysCopy })
        console.log('Updated state successfully')
      })
  }

  const updateSpots = (appointments) => {
    const updatedDaysCopy = state.days.map(stateDay => {
      if(stateDay.name === state.day) {
        const spotsRemaining = stateDay.appointments.filter(e => appointments[e].interview === null).length
        return {
          ...stateDay,
          spots: spotsRemaining
        }
      }
      return stateDay
    })
    return updatedDaysCopy
  }

  // const updateSpots = (days, appointments) => {
  //   const foundDay = days.find(e => e.name === state.day)
  //   const spotsRemaining = foundDay.appointments.filter(e => appointments[e].interview === null).length
  //   foundDay.spots = spotsRemaining
  // }

  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData
