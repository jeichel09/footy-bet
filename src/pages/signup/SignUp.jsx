import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

import FormInput from "./FormInput";

export default function SignUp() {
  const { signupSubmitHandler } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    passwordConfirm: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "first_name",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "The Name should be 2-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{2,16}$",
      required: true,
    },
    {
        id: 4,
        name: "last_name",
        type: "text",
        placeholder: "Last Name",
        errorMessage:
          "The Name should be 2-16 characters and shouldn't include any special character!",
        label: "Last Name",
        pattern: "^[A-Za-z0-9]{2,16}$",
        required: true,
      },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "passwordConfirm",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    signupSubmitHandler(values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <section className="mt-1 mx-1 sign-up">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-row">  
                <div className="form-logo mr-6">
                  <img src="../../public/img/logo.png" alt="logo" className="rounded-md"/>
                </div>
                <h3 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">Create a new account</h3>
            </div>
            <hr className="border border-gray-400 my-4" />
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                
                <button type="submit" className="w-full text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                <p className="text-sm font-light text-white dark:text-gray-400">
                    You already have an account? <Link to="/login" className="font-medium ml-2 text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                </p>
            </form>
            </div>
          </div>
      </div>
    </section>
  );
}
   