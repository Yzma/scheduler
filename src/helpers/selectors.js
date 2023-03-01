/**
 * Returns an array of Appointment objects for the given day,
 * or returns an empty array if the provided day isn't found.
 *
 * @param {Object} state the State object from useApplicationData
 * @param {Object} day the day name to retrieve the appointments
 * @returns A mapped array of Appointments for the provided day
 */
export const getAppointmentsForDay = (state, day) => {
  const foundDay = getDayFromName(state, day)
  if (!foundDay) {
    return []
  }
  return foundDay.appointments.map((e) => state.appointments[e])
}

/**
 * Returns an array of interviewers for the given day,
 * or returns an empty array if the provided day isn't found.
 *
 * @param {Object} state the State object from useApplicationData
 * @param {Object} day the day name to retrieve the appointments
 * @returns An array of interviewers that will be available for the day
 */
export const getInterviewersForDay = (state, day) => {
  const foundDay = getDayFromName(state, day)
  if (!foundDay) {
    return []
  }

  return foundDay.interviewers.map((e) => state.interviewers[e])
}

/**
 * Searches and returns the day Object from the state Object if the provided name is found,
 * otherwise returns null.
 *
 * @param {Object} state the State object from useApplicationData
 * @param {Object} day the day name to retrieve the appointments
 * @returns The day Object from the days array
 */
const getDayFromName = (state, day) => {
  return state.days?.find((e) => e.name === day)
}

/**
 * Constructs and returns a new Interview Object that contains the Interviewer Object (rather than just the interviewer ID)
 * to be stored in the useApplicationData state Object. Returns null if the provided interviewer is null or isn't found.
 *
 * @param {Object} state the State object from useApplicationData
 * @param {Object} day the day name to retrieve the appointments
 * @returns A new interview Object with the found Interviewers properties
 */
export const getInterview = (state, interview) => {
  const interviewerId = interview?.interviewer
  if (!interviewerId) {
    return null
  }

  const foundInterviewer = Object.values(state.interviewers).find(
    (e) => e.id === interviewerId
  )
  if (!foundInterviewer) {
    return null
  }

  return {
    student: interview.student,
    interviewer: {
      ...foundInterviewer
    }
  }
}
