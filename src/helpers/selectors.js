

export const getAppointmentsForDay = (state, day) => {
  const foundDay = state.days.find((e) => e.name === day)
  return foundDay?.appointments.reduce(
    (accumulator, currentValue) => {
      const appointmentLookup = state.appointments[currentValue]
      if(appointmentLookup) {
        accumulator.push(appointmentLookup)
      }
      return accumulator
    },
    []
  ) || [];
}

export const getInterview = (state, interview) => {
  const interviewerId = interview?.interviewer
  if (!interviewerId) {
    return null
  }

  const foundInterviewer = Object.values(state.interviewers).find(e => e.id === interviewerId)
  if(!foundInterviewer) {
    return null
  }

  return {
    student: interview.student,
    interviewer: {
      ...foundInterviewer
    }
  }
}
