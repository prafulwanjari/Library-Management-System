import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toggleAddNewAdminPopup } from './popUpSlice';

const userSlice = createSlice({
    name: "User",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchAllUsersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAllUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchAllUsersFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addNewAdminRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addNewAdminSuccess(state) {
            state.loading = false;
        },
        addNewAdminFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const FetchAllusers = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAllUsersRequest());
    try {
        const res = await axios.get("https://library-management-system-nu-two.vercel.app//api/v1/user/all", { withCredentials: true });
        dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));
    } catch (err) {
        dispatch(userSlice.actions.fetchAllUsersFailed(err.response?.data?.message || 'Failed to fetch users'));
    }
}

export const addNewAdmin = (data) => async (dispatch) => {
    dispatch(userSlice.actions.addNewAdminRequest());
    try {
        const res = await axios.post("https://library-management-system-nu-two.vercel.app//api/v1/user/add/new-admin", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(userSlice.actions.addNewAdminSuccess());
        toast.success(res.data?.message);
        dispatch(toggleAddNewAdminPopup())
    } catch (err) {
        dispatch(userSlice.actions.addNewAdminFailed(err.response?.data?.message || 'Failed to add admin'));
        toast.error(err.response?.data?.message || 'Failed to add admin');
    }
}

export default userSlice.reducer;