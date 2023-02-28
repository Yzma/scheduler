import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayListItemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  })

  const formatSpots = (spots) => {
    if(spots > 0) {
      return `${spots} spot${spots > 1 ? 's' : ''} remaining`
    } else {
      return `no spots remaining`
    }
  }

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}