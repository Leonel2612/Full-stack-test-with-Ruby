import {configureStore} from "@reduxjs/toolkit"
import featuresReducer from "./Slices/api/featuresSlice.js"
import magTypeReducer from "./Slices/magTypeSlice.js"
import commentReducer from "./Slices/api/commentsSlice.js"
import postCommentReducer from "./Slices/api/postCommentsSlice.js"

export const store = configureStore( {
reducer:{
     features:featuresReducer,
     magType: magTypeReducer,
     comment:commentReducer,
     postComment:postCommentReducer
    },
    }
    )
