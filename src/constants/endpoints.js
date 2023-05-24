export const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL
export const AUTHENTICATION = `${BASE_BACKEND_URL}/authentication`
export const LOGIN = `${AUTHENTICATION}/login`
export const REGISTRATION_PLAYER = `${AUTHENTICATION}/register-player`
export const REGISTRATION_OWNER = `${AUTHENTICATION}/register-owner`
export const LOGOUT = `${AUTHENTICATION}/logout`
export const FORGOT_PASSWORD = `${AUTHENTICATION}/forgot-password`
export const LANDING_PAGE = `${BASE_BACKEND_URL}/filtered-sport-halls/`
export const GET_SPORT_HALLS = `${BASE_BACKEND_URL}/sport-halls`
export const CONTACT_US = `${BASE_BACKEND_URL}/contact-us`

export const CHANGE_INFO = `${BASE_BACKEND_URL}/player/update`
export const CHANGE_PASSWORD = `${BASE_BACKEND_URL}/player/change-password`
export const CHANGE_PHOTO = `${BASE_BACKEND_URL}/player/change-profile-photo`
export const CHANGE_OWNER_PASSWORD = `${BASE_BACKEND_URL}/owner/change-password`
export const CHANGE_OWNER_INFO = `${BASE_BACKEND_URL}/owner/update`