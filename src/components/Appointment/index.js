import React, {useEffect} from 'react'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        transition(ERROR_SAVE, true)
        console.log(`error booking interview(${props.id})`, err)
      })
  }

  const deleteInterview = () => {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        transition(ERROR_DELETE, true)
        console.log(`error deleting interview(${props.id})`, err)
      })
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [transition, mode, props.interview]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />} {/* student interviewer onCancel onSave*/}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete this appointment?"} onConfirm={deleteInterview} onCancel={() => transition(SHOW)} />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()} />}
    
      {mode === ERROR_SAVE && <Error message={"Error saving new appointment"} onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message={"Error deleting the appointment"} onClose={() => back()}/>}
    </article>
  );
}
// const [studentName, setStudentName] = useState(props.student || "")
// const [interviewerId, setInterviewerId] = useState(props.interviewer || null)
