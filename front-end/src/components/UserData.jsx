import React, { useState, useEffect } from "react";
import { saveItem, getItem } from "../services/UseLocalStorage";
import { handleChange, validateLength } from "../services/Validation";
import { correctIcon, editIcon } from "../images";
import { Input } from "./Elements"

export default function UserData() {
  
  const [isEditUserName, setIsUserName] = useState(false);
  const [isEditUserIMG, setIsUserImg] = useState(false);
  const [isValidUserIMG, setIsValidUserIMG] = useState(false);
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    userName: '',
    userImg: '',
  });
  const { UserName, UserImage } = getItem('UserData');
  const { userName, userImg } = loginInfo;

  useEffect(()=> {
    if(isEditUserName)
    validateLength(2, userName, setIsValidUserName);
    if(isEditUserIMG)
    validateLength(2, userImg, setIsValidUserIMG);
  }, [userName, isEditUserName, userImg, isEditUserIMG]);
  
  const setUserName = () => {
    if (isEditUserName === false) {
      setIsUserName(true);
    } 
    else if (isValidUserName === true ) {
      saveItem('UserData', {
        UserName: userName,
        UserImage,
      })
      setIsUserName(false);
      setLoginInfo({userName: ''})
      window.location.reload();
    }
  };

  const setUserImg = () => {
    if (isEditUserIMG === false) {
      setIsUserImg(true);
    } 
    else if (isValidUserIMG === true ) {
      saveItem('UserData', {
        UserName,
        UserImage: userImg,
      })
      setIsUserImg(false);
      setLoginInfo({userImg: ''});
      window.location.reload();
    }
  };

  return(
    <div>
      <section
        className='user-name'
      >
        <p>
          Nome de Usuário: { isEditUserName === false ? UserName : (
            <Input 
              type="text"
              name="userName"
              id='input-edit-username'
              placeholder='Digite seu nome'
              value={ loginInfo.userName }
              onChange= { (e) => handleChange(e, setLoginInfo) }
            />
          ) }
        </p>
        <img
          id='pen-editor-img'
          src={  isEditUserName === false ? editIcon : correctIcon }
          alt="pen-edit"
          onClick={ setUserName }
        />
      </section>
      <section
        className='user-image'
      >
        <p
          id='edit-user-photo'
        >
          Foto de perfil
        </p>
        { isEditUserIMG && (
          <Input 
            type="text"
            name="userImg"
            placeholder='Adicione a URL da imagem'
            id='input-edit-userimg'
            value={ loginInfo.userImg }
            onChange= { (e) => handleChange(e, setLoginInfo) }
          />
        )}
        <img
          id='user-img'
          src={ UserImage }
          alt="pen-edit"
          onClick={ setUserImg }
        />
      </section>
    </div>
  )
}