const mongoose = require('mongoose');
const yup = require('yup');

const taskSchema = new mongoose.Schema ({
    title : String ,
    description: String ,
    dueDate : String ,
    completed: Boolean 
});

const Task = mongoose.model('Task', taskSchema);

const taskValidationSchema = yup.object().shape ({
    title:  yup.string().required(),
    description: yup.string().required(),
    dueDate: yup.string().required(),
    completed: yup.boolean().required()

});

module.exports= {Task, taskValidationSchema };