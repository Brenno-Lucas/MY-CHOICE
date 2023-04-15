import React from "react";
import propTypes from 'prop-types';

export default function Button(props) {

  const { buttonName, disabled, id, onClick, type,  value } = props;

  return(
    <button
      id={ id }
      value={ value }
      onClick={ onClick }
      type={ type }
      disabled={ disabled }
    >
      { buttonName }
    </button>
  )
}

Button.propTypes = {
  buttonName: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  disabled: propTypes.bool,
  onClick: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  value: propTypes.string,
};