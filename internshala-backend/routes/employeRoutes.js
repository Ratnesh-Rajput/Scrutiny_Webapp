const express = require("express");
const router =  express.Router();

const {
    homepage,
     currentEmploye,
     employesignup,
     employesignin,
     employesignout,
     employesendmail,
     employeforgetlink,
     employeresetpassword,
     employeupdate,
     employeavatar,
     createinternship,
     readinternship,
     readsingleinternship,
     createjob,
     readjob,
     readsinglejob
 } = require ("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

//Get /
router.get ("/",homepage );

//Post /employe
router.post ("/current",isAuthenticated,currentEmploye );

//POST/employe/Signup
router.post("/signup",employesignup)

//POST/employe/Signin
router.post("/signin",employesignin)

//Get/employe/Signout
router.get("/signout",isAuthenticated,employesignout)

//Post/employe/send-mail (Forget password)
router.post("/send-mail",employesendmail)

//Get/employe/forget-link/:employeid
router.get("/forget-link/",employeforgetlink);

//Post/employe/reset-password/:employeid
router.post("/reset-password/:id",isAuthenticated ,employeresetpassword);

//Post/employe/Update/:employeid
router.post("/update/:id",isAuthenticated ,employeupdate);

//Post/employe/avatar/:employeid
router.post("/avatar/:id", isAuthenticated, employeavatar);

//--------------------------Internship-----------------------------------

//Post/employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

//Post/employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

//Post/employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

//--------------------------Job-----------------------------------

//Post/employe/job/create
router.post("/job/create", isAuthenticated, createjob);

//Post/employe/job/read
router.post("/job/read", isAuthenticated, readjob);

//Post/employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);

module.exports = router;