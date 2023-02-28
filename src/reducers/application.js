
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
        days: updateSpotsForDays(state, appointments)
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

/**
 * Constructs and return a copy of the days array for the provided State object that updates the 'spots' remaining property
 * based on the provided appointments.
 * 
 * @param {Object} state the State object from useApplicationData
 * @param {Object} appointments the appointments object to calculate the number of remaining spots
 * @returns A copy of the State's days array with the updated 'spots' property
 */
const updateSpotsForDays = (state, appointments) => {
  return state.days.map(stateDay => {
    const spotsRemaining = stateDay.appointments.filter(e => appointments[e].interview === null).length
    return {
      ...stateDay,
      spots: spotsRemaining
    }
  })
}

export default reducer
