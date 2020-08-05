import {Prisma} from 'prisma-binding'
import {fragmentReplacements} from './resolvers'

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "mysupersecretbrunopal",
  fragmentReplacements
})

export default prisma
// prisma.query.users(undefined, '{id name posts {title body} comments {text} createdAt}').then((data) => {
//   console.log(JSON.stringify(data, null,2))
// })

// prisma.query.comments(undefined, '{text}').then(data => {
//   console.log(JSON.stringify(data, null ,2))
// }) 

// prisma.mutation.createUser({
//   data: {
//     name: "Shivam3",
//     email: "shivam3@yst.com"
//   }
// },'{name email posts {title body}}').then(data => {
//   console.log(JSON.stringify(data, null, 2))
// }).catch(e => {
//   console.log(e)
// })
// const createPostForUser = async (authorId, postData) => {
//   const isUser = await prisma.exists.User({id: postId})
//   if(!isUser) throw new Error("Gomen the user does not exists")
//   const post = await prisma.mutation.createPost({
//    data: {
//     ...postData,
//     author: {
//       connect: {
//         id: authorId
//       }
//     }
//    }
//   },`{author {id email name posts {title body}}}`) 
  
//   return post.author
// }

// const updatePostForUser = async (postId, postUpdateData) => {
//   const isPost = await prisma.exists.Post({id: postId})
//   if(!isPost) throw new Error("Gomen the post does not exists")
//   const updatedPost = await prisma.mutation.updatePost({
//     data: {...postUpdateData},
//     where: {id: postId}
//   }, `{author {name id posts {title body}} }`)
  
//   return updatedPost.author
// }

// updatePostForUser("ckbw6492c003q07694hoh6xjj", {
//   title: "This post is updated for async/await 2ns try oo",
//   body: "Earlier this post was titled the Post trial 22"
//   }).then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   }).catch(e => console.log(e.message))


// createPostForUser("ckbz3v7g500210746hhjk4epp", {
//   title: "await and async post",
//   body: "this is the asynchronous post for dibbs"
// }).then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// }).catch(e => console.log(e))
// prisma.mutation.updateUser({
//   data: {
//     name: "boku wa shivam3 edit des"
//   },
//   where: {
//     id: "ckbz3v7g500210746hhjk4epp"
//   }
// },'{name}').then(data => {
//   console.log(JSON.stringify(data, null , 2))
//   return prisma.query.users(null,'{name}')
// }).then(data => {
//   console.log(JSON.stringify(data, null , 2))
// })