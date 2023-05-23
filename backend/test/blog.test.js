const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");
  expect(response.status).toBe(200);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("the first blog is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("create a docker");
});

test("test all blogs for id", async () => {
  const data = await api.get("/api/blogs");
  const blogs = data.body;
  //   const blogs = await helper.blogsInDB();
  for (const blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "The vscode",
    author: "wujinhjun",
    likes: 0,
    url: "https://wujinhjun.github.io/",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(201);
  expect(response.headers["content-type"]).toMatch(/application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("a valid but miss likes blog can be added", async () => {
  const newBlog = {
    title: "The vscode",
    author: "wujinhjun",
    url: "https://wujinhjun.github.io/",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(201);
  expect(response.headers["content-type"]).toMatch(/application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("a invalid blog can not be added", async () => {
  const newBlog = {
    title: "The vscode",
    author: "wujinhjun",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(400);
});

test("delete by a valid id", async () => {
  const id = (await api.get("/api/blogs")).body[0].id;
  const response = await api.delete(`/api/blogs/${id}`);
  expect(response.status).toBe(204);
});

test("delete by a invalid id", async () => {
  const id = "aaaaaaa";
  const response = await api.delete(`/api/blogs/${id}`);
  expect(response.status).toBe(400);
});

test("update by a valid body", async () => {
  const oldBlog = (await api.get("/api/blogs")).body[0];
  const newBlog = { ...oldBlog, id: oldBlog.id, likes: 10 };
  const response = await api.put(`/api/blogs/${oldBlog.id}`).send(newBlog);
  expect(response.status).toBe(200);
});

test("update by a invalid body", async () => {
  const oldBlog = (await api.get("/api/blogs")).body[0];
  const newBlog = { ...oldBlog, likes: 10 };
  const response = await api.put("/api/blogs/aaaaaa").send(newBlog);
  expect(response.status).toBe(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
