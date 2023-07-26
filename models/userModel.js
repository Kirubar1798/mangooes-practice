const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city:String,
    street:String
})

const userSchema = new mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:10,
        max:50,
        validate:{
            validator: v => v % 2 == 0,
            message:props => `${props.value} is not number`
        }
    },
    email:{
        type:String,
        required:true,
        uppercase:true
    },
    createdAt:{
        type:Date,
        default: ()=>Date.now()
    },
    updatedAt:Date,
    bestFriend:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'User'
    },
    hobbies:[String],
    address:addressSchema

})

userSchema.methods.sayHi = function(){
    console.log(`My name is ${this.name}`)
}

userSchema.statics.findByName = function(name){
    return this.where({name:name})
}

userSchema.query.byName = function(name){
    return this.where({name:name})
}

userSchema.virtual('namedEmail').get(function(){
    return `${this.name}<${this.email}>`
})

userSchema.pre('save',function(next){
    this.name = `Mr.${this.name}`;
    next()
})

userSchema.post('save',function(doc,next){
    doc.name = `${doc.name} modified`

    next()
})
const userModel = mongoose.model('User',userSchema);

module.exports = userModel