const classSchema = require("../model/classModel")

exports.getAllClasses=(request,response,next)=>{
    classSchema.find()
    .populate({ path: "children" })
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}

exports.getClassByID=(request,response,next)=>{
    classSchema.findById({_id:request.params.id})
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}
exports.addClass=(request,response,next)=>{
    let object = new classSchema(request.body)
    object.save()
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}
exports.UpdateClassData=(request,response,next)=>{
    let classId=  request.body._id
    classSchema.findByIdAndUpdate(classId , request.body, { new: true })
    .then((data) => {
        if(!data){
            throw new Error ("class not found")
        }
        else {
            response.status(200).json({ data })
        }
      })
    .catch((error) => next(error));
}
exports.daleteSpecifiedClass=(request,response,next)=>{
    let classId=  request.body._id
    classSchema.findByIdAndDelete(classId)
    .then(
        response.status(200).json({ data: `class has id=${request.body._id} deleted successfully`})
    )
    .catch((error) => next(error));
}

exports.getcClassChildInfo=(request,response,next)=>{
     classSchema.findById({_id:request.params.id},{children:1,_id:0})
    .populate({ path: "children" })
    .then((data) => {
        if(!data){
            throw new Error ("class not found")
        }
        else {
            response.status(200).json({ data })
        }
      })
    .catch((error) => next(error));

}
exports.getcClassTeacherInfo=(request,response,next)=>{
    classSchema.findById({_id:request.params.id},{supervisor:1,_id:0})
    .populate('supervisor')
    .then((data) => {
        if(!data){
            throw new Error ("class not found")
        }
        else {
            response.status(200).json({ data })
        }
      })
    .catch((error) => next(error));
}