import { createSlice } from '@reduxjs/toolkit'

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        settingPopup: false,
        addBookPopup: false,
        readBookPopup: false,
        recordBookPopup: false,
        returnBookPopup: false,
        addNewAdminPopup: false,
    },
    reducers:{
        toggleSettingPopup(state){
            state.settingPopup=!state.settingPopup
        },
        toggleAddBookPopup(state){
            state.addBookPopup=!state.addBookPopup
        },
        toggleRecordBookPopup(state){
            state.recordBookPopup=!state.recordBookPopup
        },
        toggleReadBookPopup(state){
            state.readBookPopup=!state.readBookPopup
        },
        toggleAddNewAdminPopup(state){
            state.addNewAdminPopup=!state.addNewAdminPopup
        },
         toggleReturnBookPopup(state){
            state.returnBookPopup=!state.returnBookPopup
        },
         closeAllPopup(state){
            state.addBookPopup=false;
            state.addNewAdminPopup=false,
            state.readBookPopup=false,
            state.recordBookPopup=false,
            state.returnBookPopup=false,
            state.settingPopup=false

        },
    }
})

export const {closeAllPopup,toggleAddBookPopup,toggleAddNewAdminPopup,toggleReadBookPopup,toggleRecordBookPopup,toggleReturnBookPopup,toggleSettingPopup,

}=popupSlice.actions
export default popupSlice.reducer