/*import { errorMessage } from "../../lib/pocketbase";*/

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";

let LoginFormKeys = {
  Username: "username",
  Password: "password",
};

export default function Login() {
  const { loginSubmitHandler } = useContext(AuthContext);
  const [formError, setFormError] = useState(null);
  const {values, onChange, onSubmit } = useForm(handleSubmit, {
    [LoginFormKeys.Username]: "",
    [LoginFormKeys.Password]: "",
  });

  useEffect(() => {
    return () => {
      setFormError(null);
    };  
  }, [values]);

  function handleSubmit(formValues) {
    setFormError(null);
    if (!formValues.username || !formValues.password) {
      setFormError("Please fill in both username and password!");
    } else {
      loginSubmitHandler(formValues);
    }
  }

  return (
    <section className="mt-1 mx-1 login">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-row">  
                <div className="form-logo mr-6">
                  <img src="../../public/img/logo.png" alt="logo" className="rounded-md"/>
                </div>
                <h3 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">Log in to your account</h3>
            </div>
            <hr className="border border-gray-400 my-4" />
            {(formError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{formError}</span>
                </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>
                    <input 
                      type="text" 
                      name={LoginFormKeys.Username} 
                      id="username" 
                      className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com" 
                      required="" 
                      value={values[LoginFormKeys.Username]} 
                      onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                    <input 
                      type="password" 
                      name={LoginFormKeys.Password} 
                      id="password" 
                      placeholder="••••••••" 
                      className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required="" 
                      value={values[LoginFormKeys.Password]}
                      onChange={onChange} />
                </div>
                
                <button type="submit" className="w-full text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                <p className="text-sm font-light text-white dark:text-gray-400">
                    Don’t have an account yet? <Link to="/signup" className="font-medium ml-2 text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
            </form>
            </div>
          </div>
      </div>
    </section>
  );
}
   