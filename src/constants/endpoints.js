export const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL
export const AUTHENTICATION = `${BASE_BACKEND_URL}/authentication`
export const LOGIN = `${AUTHENTICATION}/login/`
export const REGISTRATION = `${AUTHENTICATION}/registration/`
export const REGISTRATION_PLAYER = `${REGISTRATION}/register-player`
export const REGISTRATION_OWNER = `${REGISTRATION}/register-owner/`
export const LOGOUT = `${AUTHENTICATION}/logout`
