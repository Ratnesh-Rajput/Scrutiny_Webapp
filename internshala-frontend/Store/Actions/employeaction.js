import axios from "@/utils/axios";
import {addemploye,removeemploye,iserror,removeerror,addjobs,addinternships} from "../Reducers/employeReducer"
import { toast } from "react-toastify";

export const asynccurrentemploye =() => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/employe/current");
        dispatch(addemploye(data.employe))
    } catch (error) {
        dispatch(iserror(error.response.data.message));
        // console.log(error.response.data.message);
    }
}

export const asyncsignupemploye =(employe) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/employe/signup",employe);
        console.log(data);
        
    } catch (error) {
        dispatch(iserror(error.response.data.message));
        
    }    
}

export const asyncsigninemploye =(employe) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/employe/signin",employe);
        // For saving the cookie 
        asynccurrentemploye();
        console.log(data);
        
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }    
}

export const asyncsignoutemploye =(employe) => async(dispatch,getState) => {
    try {
        const {data} = await axios.get("/employe/signout");
        dispatch(removeemploye())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncupdateemploye =(employe) => async(dispatch,getState) => {
    try {
        const {_id} = getState().employeReducer.employe
        const {data} = await axios.post("/employe/update/" + _id, employe);
        dispatch(asynccurrentemploye())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncavataremploye = (avatar) => async(dispatch,getState) => {
    try {
        const {_id} = getState().employeReducer.employe
        const {data} = await axios.post("/employe/avatar/" + _id, avatar);
        dispatch(asynccurrentemploye())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncresetpasswordemploye =(pwd) => async(dispatch,getState) => {
    try {
        console.log(pwd)
        // console.log(getState().studentReducer.employe._id);
        const {_id} = getState().employeReducer.employe
        const {data} = await axios.post("/employe/reset-password/" + _id, {password:pwd});
        // console.log(data);
        dispatch(asynccurrentemploye())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncforgetpasswordemploye =(email) => async(dispatch,getState) => {
    try {
         console.log("email mil gaiiiii",email)
        const {data} = await axios.post("/employe/send-mail", {email});
         console.log("data email",data);
        dispatch(asynccurrentemploye())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

export const asyncotppasswordemploye =(pwd) => async(dispatch,getState) => {
    try {
        const {data} = await axios.post("/employe/forget-link/", {pwd});
        console.log(data);
        dispatch(asynccurrentemploye())
    } catch (error) {
        dispatch(iserror(error.response.data.message));
    }       
}

// export const asyncalljobs =() => async(dispatch,getState) => {
//     try {
//         const {data} = await axios.post("/employe/alljobs/");
//         dispatch(addjobs(data.jobs))
//     } catch (error) {
//         dispatch(iserror(error.response.data.message));
//     }       
// }

// export const asyncallinternships =() => async(dispatch,getState) => {
//     try {
//         const {data} = await axios.post("/employe/allinternships/");
//         dispatch(addinternships(data.internships))

//     } catch (error) {
//         dispatch(iserror(error.response.data.message));
//     }       
// }

// export const asyncapplyjobemploye =(id) => async(dispatch,getState) => {
//     try {
//         const {data} = await axios.post("/employe/apply/job/"+id);
//         // console.log(data);
//         dispatch(asynccurrentemploye())
//         dispatch(asyncalljobs())

//     } catch (error) {
//         dispatch(iserror(error.response.data.message));
//     }       
// }

// export const asyncapplyinternshipemploye =(id) => async(dispatch,getState) => {
//     try {
//         const {data} = await axios.post("/employe/apply/internship/"+id);
//         // console.log(data);
//         dispatch(asynccurrentemploye())
//         dispatch(asyncallinternships())

//     } catch (error) {
//         dispatch(iserror(error.response.data.message));
//     }       
// }