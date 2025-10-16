import { Login } from './components/Login'
import { Register } from './components/Register'
import { Display } from './components/Display'

import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import AuthWrapper from './components/AuthWrapper'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import { useContext } from 'react'
import { PlayerContext } from './context/PlayerContext'





const App = () => {
  const {audioRef, track} = useContext(PlayerContext);

  return (
    <>
      <Toaster/>
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[90px] flex">
            <Sidebar/>
            <Display/>
          </div>
          {/* PlayerComponent */}
          <Player/>
          <audio ref={audioRef} src={track?track.file:""} preload='auto'>
            
          </audio>
        </div>
      </AuthWrapper>
    </>
  )
}

export default App
