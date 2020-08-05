const users = [
  {id: '01',
  name:'shivam',
  email:'es.com',
  age:18,
  },
  {id: '10',
  name:'shivamdes',
  email:'es.com',
  age:18,
  },
  {id: '11',
  name:'shivamka',
  email:'es.com',
  age:18,
  },
]

const comments = [
 {
   id: '111',
   text: 'This is first coomment dakara',
   author: '01',
   postId: '1'
 },
 {
  id: '222',
  text: 'This is second coomment dakara',
  author: '11',
  postId: '2'
 },
{
  id: '333',
  text: 'This is third hokage coomment dakara',
  author: '11',
  postId: '2'
}
]

const posts = [
{
  id: '1',
  title: 'Shikamaru',
  body: 'shikamaru is one of the most fav characters of naruto shippuden and he is a genius guy',
  published: true,
  author: '01'
},
{
  id: '2',
  title: 'My hero mangs',
  body: `damn it i don't what is happening in the new manga ch most probably deku and kacchan vs shigaraki`,
  published: false,
  author: '11'
},
{
  id: '3',
  title: 'Kakashi',
  body: 'Kakshi is great and is the lifetime rival of maito guy',
  published: true,
  author: '11'
}
]

export default {
  users,
  posts,
  comments
}