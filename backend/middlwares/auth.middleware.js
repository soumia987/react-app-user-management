const { verifyToken } = require("../config/jwt")
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace('Bearer ', '')

        if(!token) {
            return res.status(401).json({ message: "pas de token,accés refusé"})
        }

        const decoded = verifyToken(token)
        const user = await User.findById(decoded.id)

        if(!user) {
            return res.status(401).json({message: "Token n'est pas validé"})
        }

        req.user = user
        next()

    } catch (err) {
        res.status(401).json({message: "Error: Token n'est pas validé"})
    }
}

module.exports = authMiddleware