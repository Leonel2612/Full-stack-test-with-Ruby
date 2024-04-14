/* eslint-disable react-hooks/exhaustive-deps */
import  {useCallback, useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { fetchFeatures, fethchFeaturesPerTypeMagnitude, resetFeatures } from "../Slices/api/featuresSlice"
import { useNavigate } from "react-router-dom";
import MyPagination from "../components/MyPagination";
import { setFeatureId } from "../Slices/featureIdSlice";


const DetailsOfEarthquake = () => {
  const dispatch = useDispatch();
  const state = useSelector((state)=>state)
  const magTypeValue= useSelector((state)=>state.magType.magType);
  const [pageValue,setPage] = useState(1)
  const perPageValue=2
  const navigate = useNavigate();

  const handleChangePage = useCallback((page) => {
    setPage(page)
    if (magTypeValue.length >0){
      let magTypeStrings= magTypeValue.join('&mag_type=')
      navigate(`/details?page=${page}&limit=${perPageValue}&mag_type=${magTypeStrings}`)
    }

    else{
      navigate(`/details?page=${page}&limit=${perPageValue}`)
    }
  }, [perPageValue,navigate]);

  const handleGoHome =()=>{
    navigate("/")
  }

  


  useEffect(()=>{
    if (magTypeValue.length >0){
      dispatch(fethchFeaturesPerTypeMagnitude({page:pageValue,perPage:perPageValue,magType:magTypeValue}))
    }
    else{
      dispatch(fetchFeatures({page:pageValue,perPage:perPageValue}))
    }
    
    return()=>{
      dispatch(resetFeatures())
    }
  },[dispatch,pageValue, perPageValue, magTypeValue]) 


  if (state.features.isLoading){
    return <h1>Loading....</h1>
  }

  const handleAddComment = (featureId)=>{
    dispatch(setFeatureId(featureId))
    navigate(`/features/${featureId}/comments`)
  }



  return (
    <div>
      <div>
        {
          state.features.data?.data?.length ? <>
            

            <div>
        <div className="container-features">
      <h1 className="title-text">Detalles de los terremotos en los ultimos 30 días</h1>
      {
        state.features.data && 
        state.features.data.data.map(feature=>{
        return(
          <ul  
          className="features-list"
          key={feature.id}>
          <li>
              <p> Lugar: {feature.attributes.place}</p>
              <p>Magnitud: {feature.attributes.magnitude}</p>
              <p>Tiempo: {feature.attributes.time}</p>  
              <p>Tipo de magnitud: {feature.attributes.mag_type}</p>  
              <p>Tsunami: {feature.attributes.tsunami? "Si": "No"}</p>
              <p>Titulo: {feature.attributes.title}</p>
              <p>ID externa: {feature.attributes.external_id} </p>
              <p> Latitud: {feature.attributes.coordinates.latitude}</p>
              <p> Longitud: {feature.attributes.coordinates.longitude}</p>
              <p> URL externa: <a href={feature.links.external_url}>{feature.links.external_url}</a></p>
          </li>

          <button
          className="button-add-comment"
          onClick={()=>handleAddComment(feature.id)}
          >
            Add a comment
          </button>
        </ul>
        )
        })
      }
      </div>
      {
        state.features.data && 
        <MyPagination
          total={Math.ceil(state.features.data.pagination.total/perPageValue)}
          current={state.features.data.pagination.current_page}
          onChangePage={handleChangePage}
          valueDisabled={state.features.isLoading}
      />
      }

      </div> 



          </>:
          <>
          <h1>No existe ningun terremoto con dicha magnitud</h1>
          </>
          
        }
                
      <div>
      <button
      onClick={handleGoHome}
      className="button-back-home"
      >
        Volver a la pantalla de inicio
      </button>
      </div>
     
    </div>
  </div>
  )
}

export default DetailsOfEarthquake
