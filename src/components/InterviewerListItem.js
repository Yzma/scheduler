import React from "react"
import classNames from "classnames"

import "components/InterviewerListItem.scss"

export const InterviewerListItem = (props) => {
  const interviewerListItemStyle = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li className={interviewerListItemStyle} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  )
}

export default InterviewerListItem
