const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const { title, author, likes, url } = request.body;
    const newBlog = {
      title,
      author,
      likes,
      url,
      user: user.id,
    };
    const blog = new Blog(newBlog);
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      const result = await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "token invalid" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    const oldBlog = await Blog.findById(id);
    const newBlog = { ...oldBlog, ...request.body };
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
