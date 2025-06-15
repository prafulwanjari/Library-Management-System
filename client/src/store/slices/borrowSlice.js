// import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
// import { toggleRecordBookPopup } from './popUpSlice'

// const borrowSlice = createSlice({
//     name: "borrow",
//     initialState: {
//         loading: false,
//         error: null,
//         userBorrowedBooks: [],
//         allBorrowedBook: [],
//         message: null
//     },
//     reducers: {
//         fetchUserBorrowedBooksRequest(state) {
//             state.loading = true
//             state.error = null
//             state.message = null
//         },
//         fetchUserBorrowedBooksSuccess(state, action) {
//             state.loading = false
//             state.userBorrowedBooks = action.payload
//         },
//         fetchUserBorrowedBooksFailed(state, action) {
//             state.loading = false
//             state.error = action.payload
//             state.message = null
//         },

//         recordBookRequest(state) {
//             state.loading = true
//             state.error = null
//             state.message = null
//         },
//         recordBookSuccess(state, action) {
//             state.loading = false
//             state.message = action.payload
//         },
//         recordBookFailed(state, action) {
//             state.loading = false
//             state.error = action.payload
//             state.message = null
//         },

//         fetchAllBorrowedBooksRequest(state) {
//             state.loading = true
//             state.error = null
//             state.message = null
//         },
//         fetchAllBorrowedBooksSuccess(state, action) {
//             state.loading = false
//             state.allBorrowedBook = action.payload
//         },
//         fetchAllBorrowedBooksFailed(state, action) {
//             state.loading = false
//             state.error = action.payload
//             state.message = null
//         },

//         returnBookRequest(state) {
//             state.loading = true
//             state.error = null
//             state.message = null
//         },
//         returnBookSuccess(state, action) {
//             state.loading = false
//             state.message = action.payload
//         },
//         returnBookFailed(state, action) {
//             state.loading = false
//             state.error = action.payload
//             state.message = null
//         },

//         resetBorrowSlice(state) {
//             state.loading = false
//             state.error = null
//             state.message = null
//         }
//     }
// })

// // Thunks

// export const fetchUserBorrowedBooks = () => async (dispatch) => {
//     dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest())
//     try {
//         const res = await axios.get("https://library-management-system-seven-iota.vercel.app/api/v1/borrow/my-borrowed-books", {
//             withCredentials: true
//         })
//         dispatch(borrowSlice.actions.fetchUserBorrowedBooksSuccess(res.data.borrowedBooks))
//     } catch (err) {
//         const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
//         dispatch(borrowSlice.actions.fetchUserBorrowedBooksFailed(errorMessage))
//     }
// }

// export const fetchAllBorrowedBooks = () => async (dispatch) => {
//     dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest())
//     try {
//         const res = await axios.get("https://library-management-system-seven-iota.vercel.app/api/v1/borrow/borrowed-books-by-users", {
//             withCredentials: true
//         })
//         dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks))
//     } catch (err) {
//         const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
//         dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(errorMessage))
//     }
// }

// export const recordBorrowedBook = (id, email) => async (dispatch) => {
//     dispatch(borrowSlice.actions.recordBookRequest())
//     try {
//         const res = await axios.post(`https://library-management-system-seven-iota.vercel.app/api/v1/borrow/record-borrow-book/${id}`, { email }, {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         dispatch(borrowSlice.actions.recordBookSuccess(res.data.message))
//         dispatch(toggleRecordBookPopup())
//     } catch (err) {
//         const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
//         dispatch(borrowSlice.actions.recordBookFailed(errorMessage))
//     }
// }

// export const returnBook = (id, email) => async (dispatch) => {
//     dispatch(borrowSlice.actions.returnBookRequest())
//     try {
//         const res = await axios.put(`https://library-management-system-seven-iota.vercel.app/api/v1/borrow/return-borrowed-book/${id}`, { email }, {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         dispatch(borrowSlice.actions.returnBookSuccess(res.data.message))
//     } catch (err) {
//         const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
//         dispatch(borrowSlice.actions.returnBookFailed(errorMessage))
//     }
// }

// export const resetBorrowSlice = () => (dispatch) => {
//     dispatch(borrowSlice.actions.resetBorrowSlice())
// }

// export default borrowSlice.reducer



import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../utill/axiosInstance'
import { toggleRecordBookPopup } from './popUpSlice'

const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        loading: false,
        error: null,
        userBorrowedBooks: [],
        allBorrowedBook: [],
        message: null
    },
    reducers: {
        fetchUserBorrowedBooksRequest(state) {
            state.loading = true
            state.error = null
            state.message = null
        },
        fetchUserBorrowedBooksSuccess(state, action) {
            state.loading = false
            state.userBorrowedBooks = action.payload
        },
        fetchUserBorrowedBooksFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },

        recordBookRequest(state) {
            state.loading = true
            state.error = null
            state.message = null
        },
        recordBookSuccess(state, action) {
            state.loading = false
            state.message = action.payload
        },
        recordBookFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },

        fetchAllBorrowedBooksRequest(state) {
            state.loading = true
            state.error = null
            state.message = null
        },
        fetchAllBorrowedBooksSuccess(state, action) {
            state.loading = false
            state.allBorrowedBook = action.payload
        },
        fetchAllBorrowedBooksFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },

        returnBookRequest(state) {
            state.loading = true
            state.error = null
            state.message = null
        },
        returnBookSuccess(state, action) {
            state.loading = false
            state.message = action.payload
        },
        returnBookFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },

        resetBorrowSlice(state) {
            state.loading = false
            state.error = null
            state.message = null
        }
    }
})

// Thunks

export const fetchUserBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest())
    try {
        const res = await axiosInstance.get("/api/v1/borrow/my-borrowed-books")
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksSuccess(res.data.borrowedBooks))
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksFailed(errorMessage))
    }
}

export const fetchAllBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest())
    try {
        const res = await axiosInstance.get("/api/v1/borrow/borrowed-books-by-users")
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks))
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(errorMessage))
    }
}

export const recordBorrowedBook = (id, email) => async (dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest())
    try {
        const res = await axiosInstance.post(`/api/v1/borrow/record-borrow-book/${id}`, { email })
        dispatch(borrowSlice.actions.recordBookSuccess(res.data.message))
        dispatch(toggleRecordBookPopup())
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
        dispatch(borrowSlice.actions.recordBookFailed(errorMessage))
    }
}

export const returnBook = (id, email) => async (dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest())
    try {
        const res = await axiosInstance.put(`/api/v1/borrow/return-borrowed-book/${id}`, { email })
        dispatch(borrowSlice.actions.returnBookSuccess(res.data.message))
    } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || "Something went wrong"
        dispatch(borrowSlice.actions.returnBookFailed(errorMessage))
    }
}

export const resetBorrowSlice = () => (dispatch) => {
    dispatch(borrowSlice.actions.resetBorrowSlice())
}

export default borrowSlice.reducer