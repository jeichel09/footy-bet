import { useContext } from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";

let SignUpFormKeys = {
  Username: "username",
  Email: "email",
  FirstName: "first_name",
  LastName: "last_name",
  Password: "password",
  ConfirmPassword: "passwordConfirm",
};

export default function SignUp() {
  const { signupSubmitHandler } = useContext(AuthContext);
  const {values, onChange, onSubmit } = useForm(signupSubmitHandler, {
    [SignUpFormKeys.Username]: "",
    [SignUpFormKeys.Email]: "",
    [SignUpFormKeys.FirstName]: "",
    [SignUpFormKeys.LastName]: "",
    [SignUpFormKeys.Password]: "",
    [SignUpFormKeys.ConfirmPassword]: "",
  });

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
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>
                    <input type="text" name={SignUpFormKeys.Username} id="username" className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" value={values[SignUpFormKeys.Username]} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
                    <input type="email" name={SignUpFormKeys.Email} id="email" className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={values[SignUpFormKeys.Email]} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">First Name</label>
                    <input type="text" name={SignUpFormKeys.FirstName} id="first_name" className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" value={values[SignUpFormKeys.FirstName]} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Last Name</label>
                    <input type="text" name={SignUpFormKeys.LastName} id="last_name" className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" value={values[SignUpFormKeys.LastName]} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                    <input type="password" name={SignUpFormKeys.Password} id="password" placeholder="••••••••" className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={values[SignUpFormKeys.Password]}
                    onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white dark:text-white">Confirm Password</label>
                    <input type="password" name={SignUpFormKeys.ConfirmPassword} id="confirm-password" placeholder="••••••••" className="form-control bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={values[SignUpFormKeys.ConfirmPassword]}
                    onChange={onChange} />
                </div>
                
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
   