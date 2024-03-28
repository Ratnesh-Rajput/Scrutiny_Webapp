const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SentToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imgkit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Homepage!" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();
    res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email })
        .select("+password")
        .exec();

    if (!student) return next(
        new ErrorHandler("User not found with this email address", 404))
    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

    sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout" });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec()
    if (!student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        );

    // const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student.email}`;
    const otp = Math.floor(Math.random()*10e3) <9999 && Math.floor(Math.random()*10e3) > 1000 ? Math.floor(Math.random()*10e3) : Math.floor(Math.random()*10e3);
    sendmail(req, res, next,otp);
    student.resetPasswordToken = otp;
    await student.save();
    res.json({ student, otp })
})

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body.pwd.email);
    const student = await Student.findOne({email: req.body.pwd.email}).exec()
    if (!student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        ); 
    console.log(student.resetPasswordToken);    
    if (student.resetPasswordToken == req.body.pwd.otp) {
        student.resetPasswordToken = "0";
        student.password = req.body.pwd.pwd;
        await student.save();
    }
    else {
        return next(
            new ErrorHandler("Invalid OTP Please try again", 500)
        );
    }
    res.status(200).json({
        message: "Password has been successfully changed"
    })
})

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).select("+password").exec();
    // console.log(req.body);
    // console.log(student.password);
    student.password = req.body.password;
    await student.save();
    sendtoken(student, 201, res);
})

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {

    await Student.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(200).json({
        success: true,
        message: "Student Updated Successfully!",

    });
})

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder=${Date.now}${path.extname(file.name)}`;

    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId)
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data, fileName: modifiedFileName,
    })
    
    student.avatar = { fileId, url };
    await student.save()
    res.status(200).json({
        success: true,
        message: "Profile Updated",
    });
})

//---------------------read All internship---------------------------

exports.readallinternships = catchAsyncErrors(async (req, res, next) =>{
    const internships = await Internship.find().exec();

    res.status(200).json({internships})
})

//---------------------apply internship------------------------------

exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();
    student.internships.push(internship._id);
    internship.students.push(student._id);
    await student.save();
    await internship.save();

    res.json({ student, internship });
});

//---------------------read All Jobs---------------------------

exports.readalljobs = catchAsyncErrors(async (req, res, next) =>{
    const jobs = await Job.find().exec();

    res.status(200).json({jobs})
})
//-------------------apply job---------------------------------------

exports.applyjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();
    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save();
    await job.save();

    res.json({ student, job });
});