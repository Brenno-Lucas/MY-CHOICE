import React from "react";
import propTypes from 'prop-types';

export default function Select(props) {

  const { itens, onChange, selectName, selectId, selectValue } = props;

  return(
    <select
      name={ selectName }
      id={ selectId }
      onChange={ onChange }
      value={ selectValue }
    >
      <option
        value=""
        hidden
      >
        Escolha um genêro
      </option>
      { itens.map((genre) => (
        <option
          key={ genre }
          value={ genre }
        >
          { genre }
        </option>
      ))}
    </select>
  )
}

Select.propTypes = {
  selectName: propTypes.string.isRequired,
  selectId: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  itens: propTypes.arrayOf(propTypes.string).isRequired,
  selectValue: propTypes.string.isRequired,
};