import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import ToggleComponent from "./components/Togglable";
const keyLoggedUser = "loggedBlogAppUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  // login
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state to create blog
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  // alert message
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [loginVisible, setLoginVisible] = useState(false);
  const [update, setUpdate] = useState(0);

  const blogListRef = useRef();

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem(keyLoggedUser);
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    };
    getBlogs();
  }, [user, update]);

  const loginForm = () => {
    return (
      <div>
        <div style={{ display: loginVisible ? "none" : "" }}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={{ display: loginVisible ? "" : "none" }}>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let type = "";
    let msg = "";
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(keyLoggedUser, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (error) {
      type = "error";
      msg = "wrong username or password";
    } finally {
      setAlertType(type);
      setAlertMessage(msg);
      setTimeout(() => {
        setAlertType("");
        setAlertMessage("");
      }, 6000);
    }
  };

  const handleUpdate = () => {
    setUpdate(Math.floor(Math.random() * 10000));
  };

  const logout = () => {
    window.localStorage.clear(keyLoggedUser);
    blogService.setToken(null);
    setUser(null);
  };

  const createNewBlog = async () => {
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    let type = "";
    let msg = "";
    try {
      await blogService.createBlog(newBlog);
      blogListRef.current.toggleVisibility();
      type = "success";
      msg = `a new blog You're NOT gonna need it! by ${user.name} added`;
    } catch (error) {
      type = "error";
      msg = `a new blog can't be created`;
    } finally {
      setAlertType(type);
      setAlertMessage(msg);
      setTimeout(() => {
        setAlertType("");
        setAlertMessage("");
      }, 6000);
    }
  };

  const loginAfter = () => {
    return (
      <>
        <ToggleComponent buttonLabel="new blog" ref={blogListRef}>
          <CreateBlog
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            createNewBlog={createNewBlog}
            handleTitleChange={(e) => setBlogTitle(e.target.value)}
            handleAuthorChange={(e) => setBlogAuthor(e.target.value)}
            handleUrlChange={(e) => setBlogUrl(e.target.value)}
          />
        </ToggleComponent>

        <BlogList
          blogs={blogs}
          handleUpdate={handleUpdate}
          handleAlertType={setAlertType}
          handleAlertMsg={setAlertMessage}
        />
      </>
    );
  };

  return (
    <div>
      <h2>{user !== null ? "blogs" : "log in to application"}</h2>
      <Notification type={alertType} msg={alertMessage} />
      {user !== null && (
        <p>
          {user.username} logged in
          <button onClick={logout}>logout</button>
        </p>
      )}
      {user === null && loginForm()}
      {user !== null && loginAfter()}
    </div>
  );
};

export default App;
