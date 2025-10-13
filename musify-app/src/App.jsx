import { Login } from './components/Login'
import { Register } from './components/Register'
import { Display } from './components/Display'

import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import AuthWrapper from './components/AuthWrapper'


const App = () => {

  return (
    <>
      <Toaster/>
      <AuthWrapper>
        <Display/>
      </AuthWrapper>
    </>
  )
}

export default App
