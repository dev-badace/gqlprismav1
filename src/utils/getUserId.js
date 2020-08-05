import jwt from 'jsonwebtoken'

export const getUserId = (request, requireAuth = true) => {
 const header = request.request ?  request.request.headers.authorization : request.connection.context.Authorization
 
 if(header) {
  const token = header.split("Bearer ")[1]
  const decodedToken = jwt.verify(token, 'mysecret')
 
  return decodedToken.userId 
 }
 
 if(requireAuth) throw new Error("Authentication Required")
 return null
}