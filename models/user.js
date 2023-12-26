const mongoose = require( 'mongoose')

// "user_id": "user_01",
// "user_name": "Nguyễn Văn Anh",
// "user_email": "anhnv@gmail.com",
// "user_phone": "0123456789",
// "password": "12345678",
// "province": "TP. Hồ Chí Minh",
// "district": "Bình Thạnh",
// "address": "122, đường Điện Biên Phủ, phường 9",
// "isAdmin": false,
// "review": "Đúng i quảng cáo giảm mụn đầu đen se khít lỗ chân lông"

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    province: {
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
//id hay là user_id
userSchema.virtual('user_id').get(function () {
    return this._id.toHexString();
});

userSchema.set( 'toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;