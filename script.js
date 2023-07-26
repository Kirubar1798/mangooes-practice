const mongoose = require('mongoose')
const User = require('./models/userModel')

mongoose.connect('mongodb://127.0.0.1:27017/kirucode').then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log('connection error')
})

// const user = new User({
//     name:'kirubar',
//     age:24
// });

//user.save().then(()=>{
//    console.log('user Saved')
//})

async function run(){

    try{
        const user = await User.findById('64c0e8df8265684bef516778')
        user.name = "keerthi";
        user.age = 28
        await user.save();
        //user.sayHi()

        console.log(user)
        console.log(user.namedEmail)

    }catch(e){
        console.log(e.message)
    }
    

    
   
}
run()