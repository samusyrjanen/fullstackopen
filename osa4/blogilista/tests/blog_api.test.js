const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    "title": "title1",
    "author": "author1",
    "url": "url1",
    "likes": 4
  },
  {
    "title": "title2",
    "author": "author2",
    "url": "url2",
    "likes": 6
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('amount of blogs is correct', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

describe('totalLikes', () => {
  test('of empty array is zero', async () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of one blog is correct', async () => {
    const blogs = await api.get('/api/blogs')
    expect(listHelper.totalLikes([blogs.body[0]])).toBe(4)
  })

  test('of all blogs is correct', async () => {
    const blogs = await api.get('/api/blogs')
    expect(listHelper.totalLikes(blogs.body)).toBe(10)
  })
})

describe('POST and DELETE', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      "title": "title3",
      "author": "author3",
      "url": "url3",
      "likes": 5
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'title3'
    )
  })

  test('a valid blog can be deleted ', async () => {
    const newBlog = {
      "title": "title3",
      "author": "author3",
      "url": "url3",
      "likes": 5
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'title3'
    )
    
    const id = response.body[initialBlogs.length]._id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const response2 = await api.get('/api/blogs')
    
    expect(response2.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})