const mongooose= require("mongoose");

const JobSchema=new mongooose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name '],
        maxlength:50
    },
    Position:{
        type:String,
        required:[true,'please provide position '],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongooose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user ']
    }
},{timestamps:true})

module.exports=mongooose.model('Job',JobSchema)