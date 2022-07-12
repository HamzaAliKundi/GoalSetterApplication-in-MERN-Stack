import { useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    c_password: "",
  });

  const { name, email, password, c_password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      name: name,
      email: email,
      password: password,
    };

    if (password !== c_password) {
      toast.error("Please add same password");
    } else {
      try {
        const { data: jwt } = await axios.post(
          "http://localhost:5000/api/users",
          userObj
        );
        localStorage.setItem("token", jwt.token);
        window.location = "/login";
        toast.success("You are registered successfully");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error("Already registered with this email, try another one");
        }
      }
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <form onSubmit={onSubmit}>
        {/* ======================================== 1 */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            required={true}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </div>

        {/* ======================================== 2 */}
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

        {/* ======================================== 3 */}
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

        {/* ======================================== 4 */}
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="c_password"
            name="c_password"
            value={c_password}
            required={true}
            placeholder="Conform password"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
