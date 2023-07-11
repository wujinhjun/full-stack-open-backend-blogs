import PropTypes from "prop-types";

export default function LoginForm({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

LoginForm.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};
