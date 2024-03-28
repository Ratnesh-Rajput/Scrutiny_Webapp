const { userInfo } = require("os");
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");

const ErrorHandler = require("../utils/ErrorHandler");
const {sendtoken}= require("../utils/SentToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit =require("../utils/imgkit").initImageKit(); 


exports.homepage = catchAsyncErrors(async( req , res , next)=>{
        res.json({message:"Secure Employe Homepage!"});
});

exports.currentEmploye = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findById(req.id).exec();
    res.json({employe});
});

 exports.employesignup = catchAsyncErrors(async( req , res , next)=>{
    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res);
 });

exports.employesignin = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findOne({email:req.body.email})
    .select("+password")
    .exec();

    if(!employe) return next (
        new ErrorHandler("User not found with this email address",404))
        const isMatch =employe.comparepassword(req.body.password);
        if(!isMatch)return next (new ErrorHandler("Wrong Credientials",500));
        
        sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async( req , res , next)=>{
    res.clearCookie("token");
    res.json({message: "Successfully signout"});
});

exports.employesendmail = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findOne({email:req.body.email}).exec()
    if(!employe) 
    return next (
      new ErrorHandler("User not found with this email address",404)
      );
      
    //   const url =`${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;
    const otp = Math.floor(Math.random()*10e3) <9999 && Math.floor(Math.random()*10e3) > 1000 ? Math.floor(Math.random()*10e3) : Math.floor(Math.random()*10e3);
      sendmail(req, res, next, otp);
      employe.resetPasswordToken = otp;
      await employe.save();
      res.json({employe,otp})
})

exports.employeforgetlink = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findByOne({email: req.body.pwd.email}).exec()
    if(!employe) 
    return next (
      new ErrorHandler("User not found with this email address",404)
      );
      
      if(employe.resetPasswordToken==req.body.pwd.otp){
       employe.resetPasswordToken ="0";
        employe.password = req.body.pwd.pwd;
        await employe.save();
    }
    else{
        return next (
            new ErrorHandler("Invalid Reset Password Link! Please try again",500)
            );
    }
      res.status(200).json({
        message:"Password has been successfully changed"
      })
})

exports.employeresetpassword = catchAsyncErrors(async( req , res , next)=>{

    const employe = await Employe.findById(req.id).exec();
        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe,201, res);
})

exports.employeupdate = catchAsyncErrors(async( req , res , next)=>{

     await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
        
       res.status(200).json({
        success: true,
        message: "employe Updated Successfully!",
      
       });
})

exports.employeavatar = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findById(req.params.id).exec();
    const file = req.files.organisationlogo;
    const modifiedFileName =`resumebuilder=${Date.now}${path.extname(file.name)}`;

    if(employe.organisationlogo.fileId !== ""){
        await imagekit.deleteFile(employe.organisationlogo.fileId)
    }
    const {fileId, url} =await imagekit.upload({file:file.data, fileName: modifiedFileName,
    })
    employe.organisationlogo ={fileId, url};
    await employe.save()
    res.status(200).json({
        success: true,
        message: "Profile Updated",
       });
})

//----------------------------------------Internship--------------------------------------

exports.createinternship = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findById(req.id).exec();
    const internship = await new Internship(req.body);
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await internship.save();
    await employe.save();
    res.status(201).json({success: true, internship});
});

exports.readinternship = catchAsyncErrors(async( req , res , next)=>{
    const {internships} = await Employe.findById(req.id).populate("internships").exec();
    res.status(200).json({success: true, internships});
});

exports.readsingleinternship = catchAsyncErrors(async( req , res , next)=>{
    const internship = await Internship.findById(req.params.id).exec();
    res.status(200).json({success: true, internship});
});


//----------------------------------------Job--------------------------------------

exports.createjob = catchAsyncErrors(async( req , res , next)=>{
    const employe = await Employe.findById(req.id).exec();
    const job = await new Job(req.body);
    job.employe = employe._id;
    employe.jobs.push(job._id);
    await job.save();
    await employe.save();
    res.status(201).json({success: true, job});
});

exports.readjob = catchAsyncErrors(async( req , res , next)=>{
    const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
    res.status(200).json({success: true, jobs});
});

exports.readsinglejob = catchAsyncErrors(async( req , res , next)=>{
    const job = await Job.findById(req.params.id).exec();
    res.status(200).json({success: true, job});
});














































