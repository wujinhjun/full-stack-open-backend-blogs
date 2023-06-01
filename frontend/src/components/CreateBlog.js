export default function CreateBlog({
  blogTitle,
  blogAuthor,
  blogUrl,
  createNewBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) {
  return (
    <form onSubmit={createNewBlog}>
      <h2>create new</h2>
      <div>
        title:{" "}
        <input
          name="title"
          type="text"
          value={blogTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:{" "}
        <input
          name="author"
          type="text"
          value={blogAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:{" "}
        <input
          name="url"
          type="text"
          value={blogUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button>create</button>
    </form>
  );
}
