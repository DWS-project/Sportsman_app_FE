
import React from 'react'
import { EditUserPage } from './User'
import Cookies from 'js-cookie';
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser';
import withMainFrame from 'src/hoc/withMainFrame'
import { EditOwnerPage } from './Owner';
export const EditProfilePage = () => {
  
  const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE);
  const cookie_data = JSON.parse(cookie);
  const id = cookie_data.id;
  
  return withMainFrame(
    <EditUserPage id={id}/>
  )
}
