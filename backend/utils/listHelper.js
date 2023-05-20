const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  const result = {};
  let top = -1;

  for (const blog of blogs) {
    if (blog.likes > top) {
      top = blog.likes;
      result.title = blog.title;
      result.author = blog.author;
      result.likes = blog.likes;
    }
  }

  return result;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const mp = new Map();
  //name: {count: number, flag: boolean}
  let result = "",
    most = 0;
  for (const { author } of blogs) {
    mp.set(author, (mp.get(author) ?? 0) + 1);

    const count = mp.get(author);
    if (count > most) {
      most = count;
      result = author;
    }
  }

  return {
    author: result,
    blogs: most,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const mp = new Map();

  let result = "",
    most = 0;
  for (const { author, likes } of blogs) {
    mp.set(author, (mp.get(author) ?? 0) + likes);

    const count = mp.get(author);
    if (count > most) {
      most = count;
      result = author;
    }
  }

  return {
    author: result,
    likes: most,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
