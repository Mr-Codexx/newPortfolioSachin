import React from 'react'
import HeroSection from './components/WelcomePage'
import { MouseProvider } from './context/MouseContext'
import MouseEffect from './utils/MouseEffect'

const App = () => {
  return (
    <div>
    <MouseProvider>
       <MouseEffect />
        <HeroSection/>
    </MouseProvider>
    </div>
  )
}

export default App