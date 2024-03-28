const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const{v4: uuidv4}= require('uuid');

exports.resume = catchAsyncErrors(async(req,res, next ) => {
    const resume = await Student.findById(req.id).exec();
    res.json({ message: "secure Resume Page! ",resume});
});

//-------------------------Education-------------------------------------------------------

exports.addeducation = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Education Added"});
});

exports.editeducation = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid);
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex], ...req.body,};

    await student.save();
    res.json({ message: "Education updated "});
});

exports.deleteeducation = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid);
    student.resume.education = filterededu;

    await student.save();
    res.json({ message: "Education Deleted "});
});

//-------------------------Jobs-------------------------------------------------------

exports.addjobs = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Jobs Added"});
});

exports.editjob = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobid);
    student.resume.jobs[jobIndex] = {...student.resume.jobs[jobIndex], ...req.body,};

    await student.save();
    res.json({ message: "Jobs updated "});
});

exports.deletejob = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredjob= student.resume.jobs.filter((i) => i.id !== req.params.jobid);
    student.resume.jobs = filteredjob;

    await student.save();
    res.json({ message: "Job Deleted "});
});

//-------------------------Internship-------------------------------------------------------

exports.addinternship = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Internship Added"});
});

exports.editinternship = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const internshipIndex = student.resume.internships.findIndex((i) => i.id === req.params.internshipid);
    student.resume.internships[internshipIndex] = {...student.resume.internships[internshipIndex], ...req.body,};

    await student.save();
    res.json({ message: "Internship updated"});
});

exports.deleteinternship = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredinternship= student.resume.internships.filter((i) => i.id !== req.params.internshipid);
    student.resume.internships = filteredinternship;

    await student.save();
    res.json({ message: "internship Deleted "});
});

//-------------------------Resposibility-------------------------------------------------------

exports.addresponsibility = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "responsibilities Added"});
});

exports.editresponsibility = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const responsibilityIndex = student.resume.responsibilities.findIndex((i) => 
    i.id === req.params.responsibilityid);
    student.resume.responsibilities[responsibilityIndex] = 
    {...student.resume.responsibilities[responsibilityIndex], ...req.body,};

    await student.save();
    res.json({ message: "responsibilities updated"});
});

exports.deleteresponsibility = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredresp= student.resume.responsibilities.filter((i) =>
     i.id !== req.params.resposibilityid);
    student.resume.responsibilities = filteredresp;

    await student.save();
    res.json({ message: "Resposibility Deleted "});
});

//-------------------------Courses-------------------------------------------------------

exports.addcourses = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Courses Added"});
});

exports.editcourses = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const coursesIndex = student.resume.courses.findIndex((i) => 
    i.id === req.params.coursesid);
    student.resume.courses[coursesIndex] = 
    {...student.resume.courses[coursesIndex], ...req.body,};

    await student.save();
    res.json({ message: "Courses updated"});
});

exports.deletecourses = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredcourses= student.resume.courses.filter((i) =>
     i.id !== req.params.coursesid);
    student.resume.courses = filteredcourses;

    await student.save();
    res.json({ message: "Courses Deleted "});
});

//-------------------------Projects-------------------------------------------------------

exports.addproject = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Projects Added"});
});

exports.editproject = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const projectIndex = student.resume.projects.findIndex((i) => 
    i.id === req.params.projectid);
    student.resume.courses[projectIndex] = 
    {...student.resume.projects[projectIndex], ...req.body,};

    await student.save();
    res.json({ message: "Projects updated"});
});

exports.deleteproject = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredproject= student.resume.projects.filter((i) =>
     i.id !== req.params.projectid);
    student.resume.projects = filteredproject;

    await student.save();
    res.json({ message: "Projects Deleted "});
});

//-------------------------Skills-------------------------------------------------------

exports.addskill = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Skill Added"});
});

exports.editskill = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex((i) => 
    i.id === req.params.skillid);
    student.resume.skills[skillIndex] = 
    {...student.resume.skills[skillIndex], ...req.body,};

    await student.save();
    res.json({ message: "Skill updated"});
});

exports.deleteskill = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredskill= student.resume.skills.filter((i) =>
     i.id !== req.params.skillid);
    student.resume.skills = filteredskill;

    await student.save();
    res.json({ message: "Skill Deleted "});
});

//-------------------------Rewards(accomplishments)-------------------------------------------------------

exports.addrewards = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Reward Added"});
});

exports.editrewards = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const rewardIndex = student.resume.accomplishments.findIndex((i) => 
    i.id === req.params.rewardid);
    student.resume.accomplishments[rewardIndex] = 
    {...student.resume.accomplishments[rewardIndex], ...req.body,};

    await student.save();
    res.json({ message: "Reward updated"});
});

exports.deleterewards = catchAsyncErrors(async(req,res, next ) => {
    const student = await Student.findById(req.id).exec();
    const filteredreward = student.resume.accomplishments.filter((i) =>
     i.id !== req.params.rewardid);
    student.resume.accomplishments = filteredreward;

    await student.save();
    res.json({ message: "Reward Deleted "});
});



