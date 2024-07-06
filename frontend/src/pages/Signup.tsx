import { Auth } from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10">
      <div className="lg:col-span-6">
        <Auth type="signup" />
      </div>
      <div className="hidden lg:block lg:col-span-4">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
