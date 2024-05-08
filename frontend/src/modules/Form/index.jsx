import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const Form = ({ isSignInPage }) => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        ...(!isSignInPage && {
            Name: ''
        }),
        Email: '',
        Password: ''
    });

    const handleClick = () => {
        const destination = isSignInPage ? '/sign_up' : '/sign_in';
        navigate(destination);
    };

    const handleInputChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/api/${isSignInPage ? "login" : "register"}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (res.status === 400) {
            alert('Invalid Credentials');
        }
        else {
            const resData = await res.json();
            if (resData.token) {
                localStorage.setItem('user:token ', resData.token);
                localStorage.setItem('user:detils ', JSON.stringify(resData.user));
                navigate('/');
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="text-4xl font-extrabold my-3"> Welcome {isSignInPage && 'Back'}</div>
            <div className="text-xl my-2"> {isSignInPage ? 'Sign In to your account' : 'Sign Up to get Started'}</div>
            <form className="w-1/4 flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
                <Input type="text" placeholder="Enter Name" value={data.Name} onChange={(e) => handleInputChange(e, 'Name')} className={isSignInPage ? 'hidden' : 'w-full'} />
                <Input type="email" placeholder="Enter Email" value={data.Email} onChange={(e) => handleInputChange(e, 'Email')} className="w-full" />
                <Input type="password" placeholder="Enter Password" value={data.Password} onChange={(e) => handleInputChange(e, 'Password')} className="w-full" />
                <Button type="submit" className={''} />
            </form>
            <div className="mt-2">{isSignInPage ? "Didn't have an account? " : "Already have an account? "}
                <span onClick={handleClick} className="cursor-pointer underline text-primary-light hover:no-underline font-medium">
                    {isSignInPage ? "Sign Up" : "Sign In"}</span> </div>
        </div>
    );
};
