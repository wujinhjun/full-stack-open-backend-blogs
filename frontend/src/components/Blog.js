import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const Details = ({ url, likes, author, id, handleLikes, handleRemove }) => {
  return (
    <>
      <div>
        <a href={url}>{url}</a>
      </div>
      <div>
        likes {likes}
        <button onClick={(event) => handleLikes(event, id)}>like</button>
      </div>
      <div>{author}</div>
      <button onClick={(event) => handleRemove(event, id)}>remove</button>
    </>
  );
};

const Blog = ({
  blog,
  handleUpdate,
  handleAlertType,
  handleAlertMsg,
  handleRemoveBlog,
}) => {
  const [view, setView] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleViewStatus = () => {
    setView(!view);
  };

  const handleLikes = async (event, id) => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    event.preventDefault();
    let type = "";
    let msg = "";
    try {
      await blogService.updateBlog(id, newBlog);
      handleUpdate();
    } catch (error) {
      type = "error";
      msg = "An Error when like a blog";
      console.log(error);
    } finally {
      handleAlertType(type);
      handleAlertMsg(msg);
      setTimeout(() => {
        handleAlertType("");
        handleAlertMsg("");
      }, 6000);
    }
  };

  const handleRemove = async (event, id) => {
    event.preventDefault();

    let type = "";
    let msg = "";

    try {
      if (
        window.confirm(
          `Remove blog You're NOT gonna need it! by ${blog.author}`
        )
      ) {
        await blogService.removeBlog(id);
        handleRemoveBlog(id);
      }
    } catch (error) {
      type = "error";
      msg = "An Error when remove a blog";
      console.log(error);
    } finally {
      handleAlertType(type);
      handleAlertMsg(msg);
      setTimeout(() => {
        handleAlertType("");
        handleAlertMsg("");
      }, 6000);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleViewStatus}>{view ? "view" : "hide"}</button>
      {!view && (
        <Details
          id={blog.id}
          url={blog.url}
          author={blog.author}
          likes={blog.likes}
          handleLikes={handleLikes}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

const BlogList = ({
  blogs: oldBlogs,
  handleUpdate,
  handleAlertType,
  handleAlertMsg,
}) => {
  const [blogs, setBlogs] = useState(oldBlogs);

  const handleRemoveBlog = (id) => {
    setBlogs(blogs.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setBlogs(oldBlogs);
  }, [oldBlogs]);

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
          handleAlertType={handleAlertType}
          handleAlertMsg={handleAlertMsg}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </>
  );
};

export default BlogList;
