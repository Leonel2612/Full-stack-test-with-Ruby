import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchComments } from "../Slices/api/commentsSlice"
import { postComment } from "../Slices/api/postCommentsSlice"
import commentImage from "../../assets/commenting-image.png"


const CommentsOfEarthquake = () => {
    const dispatch = useDispatch()
    const [seeComments,setSeeComments]=useState(false)
    const [commentBody,setCommentBody]=useState('')
    const state = useSelector((state)=>state)
    const {featureId} = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(fetchComments({featureId:featureId}))
        
    },[dispatch,featureId,seeComments])

    if (state.comment.isLoading){
        return <h1>Loading...</h1>
    }

    const handleSeeComments=()=>{
        setSeeComments(!seeComments)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(commentBody)
        dispatch(postComment({featureId:featureId, body:commentBody}))
        setCommentBody("")
    }

    const handleComeBack = () =>{
        navigate("/details")
    }

    const formatDate = (inputDate)=>{
        if (inputDate){
            const formatOfDate={
                year:'numeric',month:'2-digit',day:'2-digit'
            };
            const date= new Date(inputDate)
            return date.toLocaleDateString('en-US',formatOfDate)
        }
    }
  return (
  <div className="container-comment">
    <img className="image-comment" src={commentImage}/>
    {
        !seeComments ? 
        (
           <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <textarea
                    className="text-comment-form"
                    value={commentBody}
                        onChange={(e)=>setCommentBody(e.target.value)}
                        placeholder="Escriba su comentario aqui"
                    />
                    <button
                    className="button-submit-comment"
                    type="submit"
                    > Agregar un nuevo comentario </button>
                </form>
                
            </div>
            ) :
                state.comment.data.length ? 
                (
                    state.comment.data &&    
                    state.comment.data.map((dataComment,index)=>{
                       
                        return(
                            
                            <ul key={dataComment.id}>
                                <li className="comments-to-show">
                                    <h2><strong>Comentario N#{index+1}</strong></h2>
                                    <p className="date-comment">Fecha de publicación: {formatDate(dataComment.created_at)}</p>
                                    <p className="comment-body">{dataComment.body}</p>
                                </li>
                            </ul>
                        )
                    } 
                )
                    )
                :
                <h1>No hay ningún comentario aún</h1>
                
    }
    <div className="container-buttons-bottom">
        {
            !seeComments &&
            <button
            className="button-go-details"
            onClick={handleComeBack}
        >
            Regresar 
        </button>
        }
        <button onClick={handleSeeComments}
        className={!seeComments?"see-comments-button" :"see-comments-button-two"}
        > { !seeComments? "Ver comentarios" : "Regresar"
        }
        </button>
    </div>
    



  </div>
  )
}

export default CommentsOfEarthquake