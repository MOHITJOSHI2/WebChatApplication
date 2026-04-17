function verifyData(data) {
    const errors = {}

    if (!data.Name || data.Name.length < 2) {
        errors.nameErr = "Name must be at least 2 characters"
    }

    if (!data.Email) {
        errors.emailErr = "Please enter valid email"
    }

    if (!data.Phone || data.Phone.length !== 10) {
        errors.phoneErr = "Phone number must be 10 digits"
    }

    if (!data.Age || data.Age < 12) {
        errors.ageErr = "Age must be greater than 12"
    }

    if (!data.Password || data.Password.length < 8 || data.Password.length > 12) {
        errors.passwordErr = "Password must be 8–12 characters"
    }

    return errors
}

export default { verifyData }