import React from "react";
import propTypes from 'prop-types';

export default function List(props) {

  const { id, description, functions  } = props;

  return(
    <ul
      id={ id }
    >
      <li>
        { description }
      </li>
      <li>
        { functions }
      </li>
    </ul>
  )
}

List.propTypes = {
  id: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  functions: propTypes.string.isRequired,
};