

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
