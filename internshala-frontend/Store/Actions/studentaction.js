import axios from "@/utils/axios";
import {addstudent,removestudent,iserror,removeerror,addjobs,addinternships} from "../Reducers/studentReducer"
import { toast } from "react-toastify";

export const asynccurrentstudent =() => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student");
        dispatch(addstudent(data.student))
    } catch (error) {
        dispatch(iserror(error.response.data.message));
        // console.log(error.response.data.message);
    }
}

export const asyncsignupstudent =(student) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/signup",student);
        console.log(data);
        
    } catch (error) {
        dispatch(iserror(error.response.data.message));
        
    }    
}

export const asyncsigninstudent =(student) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/signin",student);
        // For saving the cookie 
        asynccurrentstudent();
        console.log(data);
        
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }    
}

export const asyncsignoutstudent =(student) => async(dispatch,getState) => {
    try {
        const {data} = await axios.get("/student/signout");
        dispatch(removestudent())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncupdatestudent =(student) => async(dispatch,getState) => {
    try {
        const {_id} = getState().studentReducer.student
        const {data} = await axios.post("/student/update/" + _id, student);
        dispatch(asynccurrentstudent())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncavatarstudent = (avatar) => async(dispatch,getState) => {
    try {
        const {_id} = getState().studentReducer.student
        const {data} = await axios.post("/student/avatar/" + _id, avatar);
        dispatch(asynccurrentstudent())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncresetpasswordstudent =(pwd) => async(dispatch,getState) => {
    try {
        console.log(pwd)
        // console.log(getState().studentReducer.student._id);
        const {_id} = getState().studentReducer.student
        const {data} = await axios.post("/student/reset-password/" + _id, {password:pwd});
        // console.log(data);
        dispatch(asynccurrentstudent())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncforgetpasswordstudent =(email) => async(dispatch,getState) => {
    try {
        // console.log("email mil gaiiiii",email)
        const {data} = await axios.post("/student/send-mail", {email});
        // console.log("data email",data);
        dispatch(asynccurrentstudent())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncotppasswordstudent =(pwd) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/forget-link/", {pwd});
        // console.log(data);
        dispatch(asynccurrentstudent())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncalljobs =() => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/alljobs/");
        dispatch(addjobs(data.jobs))
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncallinternships =() => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/allinternships/");
        dispatch(addinternships(data.internships))

    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncapplyjobstudent =(id) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/apply/job/"+id);
        // console.log(data);
        dispatch(asynccurrentstudent())
        dispatch(asyncalljobs())

    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncapplyinternshipstudent =(id) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/student/apply/internship/"+id);
        // console.log(data);
        dispatch(asynccurrentstudent())
        dispatch(asyncallinternships())

    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}