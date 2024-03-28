const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [4, "First name should be atleast 4 character long"],
        },
        lastname: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [4, "Last name should be atleast 4 character long"],
        },

        contact: {
            type: String,
            minLength: [10, "Contact should be atleast 10 character long"],
            maxLength: [10, "Contact must not be exceed 10 character long"],
        },

        city: {
            type: String,
            minLength: [3, "City should be atleast 3 character long"],
        },

        gender: { type: String, 
            required: [true, "Gender is required"],
            enum: ["Male", "Female", "Others"] },

        email: {
            type: String,
            unique: true,
            reqired: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address'
            ]
        },

        password: {
            type: String,
            required: [true,"Password is required"],
            select: false,
            maxlength: [15, "Password should not exceed more than 15 characters"],
            minlength: [6, "Password should not less than 6 characters"],
            //match:[]
        },

        resetPasswordToken: {
            type: String,
            default: "0"
        },

        avatar: {
            type: Object,
            default: {
                fileId: "",
                url: "https://cdn.vectorstock.com/i/1000x1000/62/59/default-avatar-photo-placeholder-profile-icon-vector-21666259.webp"
            }
        },

        resume: {
            education: [],
            jobs: [],
            internships: [],
            responsibilities: [],
            courses: [],
            projects: [],
            skills: [],
            accomplishments: [],
        },
        internships: [
            { type: mongoose.Schema.Types.ObjectId, ref: "internship" },
        ],
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],

    },
    { timestamps: true }
);

studentModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

studentModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

const Student = mongoose.model("student", studentModel)
module.exports = Student;
