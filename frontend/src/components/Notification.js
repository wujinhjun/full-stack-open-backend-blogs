export default function Notification({ type, msg }) {
  return <>{msg.length === 0 ? null : <div className={type}>{msg}</div>}</>;
}
