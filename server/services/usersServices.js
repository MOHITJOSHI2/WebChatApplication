const usersRepository = require('../repositories/users')

class userServices {
    async createUser(data) {
        const emailCheck = await usersRepository.getUserByEmail(data.Email)
        const phoneCheck = await usersRepository.getUserByPhone(data.Phone)
        if (!data.Name || !data.Email || !data.Age || !data.Phone || !data.Password) {
            return "missing"
        }
        else if (emailCheck || phoneCheck) {
            return emailCheck ? "email" : "phone"
        }
        else {
            return await usersRepository.addNewUser(data)
        }
    }

    async updateUser(data) {
        const emailCheck = await usersRepository.getUserByEmail(data.Email)
        const phoneCheck = await usersRepository.getUserByPhone(data.Phone)

        if (emailCheck.length > 1) {
            return 'email'
        } else if (phoneCheck.length > 1) {
            return 'phone'
        } else {
            return await usersRepository.updateUser(data)
        }
    }

    async deleteUser(id) {
        if (id) {
            return await usersRepository.deleteUser(id)
        } else {
            return 'missing'
        }
    }

    async authenticateUser(data) {
        let check = await usersRepository.authenticateUser(data)
        if (check) {
            const userObj = check.toObject()
            delete userObj.Password
            return userObj
        } else {
            return "missing"
        }
    }

    async getUser(email) {
        return await usersRepository.getAllUsers(email)
    }

    async getUsersByArr(arr) {
        if (arr.length > 0) {
            return await usersRepository.getAllUsersByArr(arr)
        } else {
            return "missing"
        }
    }
}

module.exports = new userServices()