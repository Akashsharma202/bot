import  { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Configure";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
} from "firebase/firestore";
import {  useNavigate,NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {AddUser} from "../actions/index";
export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message,setMessage]=useState("");
  const [password, setPassword] = useState('');
  const dispatch=useDispatch();
  const onLogin = (e) => {
    e.preventDefault();
    // props.setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // props.setSuccess(true);
        const user = userCredential.user;
        getUsernameByUID(user.uid);
        navigate("/home")
      })
      .catch((error) => {
        console.error(error.code, error.message);
      setMessage(error.message);
      })
  }

  const getUsernameByUID = async (uid) => {
    const db = getFirestore(auth.app);
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("uid", "==", uid));
  
    try {
      const querySnapshot = await getDocs(userQuery);
  
      if (querySnapshot.size === 1) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log(userData);
        // props.setUser(userData);
        dispatch(AddUser(userData));
      } else {
        console.log("Username not found");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black h-[89%]">
      <form className="bg-gray-600 p-5  shadow-md px-8 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3 rounded-lg">
        <h2 className="text-2xl text-center mb-4">Login Form</h2>
        <div className="mb-4">
          <input
            id="email-address"
            name="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            id="password"
            name="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div><br></br>
        <div className="flex items-center justify-between">
          <button
            onClick={onLogin}
            className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Login
          </button>
          <p className="text text-black">
            No account yet? {' '}
            <NavLink to="/" className="text-black underline">
              Sign up
            </NavLink>
          </p>
        </div><br></br>
      <h3 className={`color-red-400 ${message?"block":"hidden"}`}>{message}</h3>
      </form>
    </div>
  )
}
export default SignIn;