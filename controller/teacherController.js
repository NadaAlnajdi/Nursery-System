const teacherSchema = require("../model/teacherModel")
const classSchema = require("../model/classModel")
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.getAllTeachers=(request,response,next)=>{
    teacherSchema.find()
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}

exports.getTeacherByID=(request,response,next)=>{
    if (request.token._id !== request.params.id && request.token.role !=="supervisor") {
        throw new Error ("You are not authorized to access this resource" );
    }
    teacherSchema.findById({_id:request.params.id})
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}

exports.addTeacher=(request,response,next)=>{
    let object = new teacherSchema(request.body)
    const hashPassword = bcrypt.hashSync(request.body.password,+process.env.saltRound)
    object.password=hashPassword;
    object.save()
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}
exports.UpdateTeacherData=(request,response,next)=>{
    if (request.token._id !== request.body.id && request.token.role !=="supervisor") {
        throw new Error ("You are not authorized to access this resource" );
    }
    let teacherId=  request.body._id
    teacherSchema.findByIdAndUpdate(teacherId , request.body, { new: true })
    .then((data) => {
        if(!data){
            throw new Error ("Teacher not found")
        }
        else {
            response.status(200).json({ data })
        }
      })
    .catch((error) => next(error));
}
exports.daleteSpecifiedTeacher=async(request,response,next)=>{
    if (request.token._id !== request.body._id && request.token.role !=="supervisor" ) {
        throw new Error ("You are not authorized to access this resource" );
    }
    let teacherId=  request.body._id
    let teacher = teacherSchema.findById(teacherId)
    if(!teacher) throw new Error ("This teacher not found" );
    const classes = await classSchema.find({ superVisor: teacherId });

    await Promise.all(classes.map(async (classObj) => {
        classObj.superVisor = "2e9f9b9b9c9eb9d8a2d3c7b9"; 
        await classObj.save();
    }));
   
    teacherSchema.deleteOne({_id:teacherId})
    .then(
        response.status(200).json({ data: `teacher has id=${request.body._id} deleted successfully`})
    )
    .catch((error) => next(error));
}

exports.getAllSupervisors=(request,response,next)=>{
    teacherSchema.find({ role: 'supervisor' })
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}