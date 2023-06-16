export const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL
export const AUTHENTICATION = `${BASE_BACKEND_URL}/authentication`
export const LOGIN = `${AUTHENTICATION}/login`
export const REGISTRATION_PLAYER = `${AUTHENTICATION}/register-player`
export const REGISTRATION_OWNER = `${AUTHENTICATION}/register-owner`
export const LOGOUT = `${AUTHENTICATION}/logout`
export const FORGOT_PASSWORD = `${AUTHENTICATION}/forgot-password`
export const CHANGE_PASSWORD = `${AUTHENTICATION}/change-password/`
export const GET_SPORT_HALLS = `${BASE_BACKEND_URL}/sport-hall`
export const CONTACT_US = `${BASE_BACKEND_URL}/contact-us`

export const CHANGE_INFO = `${BASE_BACKEND_URL}/player/update`
export const CHANGE_PHOTO = `${BASE_BACKEND_URL}/player/change-profile-photo`
export const CHANGE_OWNER_INFO = `${BASE_BACKEND_URL}/owner/update`
export const CREATE_TEAM = `${BASE_BACKEND_URL}/team`
export const GET_TEAMS = `${BASE_BACKEND_URL}/team/all`
export const DELETE_TEAM = `${BASE_BACKEND_URL}/team/delete/`
export const INVITE_TEAM_MEMBER = `${BASE_BACKEND_URL}/team/invite-member/`
export const DELETE_TEAM_MEMBER = `${BASE_BACKEND_URL}/team/delete-member/`

export const CONFIRM_EMAIL = `${BASE_BACKEND_URL}/authentication/confirm-email/?token=`
export const RESEND_CONFIRMATION_TOKEN = `${BASE_BACKEND_URL}/authentication/resend-token`
