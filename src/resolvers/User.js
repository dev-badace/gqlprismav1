import {getUserId} from '../utils/getUserId'

export default  {
  email: {
    fragment: 'fragment userId on User {id}',
    resolve(parent, args, {request}) {
      const userId = getUserId(request, false)
     
      if(userId === parent.id) return parent.email 

      return null
    }
  },
  posts: {
    fragment: 'fragment userId on User {id}',
    resolve(parent, args, {prisma, request}, info) {
      const userId = getUserId(request, false)

      if(userId === parent.id) {
        return prisma.query.posts({
          where: {
            author: {
              id: userId
            }
          }
        },info)
      }

      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      },info)
    }
  }
}