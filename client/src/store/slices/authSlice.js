// import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'

// // url="http://localhost:4000"

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         loading: false,
//         error: false,
//         message: null,
//         user: null,
//         isAuthenticated: false,
//     },
//     reducers: {
//         registerRequest(state) {
//             state.loading = true;
//             state.error = false;
//             state.message = null;
//         },
//         registerSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message;

//         },
//         registerFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;

//         },
//         otpVerificationRequest(state) {
//             state.loading = true;
//             state.error = false;
//             state.message = false;
//         },
//         otpVerificationSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message;
//             state.isAuthenticated = true;
//             state.user = action.payload.user

//         },
//         otpVerificationFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;

//         },
//         loginRequest(state) {
//             state.loading = true;
//             state.error = false;
//             state.message = false;
//         },
//         loginSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message;
//             state.isAuthenticated = true;
//             state.user = action.payload.user

//         },
//         loginFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;

//         },
//         logoutRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         logoutSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message;
//             state.isAuthenticated = false;
//             state.user = null

//         },
//         logoutFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;
//             state.message = null;


//         },

//         getUserRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         getUserSuccess(state,action) {
//             state.loading = false;
//             state.isAuthenticated = true;
//             state.user = action.payload.user

//         },
//         getUserFailed(state,action) {
//             state.loading = false;
//             state.error = action.payload;
//             state.user = null
//             state.isAuthenticated = false;


//         },

//         forgotPasswordRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         forgotPasswordSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload;


//         },
//         forgotPasswordFailed(state,action) {
//             state.loading = false;
//             state.error = action.payload;



//         },

//         resetPasswordRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         resetPasswordSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message;
//             state.user=action.payload.user
//              state.isAuthenticated=true
//         },
//         resetPasswordFailed(state,action) {
//             state.loading = false;
//             state.error = action.payload;
//         },

//          updatePasswordRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         updatePasswordSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message;
//             state.user=action.payload.user
//              state.isAuthenticated=true
//         },
//         updatePasswordFailed(state,action) {
//             state.loading = false;
//             state.error = action.payload;
//         },








//         resetAuthSlice(state) {
//             state.error = null;
//                 state.loading = false;
//                 state.message = null;
              
//         }

//     },
// })


// export const resetAuthSlice = () => (dispatch) => {
//     dispatch(authSlice.actions.resetAuthSlice())
// }

// export const register = (data) => async (dispatch) => {
//     dispatch(authSlice.actions.registerRequest())
//     await axios.post("https://library-management-system-seven-iota.vercel.app/api/v1/auth/register", data, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         dispatch(authSlice.actions.registerSuccess(res.data))
//     }).catch(error => {
//         dispatch(authSlice.actions.registerFailed(error.response.data.message))
//     })
// }


// export const login = (data) => async (dispatch) => {
//     dispatch(authSlice.actions.loginRequest())
//     await axios.post("https://library-management-system-seven-iota.vercel.app/api/v1/auth/login", data, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         dispatch(authSlice.actions.loginSuccess(res.data))
//     }).catch(error => {
//         dispatch(authSlice.actions.loginFailed(error.response.data.message))
//     })
// }

// export const otpVerification = (data) => async (dispatch) => {
//     dispatch(authSlice.actions.otpVerificationRequest())
//     await axios.post("https://library-management-system-seven-iota.vercel.app/api/v1/auth/verify-otp", data, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         dispatch(authSlice.actions.otpVerificationSuccess(res.data))
//     }).catch(error => {
//         dispatch(authSlice.actions.otpVerificationFailed(error.response.data.message))
//     })
// }

// export const logout = () => async (dispatch) => {
//     dispatch(authSlice.actions.logoutRequest())
//     await axios.get("https://library-management-system-seven-iota.vercel.app/api/v1/auth/logout", {
//         withCredentials: true,
      
//     }).then(res => {
//         dispatch(authSlice.actions.logoutSuccess(res.data))
//         dispatch(authSlice.actions.resetAuthSlice())

//     }).catch(error => {
//         dispatch(authSlice.actions.logoutFailed(error.response.data.message))
//     })
// }

// export const getUser = () => async (dispatch) => {
//     dispatch(authSlice.actions.getUserRequest())
//     await axios.get("https://library-management-system-seven-iota.vercel.app/api/v1/auth/me", {
//         withCredentials: true,
    


//     }).then(res => {
//         dispatch(authSlice.actions.getUserSuccess(res.data))
      

//     }).catch(error => {
//         dispatch(authSlice.actions.getUserFailed(error.response.data.message))
//     })
// }



// export const forgotPassword = (data) => async (dispatch) => {
//     dispatch(authSlice.actions.forgotPasswordRequest())
//     await axios.post("https://library-management-system-seven-iota.vercel.app/api/v1/auth/password/forgot", data, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message))
//     }).catch(error => {
//         dispatch(authSlice.actions.forgotPasswordFailed(error.response.data.message))
//     })
// }

