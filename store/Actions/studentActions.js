import axios from "@/utils/axios";
import {
    addstudent,
    removeerror,
    removestudent,
    iserror,
    addalltasks,
    foundtask
} from "../Reducers/studentReducers"
import { toast } from "react-toastify";


export const asyncaddstudent = (student) => async(dispatch,getState) =>{
    try{
        console.log(student,"ots comming datta");
        const {data} = await axios.post("/student/signup",student);
        console.log(data ,"irs sfsfssf");
        dispatch(addstudent(data));
    toast.success("Register Succesfully!", { position: "top-right" });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    toast.warning("Wrong Credential!", { position: "top-right" });
    }
}

export const asynccurrentstudent = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/student");
        dispatch(addstudent(data.student));
        dispatch(addalltasks(data.tasks));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}


export const asyncloginstudent = (student) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/student/signin",student);
        console.log(data,"its student data");
        dispatch(addstudent(data));
    toast.success("Login Succesfully!", { position: "top-right" });
    }catch(error){
        dispatch(iserror(error.response.data.status_message)); 
    toast.warning("Invalid Credential!", { position: "top-right" });
    }
}

export const asynclogoutstudent = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/student/signout");
        console.log(data,"uts logoutdata");
        dispatch(removestudent(data));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncaddtask = (formdata) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/create/task",formdata);
        console.log(data,"uts logoutdata");
        dispatch(addstudent(data));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}


// find jobs on resume of student

export const asyncfindtask = (id) => async(dispatch,getState) =>{
    try{
        console.log(id,"its ");
        console.log("hitts");
        const {data} = await axios.get("/task/find/" + id);
        console.log(data);
        dispatch(foundtask(data.task));
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// find jobs on resume of student

// update jobs on resume of student

export const asyncupdatetask = (id , editdata) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/update/task/" + id , editdata);
        addstudent(data.task)
        console.log(data,"its sdaat");
        toast.success('Job Succesfully Updated!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// update jobs on resume of studen

export const asyncdeletetask = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/delete/task/" + id);
        toast.success('Job Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        asyncupdatejob
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

export const asynccomplete = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/completed/task/" + id);
        toast.success('Task Succesfully Completed!', { position: 'top-right' });
    }catch(error){
        asyncupdatejob
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}



// export const asyncalltasks = (formdata) => async(dispatch,getState) =>{
//     try{
//         const {data} = await axios.post("/alltasks",formdata);
//         console.log(data,"uts logoutdata");
//         dispatch(addstudent(data.student));
//         dispatch(addalltasks(data.tasks));

//     }catch(error){
//         dispatch(iserror(error.response.data.status_message));
//     }
// }








