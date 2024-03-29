const childSchema = require("../model/childModel")
const classSchema = require("../model/classModel")

exports.getAllChilds=(request,response,next)=>{
    childSchema.find()
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}

exports.getChildByID=(request,response,next)=>{
    if (request.token._id !== request.params.id && request.token.role !=="supervisor") {
        throw new Error ("You are not authorized to access this resource" );
    }
    childSchema.findById({_id:request.params._id})
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}

exports.addChild=(request,response,next)=>{
    let object = new childSchema(request.body)
    object.save()
    .then((data) => {
        response.status(200).json({ data });
      })
    .catch((error) => next(error));
}

exports.UpdateChildData=(request,response,next)=>{
    if (request.token._id !== request.body.id && request.token.role !=="supervisor") {
        throw new Error ("You are not authorized to access this resource" );
    }
    let childId=  request.body._id
    childSchema.findByIdAndUpdate(childId , request.body, { new: true })
    .then((data) => {
        if(!data){
            throw new Error ("child not found")
        }
        else {
            response.status(200).json({ data })
        }
      })
    .catch((error) => next(error));
}

exports.daleteSpecifiedChild=async (request,response,next)=>{
    if (request.token._id !== request.body.id && request.token.role !=="supervisor") {
        throw new Error ("You are not authorized to access this resource" );
    }
    let childId=  request.body._id
    let child = childSchema.findById(childId)
    if(!child) throw new Error ("This child not found" );
    const classes = await classSchema.find({ children: childId });
    
    await Promise.all(classes.map(async (classObj) => {
        classObj.children.pull(childId); 
        await classObj.save();
    }));
    childSchema.deleteOne({_id:childId}).then(
        response.status(200).json({ data: `child has id=${request.body._id} deleted successfully`})
    )
    .catch((error) => next(error));
}
