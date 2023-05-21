import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthenticationFrame from './components/AuthenticationFrame'
import Error400Page from './components/ErrorPages/Error400Page'
import Error401Page from './components/ErrorPages/Error401Page'
import Error404Page from './components/ErrorPages/Error404Page'
import LandingPage from './components/LandingPage'
import Verification from './components/Verification'
import WithMainFrame from "./hoc/withMainFrame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<WithMainFrame children={[<LandingPage />]} />} />
        <Route
          path={'/login'}
          element={<AuthenticationFrame route={'login'} />}
        />
        <Route
          path={'/registration'}
          element={<AuthenticationFrame route={'registration'} />}
        />
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
