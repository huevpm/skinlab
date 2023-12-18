const mongoose = require( 'mongoose')

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_phone: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    review: {
        type: String,
        default: '',
    },
});
userSchema.virtual('user_id').get(function () {
    return this._id.toHexString();
});

userSchema.set( 'toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;