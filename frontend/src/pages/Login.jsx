import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import {loginUser} from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user, guestId, loading} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);

    // Get redirect parameter and check if it's checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("ConfirmOrder");

    useEffect(() => {
      if (user) {
        if (cart?.products.length > 0 && guestId) {
          dispatch(mergeCart({ guestId, user })).then(() => {
            navigate(isCheckoutRedirect ? "/ConfirmOrder" : "/");
          });
        } else {
          navigate(isCheckoutRedirect ? "/ConfirmOrder" : "/");
        }
      }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await dispatch(loginUser({ email, password })).unwrap();
  } catch (err) {
    setError("Invalid email or password");
  }
};

    return (
    <div className="flex pt-24 lg:pt-0">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
      
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
        <div className="flex justify-center mb-6">
            
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome!</h2>
        <p className="text-center mb-6">
            Please enter your Details...
        </p>
        {error && (
  <div className="mb-4 p-2 text-red-700 bg-red-200 border border-red-500 rounded">
    {error}
  </div>
)}
        <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email address"
            required
            />
        </div>
        <div className="mb-4 relative">
        <label className="block text-sm font-semibold mb-2">Password</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            required
            />
            <span className="absolute right-3 top-10 cursor-pointer" 
            onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye/> : <FaEyeSlash/> }
            </span>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800
          transition"
        >
            {loading ? "Loading..." : "Sign In"}
        </button>
        <p className="mt-6 text-center text-sm">
            Don't have an account? {" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Register
            </Link>
        </p>
        
      </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
      <div className="h-full flex flex-col justify-center items-center">
        <img src={login} alt="Login to Account" className="h-[750px] w-full object-cover" />
      </div>
      </div>
    </div>
  );
};

export default Login;
