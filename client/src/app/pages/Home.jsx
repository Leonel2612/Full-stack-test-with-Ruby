import { useNavigate } from "react-router-dom"
import homeView from "../../assets/img-home.png"
import {  useState } from "react"
import { clearMagType, setMagType } from "../Slices/magTypeSlice"
import { useDispatch } from "react-redux"


const Home = () => {
  const [magTypes,setMagTypes]=useState('')
  const dispatch = useDispatch()
  const [error, setError]=useState('')
  const goToDetails=useNavigate()
  const handleGoToDetails = ()=>{
      dispatch(clearMagType())
      goToDetails('/details')
  }

  const handleMagTypeSubmit=()=>{
    const allowedValues = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"];
    const inputValues = magTypes.split(",").map(value=>value.trim())
    const invalidValues = inputValues.filter((values)=>!allowedValues.includes(values))
    
    if (invalidValues.length>0){
      setError(`Estos tipos de magnitudes no se encuentran: ${invalidValues.join(', ')}. Por favor ingrese una de estas magnitudes: md, ml, ms, mw, me, mi, mb, mlg`)
      setTimeout(()=>{
        setError('')
      },5000)
    }
    else{
      setError('')
      dispatch(setMagType(inputValues))
      goToDetails('/details')
    }

  }



  
  return (
    <div className="home-view">
        <div className="container-image">
            <img className="image-home" src={homeView}/>
        </div>
        <div>
            <h1 className="title-earthquakes">Monitoreo de Terremotos</h1>
            <h3 className="text-information">Informacion precisa y actualizada</h3>
        </div>
        <div>
            <button
            className="button-watch-earthquakes"
              onClick={handleGoToDetails}
            > Ver los sismos de estos últimos 30 días</button>
            
        </div>
        <div>
          <p className="text-paragraph">
          Tambien puede filtrar los sismos por tipos: 
          </p>
          <div className="container-input-button">
          <input 
          type="text"
          id="input-text-type"
          value={magTypes}
          placeholder="md, ml, ms, mw, me, mi, mb, mlg"
          onChange={(e)=>setMagTypes(e.target.value)}/>
          <button 
          className="button-watch-earthquakes-type"
            onClick={handleMagTypeSubmit}
          >
            Ver los sismos por tipo 
          </button>
          {
            error && <p className="error">{error}</p>
          }
          </div>
          
        </div>
    </div>
  )
}

export default Home
