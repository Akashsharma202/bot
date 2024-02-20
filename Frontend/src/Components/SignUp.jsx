import {auth,db} from "../Configure";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {  useNavigate,NavLink } from 'react-router-dom'
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const [message,setMessage]=useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          username,
          authProvider: "local",
          email,
        });
         console.log("info submitted successfully");
         // eslint-disable-next-line no-unused-vars
         const response = await axios.post('http://bot-sigma-beige.vercel.app/EmptyPost', {username:username});
         navigate("/login")
        // Your axios and navigation code here...
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setMessage(error.message);
      });
  }

  return (
    <div className="flex items-center justify-center bg-black h-[89%]">
      <form className="bg-gray-600 p-5  shadow-md px-8 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3 rounded-lg">
        <h2 className="text-2xl text-center mb-4">SignIn Form</h2>
        <div className="mb-4">
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={onSubmit}
            className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            SignIn
          </button>
          <p className="text text-black">
            Already have an account? {' '}
            <NavLink to="/login" className="text-black underline">
              Log In
            </NavLink>
          </p>
        </div>
        <br></br>
      <h3 className={`color-red-400 ${message?"block":"hidden"}`}>{message}</h3>
      </form>
    </div>
  );
};
export default SignUp;
