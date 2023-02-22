

export const getAppointmentsForDay = (state, day) => {
  const foundDay = state.days.find((e) => e.name === day)
  if(!foundDay) {
    return []
  }
  return foundDay.appointments.map((e) => state.appointments[e])
}

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

// Note: Could use a set to avoid duplicates - Some people might have multiple interviews in the same day
export const getInterviewersForDay = (state, day) => {
  const foundDay = state.days?.find((e) => e.name === day)
  if(!foundDay) {
    return []
  }

  const map = foundDay.appointments.flatMap((e) => {
    const foundInterviewId = state.appointments[e]?.interview?.interviewer
    const foundInterviewer = state.interviewers[foundInterviewId]
    if(!foundInterviewer) {
      return []
    }
    return [foundInterviewer]
  })
  return Array.from(new Set(map))

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
