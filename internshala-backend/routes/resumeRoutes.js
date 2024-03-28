const express = require("express");
const router =  express.Router();
const {
       resume,addeducation,editeducation,deleteeducation,
       addjobs,editjob,deletejob,
       addinternship,editinternship,deleteinternship,
       addresponsibility, editresponsibility, deleteresponsibility,
       addcourses, editcourses, deletecourses,
       addproject,editproject,deleteproject,
       addskill, editskill, deleteskill,
       addrewards, editrewards, deleterewards,
    } = require ("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

//Get 
router.get("/",isAuthenticated,resume);

//Post (Education)
router.post("/add-edu",isAuthenticated,addeducation);

//Post 
router.post("/edit-edu/:eduid",isAuthenticated,editeducation);

//Post 
router.post("/delete-edu/:eduid",isAuthenticated,deleteeducation);

//Post (Jobs)
router.post("/add-jobs", isAuthenticated, addjobs);

//Post 
router.post("/edit-jobs/:jobid",isAuthenticated,editjob);

//Post 
router.post("/delete-jobs/:jobid",isAuthenticated,deletejob);

//Post (InternShip)
router.post("/add-internship", isAuthenticated, addinternship);

//Post 
router.post("/edit-internship/:internshipid",isAuthenticated,editinternship);

//Post 
router.post("/delete-internship/:internshipid",isAuthenticated,deleteinternship);

//Post (Position of Responsibility)
router.post("/add-responsibility", isAuthenticated, addresponsibility);

//Post 
router.post("/edit-responsibility/:responsibilityid",isAuthenticated,editresponsibility);

//Post 
router.post("/delete-responsibility/:resposibilityid",isAuthenticated,deleteresponsibility);

//Post (Courses)
router.post("/add-courses",isAuthenticated,addcourses);

//Post 
router.post("/edit-courses/:coursesid",isAuthenticated,editcourses);

//Post 
router.post("/delete-courses/:coursesid",isAuthenticated,deletecourses);

//Post (Projects)
router.post("/add-project",isAuthenticated,addproject);

//Post 
router.post("/edit-project/:projectid",isAuthenticated,editproject);

//Post 
router.post("/delete-project/:projectid",isAuthenticated,deleteproject);

//Post (Skills)
router.post("/add-skill",isAuthenticated,addskill);

//Post 
router.post("/edit-skill/:skillid",isAuthenticated,editskill);

//Post 
router.post("/delete-skill/:skillid",isAuthenticated,deleteskill);

//Post (Accomplishments)
router.post("/add-rewards",isAuthenticated,addrewards);

//Post 
router.post("/edit-rewards/:rewardid",isAuthenticated,editrewards);

//Post 
router.post("/delete-rewards/:rewardid",isAuthenticated,deleterewards);



module.exports = router;