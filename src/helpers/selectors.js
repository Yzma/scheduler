

export const getAppointmentsForDay = (state, day) => {
  const foundDay = state.days.find((e) => e.name === day)
  if (!foundDay) {
    return []
  }
  return foundDay.appointments.map((e) => state.appointments[e])
}

export const getInterviewersForDay = (state, day) => {
  const foundDay = state.days?.find((e) => e.name === day)
  if (!foundDay) {
    return []
  }

  return foundDay.interviewers.map((e) => state.interviewers[e])
}

// Old version - Done wrong
// Note: Could use a set to avoid duplicates - Some people might have multiple interviews in the same day
// export const getInterviewersForDay = (state, day) => {
// const foundDay = state.days?.find((e) => e.name === day)
// if(!foundDay) {
//   return []
// }

// const map = foundDay.appointments.flatMap((e) => {
//   const foundInterviewId = state.appointments[e]?.interview?.interviewer
//   const foundInterviewer = state.interviewers[foundInterviewId]
//   if(!foundInterviewer) {
//     return []
//   }
//   return [foundInterviewer]
// })
// return Array.from(new Set(map))

// const set = new Set()

// foundDay.appointments.forEach((e) => {
//   const foundInterviewId = state.appointments[e]?.interview?.interviewer
//   const foundInterviewer = state.interviewers[foundInterviewId]
//   if(foundInterviewer) {
//     set.add(foundInterviewer)
//   }
// })

// return Array.from(set)

// const result = []
// foundDay.appointments.map((e) => {
//   const foundInterviewId = state.appointments[e]?.interview?.interviewer
//   const foundInterviewer = state.interviewers[foundInterviewId]
//   if(foundInterviewer) {
//     result.push(foundInterviewer)
//   }
// })
// return result
// }

export const getInterview = (state, interview) => {
  const interviewerId = interview?.interviewer
  if (!interviewerId) {
    return null
  }

  const foundInterviewer = Object.values(state.interviewers).find(e => e.id === interviewerId)
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
