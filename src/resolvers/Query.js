import {getUserId} from '../utils/getUserId'

export default {
  me(parent, args, {prisma, request}, info) {
    const userId = getUserId(request)

    return prisma.query.user({
      where: {
        id: userId
      }
    })
  },
  getUser(parent, args, {prisma}, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    if(args.name) {
      opArgs.where = {
        OR: [{
          name_contains: args.name
        },{
          email_contains: args.name
        }]
      }
    }
    return prisma.query.users(opArgs,info)
  },
  async getPost(parent, {id}, {prisma, request}, info) {
    const userId = getUserId(request, false)

    const [post] = await prisma.query.posts({
      where: {
        id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      }
    },info)

    if(!post) throw new Error("Post not Found")

    return post

    // const post = await prisma.query.post({
    //   where: {
    //     id
    //   }
    // },`{published author {id}}`)

    // if(!post || (post.published === false && post.author.id !== userId)) throw new Error('unable to find post/You are not authorized')

    // return prisma.query.post({where:{id}},info)
  },
  getMyPosts(parent, {query}, {prisma, request}, info) {
    const userId = getUserId(request) 
    const opArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if(query) {
      opArgs.where.OR = [{
        title_contains: query 
      }, {
        body_contains: query
      }]
    }

    return prisma.query.posts(opArgs,info)
  },
  getPosts(parent, args, {prisma}, info) {
    const opArgs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    if(args.name) { 
      opArgs.where.OR =[
        {body_contains: args.name}, 
        {title_contains: args.name}
      ]
    }
    
    return prisma.query.posts(opArgs,info)
  },
  getComments(parent, args, {prisma}, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after
    }
    return prisma.query.comments(opArgs,info)
  }
}
