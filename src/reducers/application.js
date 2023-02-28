
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

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
      //console.log('SET_INTERVIEW reducer', action.value)
      const { id, interview } = action.value

      const appointment = {
        ...state.appointments[id],
        interview: interview
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return {
        ...state,
        appointments: appointments,
        days: updateSpots(state, appointments)
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

export default reducer
