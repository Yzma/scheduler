import React, { useState } from "react"

import Button from "components/Button"

import InterviewerList from "components/InterviewerList"

const Form = (props) => {
  const [studentName, setStudentName] = useState(props.student || "")
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null)
  const [error, setError] = useState(null)

  const reset = () => {
    setError(null)
    setStudentName("")
    setInterviewerId(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  const validate = () => {
    if (studentName === "") {
      setError("Student name cannot be blank")
      return
    }

    if (interviewerId === null) {
      setError("Please select an interviewer")
      return
    }

    setError(null)
    props.onSave(studentName, interviewerId)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudentName(e.target.value)}
            value={studentName}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewerId}
          value={interviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}

// .add("Edit Form", () => <Form student={"Student name"} interviewer={1} interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
// .add("Create Form", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)

export default Form
