import {getUserId} from '../utils/getUserId'

export default {
  comment: {
    subscribe(parent, {postId}, {prisma}, info ) {
      return prisma.subscription.comment({where: {
        node: {
          post: {
            id: postId
          }
        }
      }}, info)
    }
  },
  post: {
    subscribe(parent, {authorId}, {prisma}, info) {
      return prisma.subscription.post({
        where: {
          node: {
            AND: [{
              author: {
                id: authorId
              }
            }, {
              published: true
            }]
          }
        }
      },info)
    }
  },
  subscribeMyPost : {
    subscribe(parent, {postId}, {prisma, request}, info) {
       const userId = getUserId(request)

       return prisma.subscription.post({where: {
         node: {
           id: postId,
           author: {
             id: userId
           }
         }
       }},info)
    }
  }
}