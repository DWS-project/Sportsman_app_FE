import Cookies from 'js-cookie'
import React from 'react'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import withMainFrame from 'src/hoc/withMainFrame'
import { EditUserPage } from './User'

export const EditProfilePage = () => {
  const cookie = Cookies.get(COOKIE_AUTHENTICATION_FE)
  const cookie_data = JSON.parse(cookie)
  const id = cookie_data.id
  console.log(cookie)

  return withMainFrame(<EditUserPage id={id} />)
}
