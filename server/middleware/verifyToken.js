import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                res.status(498).json({ message: 'token is not valid' });
            }
            next();
        });
    } else {
        res.status(498).json({ message: 'token is not valid' });
    }
};

export default verifyToken;
