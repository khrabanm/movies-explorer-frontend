import { useCallback, useState } from 'react';
import { isEmail } from 'validator';
import { FORM_REGEXP, FORM_ERROR_MESSAGES } from '../utils/consts';

function useFormWithValidation(isSignIn = false) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const checkValidity = (name, value) => {
    const regExpValid = name === 'email' ? isEmail(value) : FORM_REGEXP[name].test(value);
    setErrors((prevState) => ({
      ...prevState,
      [name]: regExpValid ? '' : FORM_ERROR_MESSAGES[name],
    }));
    return regExpValid;
  };

  const handleChange = ({ target }) => {
    const { name, value, validationMessage } = target;
    setValues((prevState) => ({ ...prevState, [name]: value }));

    setErrors((prevState) => ({ ...prevState, [name]: validationMessage }));
    const formValid = target.closest('form').checkValidity();
    let regExpValid = true;
    if (!(isSignIn && name === 'password')) {
      regExpValid = checkValidity(name, value);
    }
    setIsValid(formValid && regExpValid);
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, setValues, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;
