
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './app/pages/Home'
import DetailsOfEarthquake from './app/pages/DetailsOfEarthquake'
import CommentsOfEarthquake from './app/pages/CommentsOfEarthquake'

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route>

            <Route path='/' element ={<Home />}/>
            <Route path='/details' element= {<DetailsOfEarthquake/>}/>
            <Route path='/features/:featureId/comments' element={<CommentsOfEarthquake/>}/>
        
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
