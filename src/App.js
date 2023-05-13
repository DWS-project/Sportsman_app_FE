import './App.css'
import AuthenticationFrame from './components/AuthenticationFrame'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<AuthenticationFrame route={'registration'}/>}></Route>
          <Route path={'/login'} element={<AuthenticationFrame route={'login'}/>}></Route>
          <Route path={'/registration'} element={<AuthenticationFrame route={'registration'}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
