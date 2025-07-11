// import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
// import { toggleAddBookPopup } from './popUpSlice'

// const bookSlice = createSlice({
//     name: "book",
//     initialState: {
//         loading: false,
//         error: null,
//         message: null,
//         books: [],
//     },
//     reducers: {
//         fetchBookRequest(state) {
//             state.loading = true
//             state.error = null
//             state.message = null
//         },
//         fetchBookSuccess(state, action) {
//             state.loading = false;
//             state.books=action.payload

     

//         },
//         fetchBookFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload
//             state.message = null
//         },

//         addBookRequest(state) {
//             state.loading = true;
//             state.error = null
//             state.message = null
//         },
//         addBookSuccess(state, action) { 
//             state.loading = false
//             state.message=action.payload
//             state.error = null 

//         },
//         addBookFailed(state, action) { 
//             state.loading = false
//             state.error = action.payload
            
//         },
//         resetBookSlice(state){
//             state.error=null
//             state.message=null
//             state.loading=false
//         }
//     }
// })

// export const fetchAllBooks=()=>async(dispatch)=>{
//     dispatch(bookSlice.actions.fetchBookRequest())
//     await axios.get("https://library-management-system-seven-iota.vercel.app/api/v1/book/all",{
//         withCredentials:true,
        
//     }).then(res=>{
//         dispatch(bookSlice.actions.fetchBookSuccess(res.data.book))
       
//     }).catch(err=>{
//         dispatch(bookSlice.actions.fetchBookFailed(err.response.data.message))
//     })
// }


// export const addAllBooks= (data) => async(dispatch) =>{
//     dispatch(bookSlice.actions.addBookRequest())
//     await axios.post("https://library-management-system-seven-iota.vercel.app/api/v1/book/admin/add",data,{
//         withCredentials:true,
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         dispatch(bookSlice.actions.addBookSuccess(res.data.message))
//         //  dispatch(toggleAddBookPopup())
//     }).catch(err=>{
//         dispatch(bookSlice.actions.addBookFailed(err.response.data.message))
//     })
// }

// export const resetBookSlice=()=>(dispatch)=>{
// dispatch(bookSlice.actions.resetBookSlice())
// }

// export default bookSlice.reducer






import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../utill/axiosInstance'
import { toggleAddBookPopup } from './popUpSlice'

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBookRequest(state) {
            state.loading = true
            state.error = null
            state.message = null
        },
        fetchBookSuccess(state, action) {
            state.loading = false
            state.books = action.payload
        },
        fetchBookFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },

        addBookRequest(state) {
            state.loading = true
            state.error = null
            state.message = null
        },
        addBookSuccess(state, action) {
            state.loading = false
            state.message = action.payload
            state.error = null
        },
        addBookFailed(state, action) {
            state.loading = false
            state.error = action.payload
        },
        resetBookSlice(state) {
            state.error = null
            state.message = null
            state.loading = false
        }
    }
})

// Thunks

export const fetchAllBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBookRequest())
    try {
        const res = await axiosInstance.get("/api/v1/book/all")
        dispatch(bookSlice.actions.fetchBookSuccess(res.data.book))
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
        dispatch(bookSlice.actions.fetchBookFailed(errorMessage))
    }
}

export const addAllBooks = (data) => async (dispatch) => {
    dispatch(bookSlice.actions.addBookRequest())
    try {
        const res = await axiosInstance.post("/api/v1/book/admin/add", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(bookSlice.actions.addBookSuccess(res.data.message))
        // dispatch(toggleAddBookPopup())
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
        dispatch(bookSlice.actions.addBookFailed(errorMessage))
    }
}

export const resetBookSlice = () => (dispatch) => {
    dispatch(bookSlice.actions.resetBookSlice())
}

export default bookSlice.reducer