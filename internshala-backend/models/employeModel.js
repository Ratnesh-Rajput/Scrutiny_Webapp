const mongoose = require("mongoose");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required: [true, "First Name is required"],
            minLength: [4,"First name should be atleast 4 character long"],
        },
        lastname:{
            type:String,
            required: [true, "Last Name is required"],
            minLength: [4,"Last name should be atleast 4 character long"],
        },

        contact: {
            type:String,
            required: [true, "Contact is required"],
            minLength: [10,"Contact should be atleast 10 character long"],
            maxLength: [10,"Contact must not be exceed 10 character long"],
        },

        gender: {type: String,enum:["Male","Female","Others"]},

    email:{
        type:String,
        unique : true,
        reqired :[true,"Email is required"],
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'
        ],

    },
    
    password:{
        type :String,
        select :false,
        maxlength:[15,"Password should not exceed more than 15 characters"],
        minlength:[6,"Password should not less than 6 characters"],
        //match:[]
    },

    resetPasswordToken:{
        type: String,
        default : "0"
    },

    organisationName:{
        type:String,
        required: [true, "Organisation Name is required"],
    },

    organisationlogo: {
        type: Object,
        default:{
            fileId:"",
            url:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fst.depositphotos.com%2F1052233%2F2815%2Fv%2F950%2Fdepositphotos_28158459-stock-illustration-male-default-profile-picture.jpg&tbnid=KaVO-_SJaob4UM&vet=12ahUKEwiX2seAzKGAAxVI7jgGHYMIB-wQMyg5egQIARBc..i&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fvector-images%2Funknown-profile-picture.html&docid=urvXhMiZrB4IuM&w=1024&h=849&q=default%20profile%20img&ved=2ahUKEwiX2seAzKGAAxVI7jgGHYMIB-wQMyg5egQIARBc"
        }
    },

    internships:[
        {type:mongoose.Schema.Types.ObjectId, ref:"internship"},
    ],
    jobs:[{type: mongoose.Schema.Types.ObjectId, ref:"job"}],
    
},


{timestamps:true}
);

employeModel.pre("save",function (){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})

employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

employeModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id }, process.env.JWT_SECRET,{
     expiresIn: process.env.JWT_EXPIRE,});
}

const Employe = mongoose.model("employe",employeModel)
module.exports = Employe;
