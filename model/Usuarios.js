const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema ({
    cod: Number,
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
        
    },
    cargo: String,
}, {versionKey:false})


userSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, 10, (err, hashedPassword)=>{
            if(err){
                next (err)
            } else{
                document.password = hashedPassword;
                next()
            }

        })
    } else{
        next()

    }
})

userSchema.methods.isCorrectPassword = function (password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err)
        }else{
            callback(err, same)
        }

    })
}

module.exports = mongoose.model('user', userSchema)






