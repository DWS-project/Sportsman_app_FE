import { LOGOUT } from 'src/constants/endpoints'
import axios from 'axios'
import { HTTPStatusCodes } from 'src/constants/statusCodes'
import Cookies from 'js-cookie'
import { COOKIE_AUTHENTICATION_FE } from 'src/constants/keys/browser'

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
    name: 'Kontakt',
    href: '/',
  },
]
export const settingsForPlayer = [
  {
    name: 'Moj profil',
    href: '/',
  },
  {
    name: 'Rezervisani termini',
    href: '/',
  },
  {
    name: 'Timovi',
    href: '/',
  },
  {
    name: 'Postavke',
    href: '/',
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
    href: '/',
  },
  {
    name: 'Tereni',
    href: '/',
  },
  {
    name: 'Postavke',
    href: '/',
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
