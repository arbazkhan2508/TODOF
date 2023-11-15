import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    student:null,
    errors:[],
    isAuthenticated:false,
    alltask:'',
    findtask:null
}

export const studentReducer = createSlice({
  name: 'student',
  initialState,
  
  reducers:{
     
     addstudent:(state,action)=>{
        state.student = action.payload;
        state.isAuthenticated = true;
     },
      removestudent:(state,action)=>{
         state.student = null;
         state.isAuthenticated = false;
      },
      iserror:(state,action)=>{
         state.errors.push(action.payload);  
      },
      removeerror:(state,action)=>{
         state.errors = [];  
      },
      addalltasks:(state,action)=>{
         state.alltask = action.payload;
      },
      foundtask:(state,action)=>{
         state.findtask = action.payload;
      },
  }
  
})

// Action creators are generated for each case reducer function
export const { 
   
    addstudent,
    removeerror,
    removestudent,
    iserror ,
    addalltasks,
    foundtask,
    
 } = studentReducer.actions

export default studentReducer.reducer;