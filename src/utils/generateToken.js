import jwt from 'jsonwebtoken'

export const generateToken = (userId, expiresIn="365 days") => jwt.sign({userId}, 'mysecret', {expiresIn})
