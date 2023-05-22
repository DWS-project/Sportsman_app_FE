import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthenticationFrame from './components/AuthenticationFrame'
import LandingPage from './components/LandingPage'
import { EditProfilePage } from './components/EditProfilePage'

function App() {
  return (
    <>
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
          <Route path={'/editProfile'}
            element={<EditProfilePage route={'editProfile'} />}
            />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
