import { Login } from './components/Login'
import { Register } from './components/Register'
import { Display } from './components/Display'

import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import AuthWrapper from './components/AuthWrapper'
import Sidebar from './components/Sidebar'



const App = () => {

  return (
    <>
      <Toaster/>
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[90px] flex">
            <Sidebar/>
            <Display/>
            {/* PlayerComponent */}
          </div>
        </div>
      </AuthWrapper>
    </>
  )
}

export default App
