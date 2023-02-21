import React, { useState } from 'react'

import Button from 'components/Button'

import InterviewerList from 'components/InterviewerList'

const Form = (props) => {
  const [studentName, setStudentName] = useState(props.student || "")
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null)

  const reset = () => {
    setStudentName("")
    setInterviewerId(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setStudentName(e.target.value)}
            value={studentName}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} onChange={setInterviewerId} value={interviewerId} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}

// .add("Edit Form", () => <Form student={"Student name"} interviewer={1} interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
// .add("Create Form", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)

export default Form
