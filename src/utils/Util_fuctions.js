import { useNavigate } from "react-router-dom";

// Validates email address.
export function validEmail(e) {
  var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
}

export function RedirectButton(path, name) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(path)}>{name}</button>;
}
