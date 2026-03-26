import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem('pastes')
  ? JSON.parse(localStorage.getItem('pastes'))
  :[],
}

export const pasteSlice = createSlice({
  name: 'paste ',
  initialState,
  reducers: {
    addToPastes: (state, action)=>{
      const note=action.payload;
      state.pastes.push(note);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      //creating toast to display when paste is added, add hot toast package
      toast.success("Note Created Successfully", {
        duration: 1000,
      });
    },

    updateToPaste: (state,action)=>{
      const note=action.payload;
      const index= state.pastes.findIndex((item)=>item._id===note._id);

      if(index>=0){
        state.pastes[index]=note;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Note Updated");
      }
    },

    resetAllPastes: (state)=>{
      state.pastes=[];

      localStorage.removeItem("pastes");
    },

    deletePaste: (state,action)=>{
      const pasteID= action.payload;

      const index= state.pastes.findIndex((item)=> item._id=== pasteID);
      //console.log(index);
      //console.log(state.pastes);
      console.log([...state.pastes])

      if(index>=0){
        console.log(index);
        state.pastes.splice(index,1);
        //using splice removes "second parameter" number of items beginning from index passed as first paramter

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Note Deleted");
      }
    }
  },
})

export const { addToPastes,updateToPaste,resetAllPastes,deletePaste } = pasteSlice.actions

export default pasteSlice.reducer
