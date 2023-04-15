import React from "react";
import propTypes from 'prop-types';

export default function Input(props) {

  const { className, id, name, placeholder, onChange, type,  value } = props;

  return(
    <input
      id={ id }
      className={ className }
      type={ type }
      name={ name }
      placeholder={ placeholder }
      value= { value }
      onChange= { onChange }
    />
  )
}

Input.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  onChange: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  value: propTypes.string,
};