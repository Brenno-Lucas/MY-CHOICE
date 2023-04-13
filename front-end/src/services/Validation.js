const validateLength = (number, itemToBeValidated, validatorUsed ) => {
  const minimunLength = number;
  const validator = itemToBeValidated.length >= minimunLength;
  validatorUsed(validator);
};

const validateEmail = (email, validatorUsed) => {
  const validator = /^[\w.]+@[\w.]+\.[a-z]{2,3}(\.[a-z]{2})?$/i.test(email);
  validatorUsed(validator);
};

const checkArray = (validArray) => {
  return validArray === true;
};

const checkInput = (validatorUsed, input) => {
  if (input.length < 1) {
    const validator = (input);
    validatorUsed(!validator);
  } else {
    const validator = input.every(checkArray);
    validatorUsed(!validator);
  };
};

const handleChange = (evt, validatorUsed) => {
  const { value, name } = evt.target;
  validatorUsed((state) => ({
    ...state,
    [name]: value,
  }));
};

export {
  validateLength,
  validateEmail,
  checkInput,
  handleChange,
}