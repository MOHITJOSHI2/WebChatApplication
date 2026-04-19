const User = require('../models/userModel')

class usersRepository {
    async addNewUser(data) {
        const SaveData = new User({
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone,
            Age: data.Age,
            Password: data.Password
        })
        return await SaveData.save()
    }

    async updateUser(data) {
        return await User.findByIdAndUpdate(data._id, { data })
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id)
    }

    async authenticateUser(data) {
        return await User.findOne({ Email: data.Email, Password: data.Password })
    }

    async getAllUsers(email) {
        return await User.find({ Email: { $ne: email } })
    }

    async getUserByPhone(phone) {
        return await User.findOne({ Phone: phone })
    }

    async getUserByEmail(email) {
        return await User.findOne({ Email: email })
    }

    //For request data
    async getAllUsersByArr(arr) {
        return await User.find({ _id: { $in: arr } });
    }
}

module.exports = new usersRepository()