import './App.css'
import AuthenticationFrame from './components/AuthenticationFrame'

function App() {
  console.log('process.env.FRONTEND_URL', process.env.FRONTEND_URL)

  return (
    <div>
      <AuthenticationFrame />
    </div>
  )
}

export default App
