import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText)
function App() {

  return (
    <main>
      <Navbar></Navbar>
    </main>
  )
}

export default App
