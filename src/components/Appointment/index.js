import React from 'react'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from 'hooks/useVisualMode';

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(_ => {
        transition(SHOW)
      })
      .catch(err => {
        console.log(`error booking interview(${props.id})`, err)
      })
  }

  const deleteInterview = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(_ => {
        transition(EMPTY)
      })
      .catch(err => {
        console.log(`error deleting interview(${props.id})`, err)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />} {/* student interviewer onCancel onSave*/}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete this appointment?"} onConfirm={deleteInterview} onCancel={() => transition(SHOW)} />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()} />}
    </article>
  );
}
// const [studentName, setStudentName] = useState(props.student || "")
// const [interviewerId, setInterviewerId] = useState(props.interviewer || null)
