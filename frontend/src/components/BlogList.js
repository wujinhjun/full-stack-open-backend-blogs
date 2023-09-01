import Blog from "./Blog";

const BlogList = ({
  blogs: oldBlogs,
  handleUpdate,
  handleAlertType,
  handleAlertMsg,
}) => {
  console.log(oldBlogs);
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
