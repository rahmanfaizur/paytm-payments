import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Signup component
export const Signup = () => {
    // State variables to store user input
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook to navigate programmatically

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    {/* Main heading for the signup page */}
                    <Heading label={"Sign up"} />
                    
                    {/* Subheading providing instructions for signup */}
                    <SubHeading label={"Enter your information to create an account"} />
                    
                    {/* Input box for first name */}
                    <InputBox 
                        onChange={e => setFirstName(e.target.value)} 
                        placeholder="Jane" 
                        label={"First Name"} 
                    />
                    
                    {/* Input box for last name */}
                    <InputBox 
                        onChange={e => setLastName(e.target.value)} 
                        placeholder="Doe" 
                        label={"Last Name"} 
                    />
                    
                    {/* Input box for email */}
                    <InputBox 
                        onChange={e => setUsername(e.target.value)} 
                        placeholder="faizur@gmail.com" 
                        label={"Email"} 
                    />
                    
                    {/* Input box for password */}
                    <InputBox 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="123456" 
                        label={"Password"} 
                    />
                    
                    <div className="pt-4">
                        {/* Button to initiate signup */}
                        <Button 
                            onClick={async () => {
                                try {
                                    // Post signup data to API
                                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                        username,
                                        firstName,
                                        lastName,
                                        password
                                    });
                                    
                                    // Store token in local storage and navigate to dashboard
                                    localStorage.setItem("token", response.data.token);
                                    navigate("/dashboard");
                                } catch (error) {
                                    console.error("Signup failed", error);
                                }
                            }} 
                            label={"Sign up"} 
                        />
                    </div>
                    
                    {/* Warning text with link to signin page */}
                    <BottomWarning 
                        label={"Already have an account?"} 
                        buttonText={"Sign in"} 
                        to={"/signin"} 
                    />
                </div>
            </div>
        </div>
    );
};
