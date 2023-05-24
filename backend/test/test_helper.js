const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "create a docker",
    author: "wujinhjun",
    likes: 0,
    url: "https://wujinhjun.github.io/",
  },
  {
    title: "about the p5.js",
    author: "wujinhjun",
    likes: 0,
    url: "https://wujinhjun.github.io/",
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB,
};
