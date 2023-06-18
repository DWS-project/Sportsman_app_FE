import axios from 'axios'
import Cookies from 'js-cookie'
import { LOGOUT } from 'src/constants/endpoints'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'
import { HTTPStatusCodes } from 'src/constants/statusCodes'

async function logout() {
  const { status } = await axios.post(LOGOUT, {})
  if (status === HTTPStatusCodes.OK) {
    Cookies.remove(COOKIE_AUTHENTICATION_FE)
  }
}

export const pages = [
  {
    name: 'Timovi',
    href: '/',
  },
  {
    name: 'Objekti',
    href: '/',
  },
  {
    name: 'Tereni',
    href: '/sport-halls',
  },
  {
    name: 'Kontakt',
    href: '/contact-us',
  },
]
export const settingsForPlayer = [
  {
    name: 'Moj profil',
    href: '/my-profile',
  },
  {
    name: 'Timovi',
    href: '/create-team',
  },
  {
    name: 'Postavke',
    href: '/edit-profile',
  },
  {
    name: 'Odjavi se',
    onClick: logout,
    href: '/',
  },
]

export const settingsForOwner = [
  {
    name: 'Moj profil',
    href: '/owner-profile',
  },
  {
    name: 'Postavke',
    href: '/edit-profile',
  },
  {
    name: 'Odjavi se',
    onClick: logout,
    href: '/',
  },
]

export const settingsForGuestUser = [
  {
    name: 'Prijavi se',
    href: '/login',
  },
  {
    name: 'Kreiraj profil',
    href: '/registration',
  },
]
