import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthenticationFrame from './components/AuthenticationFrame'
import ForgotPassword from './components/AuthenticationFrame/ForgotPassword'
import Error400Page from './components/ErrorPages/Error400Page'
import Error401Page from './components/ErrorPages/Error401Page'
import Error404Page from './components/ErrorPages/Error404Page'
import LandingPage from './components/LandingPage'
import ListOfSportHalls from './components/SportHalls/ListOfSportHalls'
import Verification from './components/Verification'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route
          path={'/login'}
          element={<AuthenticationFrame route={'login'} />}
        />
        <Route
          path={'/registration'}
          element={<AuthenticationFrame route={'registration'} />}
        />
        <Route path={'/sport-halls'} element={<ListOfSportHalls />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'*'} element={<Error404Page />} />
        <Route path={'/verification'} element={<Verification />} />
        <Route path={'/error/401'} element={<Error401Page />} />
        <Route path={'/error/404'} element={<Error404Page />} />
        <Route path={'/error/400'} element={<Error400Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