// export const resetPassword = (data,token) => async (dispatch) => {
//     dispatch(authSlice.actions.resetPasswordRequest())
//     await axios.put(`https://library-management-system-seven-iota.vercel.app/api/v1/auth/password/reset/${token}`,data, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         dispatch(authSlice.actions.resetPasswordSuccess(res.data))
//     }).catch(error => {
//         dispatch(authSlice.actions.resetPasswordFailed(error.response.data.message))
//     })
// }

// export const updatePassword = (data) => async (dispatch) => {
//     dispatch(authSlice.actions.updatePasswordRequest())
//     await axios.put(`https://library-management-system-seven-iota.vercel.app/api/v1/auth/password/update`,data, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         dispatch(authSlice.actions.updatePasswordSuccess(res.data))
//     }).catch(error => {
//         dispatch(authSlice.actions.updatePasswordFailed(error.response.data.message))
//     })
// }


// export default authSlice.reducer;






import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../utill/axiosInstance'  

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: false,
        message: null,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = false;
            state.message = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        otpVerificationRequest(state) {
            state.loading = true;
            state.error = false;
            state.message = false;
        },
        otpVerificationSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        otpVerificationFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loginRequest(state) {
            state.loading = true;
            state.error = false;
            state.message = false;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logoutRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        getUserRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        getUserFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        },
        forgotPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        updatePasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetAuthSlice(state) {
            state.error = null;
            state.loading = false;
            state.message = null;
        }
    }
})

export const resetAuthSlice = () => (dispatch) => {
    dispatch(authSlice.actions.resetAuthSlice())
}

// Thunks using axiosInstance

export const register = (data) => async (dispatch) => {
    dispatch(authSlice.actions.registerRequest())
    try {
        const res = await axiosInstance.post("/api/v1/auth/register", data)
        dispatch(authSlice.actions.registerSuccess(res.data))
    } catch (error) {
        dispatch(authSlice.actions.registerFailed(error.response?.data?.message || error.message))
    }
}

export const login = (data) => async (dispatch) => {
    dispatch(authSlice.actions.loginRequest())
    try {
        const res = await axiosInstance.post("/api/v1/auth/login", data)
        dispatch(authSlice.actions.loginSuccess(res.data))
    } catch (error) {
        dispatch(authSlice.actions.loginFailed(error.response?.data?.message || error.message))
    }
}

export const otpVerification = (data) => async (dispatch) => {
    dispatch(authSlice.actions.otpVerificationRequest())
    try {
        const res = await axiosInstance.post("/api/v1/auth/verify-otp", data)
        dispatch(authSlice.actions.otpVerificationSuccess(res.data))
    } catch (error) {
        dispatch(authSlice.actions.otpVerificationFailed(error.response?.data?.message || error.message))
    }
}

export const logout = () => async (dispatch) => {
    dispatch(authSlice.actions.logoutRequest())
    try {
        const res = await axiosInstance.get("/api/v1/auth/logout")
        dispatch(authSlice.actions.logoutSuccess(res.data))
        dispatch(authSlice.actions.resetAuthSlice())
    } catch (error) {
        dispatch(authSlice.actions.logoutFailed(error.response?.data?.message || error.message))
    }
}

export const getUser = () => async (dispatch) => {
    dispatch(authSlice.actions.getUserRequest())
    try {
        const res = await axiosInstance.get("/api/v1/auth/me")
        dispatch(authSlice.actions.getUserSuccess(res.data))
    } catch (error) {
        dispatch(authSlice.actions.getUserFailed(error.response?.data?.message || error.message))
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    dispatch(authSlice.actions.forgotPasswordRequest())
    try {
        const res = await axiosInstance.post("/api/v1/auth/password/forgot", data)
        dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message))
    } catch (error) {
        dispatch(authSlice.actions.forgotPasswordFailed(error.response?.data?.message || error.message))
    }
}

export const resetPassword = (data, token) => async (dispatch) => {
    dispatch(authSlice.actions.resetPasswordRequest())
    try {
        const res = await axiosInstance.put(`/api/v1/auth/password/reset/${token}`, data)
        dispatch(authSlice.actions.resetPasswordSuccess(res.data))
    } catch (error) {
        dispatch(authSlice.actions.resetPasswordFailed(error.response?.data?.message || error.message))
    }
}

export const updatePassword = (data) => async (dispatch) => {
    dispatch(authSlice.actions.updatePasswordRequest())
    try {
        const res = await axiosInstance.put("/api/v1/auth/password/update", data)
        dispatch(authSlice.actions.updatePasswordSuccess(res.data))
    } catch (error) {
        dispatch(authSlice.actions.updatePasswordFailed(error.response?.data?.message || error.message))
    }
}

export default authSlice.reducer