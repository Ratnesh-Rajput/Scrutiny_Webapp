const express = require("express");
const router =  express.Router();
const {
    homepage,
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    readallinternships,
    applyinternship,
    readalljobs,
    applyjob
 } = require ("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

//Get /
router.get ("/",homepage );

//Post /student
router.post ("/student",isAuthenticated,currentUser);

//POST/student/Signup
router.post("/student/signup",studentsignup)

//POST/student/Signin
router.post("/student/signin",studentsignin)

//Get/student/Signout
router.get("/student/signout",isAuthenticated,studentsignout)

//Post/student/send-mail (Forget password)
router.post("/student/send-mail",studentsendmail)

//Post /student/forget-link/:email
router.post("/student/forget-link/",studentforgetlink);

//Post/student/reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated ,studentresetpassword);

//Post/student/Update/:studentid
router.post("/student/update/:id",isAuthenticated ,studentupdate);

//Post/student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

//------------------------------read All internship-----------------------------

//Post/student/all/internships/
router.post("/student/allinternships/", isAuthenticated, readallinternships)
//------------------------------apply internship--------------------------------

//Post/student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);


//------------------------------all Jobs-----------------------------------------

//Post/student/all/jobs/
router.post("/student/alljobs/", isAuthenticated, readalljobs)

//------------------------------apply job----------------------------------------

//Post/student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;