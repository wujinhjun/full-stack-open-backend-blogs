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
