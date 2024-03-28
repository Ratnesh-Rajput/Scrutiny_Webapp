const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/ErrorHandler");

exports.sendmail = (req, res, next, otp) =>{
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            post: 465,
            auth:{
                user: process.env.MAIL_EMAIL_ADDRESS,
                pass:process.env.MAIL_PASSWORD,
            },
        });
        const mailOptions ={
            from: "Internshala Private Limited",
            to: req.body.email,
            subject: "One Time Password",
            html:`<h1>Your One Time Password (OTP) ${otp}</h1>\n
            OTP will expires in 5 minute.\n Change Password within 5 minutes.`
            // `<a href="${url}">Password Reset Link </a>`
            ,
        };

        transport.sendMail(mailOptions,(err,info)=>{
            if(err){
                return next (new ErrorHandler(err,500));
            } else{
                console.log(info);
                
                return res.status(200).json({
                    message: "mail sent successfully",
                    url,
                })
            }
        });
}