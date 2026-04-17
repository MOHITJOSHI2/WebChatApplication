const authJWT = (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                message: "User available"
            })
        } else {
            res.status(400).json({
                userErr: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({ err: "Server erro" })
        console.log(error)
    }
}

module.exports = { authJWT }