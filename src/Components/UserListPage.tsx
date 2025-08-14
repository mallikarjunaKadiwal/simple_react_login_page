import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  useEffect(() => {
    console.log("first", location);
    if (users.length === 0) {
      navigate("/", { state: { message: "No registered users." } });
    }
  }, [users, navigate]);

  return (
      <div>
        <>
        {location.state && location.state.message && <p>{location.state.message}</p>}
        </>
        <h2><u>Registered Users</u></h2>
        {users.length === 0 ? (
          <p>No registered users.</p>
        ) : (
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: { username: string; email: string; mobile: string; gender: string }, index: number) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button type="button" onClick={() => navigate(`/register/${index}`)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <br />
        <button type="button" onClick={() => navigate("/")}>Logout</button>
      </div>
  );
};

export default UserListPage;