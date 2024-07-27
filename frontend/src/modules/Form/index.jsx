import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

export const Form = ({ isSignInPage }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    ...(!isSignInPage && {
      Name: "",
    }),
    Email: "",
    Password: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  console.log(profileImg);

  const handleClick = () => {
    const destination = isSignInPage ? "/sign_up" : "/sign_in";
    navigate(destination);
  };

  const handleInputChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     //if user switches from signup and tries to login the profile img should not be able to give error
     if(isSignInPage){
       setProfileImg(null);
      }
    const formData = new FormData(); // Create a new FormData object
    for (const key in data) {
      formData.append(key, data[key]); // Append each key-value pair from the data object to formData
    }
    //only upload image on sign up page
    if (!isSignInPage && profileImg) {
      formData.append("profileImg", profileImg); // Append the profile image file to formData if it exists
    }
  
    const res = await fetch(
      `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        body: formData, // Send formData as the request body
      }
    );
  
    if (res.status === 400) {
      alert("Invalid Credentials");
    } else {
      const resData = await res.json();
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:detail", JSON.stringify(resData.user));
        navigate("/");
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="text-4xl font-extrabold my-3">
        Welcome {isSignInPage && "Back"}
      </div>
      <div className="text-xl my-2">
        {isSignInPage ? "Sign In to your account" : "Sign Up to get Started"}
      </div>
      <form
        className="w-3/4 md:w-1/2 lg:w-1/4 flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          type="text"
          isRequired={!isSignInPage}
          placeholder="Enter Name"
          value={data.Name}
          onChange={(e) => handleInputChange(e, "Name")}
          className={isSignInPage ? "hidden" : "w-full"}
        />
        <Input
          type="email"
          placeholder="Enter Email"
          value={data.Email}
          onChange={(e) => handleInputChange(e, "Email")}
          className="w-full"
        />
        <Input
          type="password"
          placeholder="Enter Password"
          value={data.Password}
          onChange={(e) => handleInputChange(e, "Password")}
          className="w-full"
        />
        <input type="file" accept="image/*" onChange={(e)=>setProfileImg(e.target.files[0])} className={isSignInPage ? "hidden" : "w-1/2 my-4 "}/>
        <Button type="submit" title={isSignInPage?"Sign In":"Sign Up"} />
      </form>
      <div className="mt-2 text-lg">
        {isSignInPage
          ? "Didn't have an account? "
          : "Already have an account? "}
        <span
          onClick={handleClick}
          className="cursor-pointer underline text-primary-light hover:no-underline font-medium"
        >
          {isSignInPage ? "Sign Up" : "Sign In"}
        </span>
      </div>
    </div>
  );
}

Form.propTypes = {
  isSignInPage: PropTypes.bool.isRequired
}
