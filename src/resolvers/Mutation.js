import bcrypt from 'bcrypt'
import {generateToken} from '../utils/generateToken'
import {getUserId} from '../utils/getUserId'
import {hashPassword} from '../utils/hashPassword'

export default {
  async createUser(parent,{data}, {prisma},info) {

   const userExist = await prisma.exists.User({email:data.email})

   if(userExist) throw new Error("Gomen user already exists")

   const password = await hashPassword(data.password)

   const user = await prisma.mutation.createUser({
     data: {
       ...data,
       password
     }
   })

   return {
     user,
     token: generateToken(user.id)
   }

  },
  async createPost(parent, {data}, {prisma, request}, info) {
    const id = getUserId(request)

    const authorExist = await prisma.exists.User({id})
    if(!authorExist) throw new Error("Author doesn't exists")

    return prisma.mutation.createPost({data: {
      title: data.title,
      body: data.body,
      published: data.published,
      author: {
        connect: {
          id
        }
      }
    }}, info)
  },
  async createComment(parent, {data}, {prisma, request}, info) {
    const userId = getUserId(request)

    const post = await prisma.exists.Post({
      id: data.postId,
      published: true
    }) 

    if(!post) throw new Error("Error")

    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: userId
          }
        },
        post: {
          connect: {
            id: data.postId
          }
        }
      }
    },info)
  },
  async updateUser(parent, {data}, {prisma, request}, info) {
   const userId = getUserId(request)
   const userExist = await prisma.exists.User({id: userId})
   if(!userExist) throw new Error("User not exists")

   if(typeof data.password === 'string') {
     data.password = await hashPassword(data.password, 10)
   }
   return prisma.mutation.updateUser({
     data: {
       ...data
     },
     where: {
       id: userId
     }
   },info)
  },
  async updatePost(parent, {id, data}, {prisma, request}, info) {
     const userId = getUserId(request)
     
     const postExist = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
     })

     const isPublished = await prisma.exists.Post({
       id,
       published: true
     })
     if(!postExist) throw new Error("Unable to update post")
     if(isPublished) {
      await prisma.mutation.deleteManyComments({
         where: {
           post: {
             id
           }
         }
       })
     }
     return prisma.mutation.updatePost({
       data: {
         ...data
       },
       where: {
         id
       }
     },info)
  },
  async updateComment(parent, {id,data}, {prisma, request}, info) {
   const userId = getUserId(request)
   const commentExist = await prisma.exists.Comment({
     id,
     author: {
       id: userId
     }
   })
   if(!commentExist) throw new Error("Comment not found")
   
   return prisma.mutation.updateComment({
     data: {
       ...data
     },
     where: {
       id
     }
   }, info)
  },
  async deleteUser(parent, {id}, {prisma, request}, info) {
    const userId = getUserId(request)
    const userExist = await prisma.exists.User({id: userId})
    if(!userExist) throw new Error("User doesn't exists")
    return prisma.mutation.deleteUser({where: {
      id: userId
    }},info)
  },
  async deletePost(parent, {id}, {prisma, request}, info) {
    const userId = getUserId(request)

    
    const postExist = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    })
    if(!postExist) throw new Error("Post not found/Post does not belong to user")
    

    return prisma.mutation.deletePost({
      where: {
        id
      }
    },info)
  },
  async deleteComment(parent, {id}, {prisma, request}, info) {
    const userId = getUserId(request)
    
    const commentExist = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    })
    if(!commentExist) throw new Error("Unable to do the operation")

    return prisma.mutation.deleteComment({
      where: {
        id
      }
    },info)
  },
  async login(parent, {data}, {prisma}) {
    const user = await prisma.query.user({where: {
      email: data.email
    }})
    if(!user) throw new Error("Something went wrong")

    const isCredentialsValid = await bcrypt.compare(data.password, user.password)
    if(!isCredentialsValid) throw new Error("Invalid credentials")

    return {
      user,
      token: generateToken(user.id)
    }
  }
}