import { useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      email: email,
      password: password,
    };

    try {
      const { data: jwt } = await axios.post(
        "http://localhost:5000/api/users/login",
        userObj
      );
      localStorage.setItem("token", jwt.token);
      window.location = "/";
      toast.success("You have loged in successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("invalid email and password combination");
      }
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <form onSubmit={onSubmit}>
        {/* ======================================== 1 */}
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            required={true}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>

        {/* ======================================== 2 */}
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            required={true}
            placeholder="Enter your password"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
