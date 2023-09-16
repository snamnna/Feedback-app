const { tokenDecode } = require('../utils/jwtUtils')

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
        req.user = await tokenDecode(token);
        next();
    } catch (err) {
        // todo: change this to throw error when error handling is implemented
        res.sendStatus(403);
    }
};

module.exports = verifyToken;
