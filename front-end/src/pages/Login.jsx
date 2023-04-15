import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saveItem } from '../services/UseLocalStorage'
import { validateLength, validateEmail, checkInput, handleChange } from '../services/Validation'
import { Input } from '../components/Elements';

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUSerNameValid, setIsUSerNameValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const { email, password, userName } = loginInfo;
  const history = useHistory();
  const UserImage = 'https://cdn-icons-png.flaticon.com/512/1160/1160283.png?w=740&t=st=1675948250~exp=1675948850~hmac=b8b5f2d92c7a4ec5f0f199c3f15680e008a64f44c81809e1d2f2485f8552e8ca';

  useEffect(() => {
    validateEmail(email, setIsEmailValid);
    validateLength(7, password, setIsPasswordValid);
    validateLength(2, userName, setIsUSerNameValid);
    checkInput(setIsButtonDisabled, [isUSerNameValid, isEmailValid, isPasswordValid])
  }, [email, password, isEmailValid, isPasswordValid, isUSerNameValid, userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/HomePage');
    saveItem('UserData', {
      UserName: userName,
      UserImage: UserImage,
    });
  };

  return(
    <div
      className='login-div'
    >
      <form
        className='login-form'
        onSubmit={ (e) => handleSubmit(e) }
      >
        <Input 
          className='input-login'
          type="text"
          name="userName"
          placeholder='Nome de usuário'
          value={ loginInfo.userName }
          onChange= { (e) => handleChange(e, setLoginInfo) }
        />
        <Input 
          className='input-login'
          type="email"
          name="email"
          placeholder='adelliah@email.com'
          value= { loginInfo.email }
          onChange= { (e) => handleChange(e, setLoginInfo) }
        />
        <Input 
          className='input-login'
          type="password"
          name="password"
          placeholder='Sua senha'
          value={ loginInfo.password }
          onChange= { (e) => handleChange(e, setLoginInfo) }
        />
        <button
          id='button-login'
          type="submit"
          disabled={ isButtonDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  )
}