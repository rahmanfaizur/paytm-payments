import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Component to display a list of users and a search input to filter them
export const Users = () => {
    // State to store the list of users fetched from the backend
    const [users, setUsers] = useState([]);
    // State to store the filter input value
    const [filter, setFilter] = useState("");

    useEffect(() => {
        // Fetch users from the backend based on the filter
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                // Update the users state with the fetched data
                setUsers(response.data.user);
            });
    }, [filter]); // Effect depends on the filter value

    return (
        <>
            {/* Title */}
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            {/* Search input to filter users */}
            <div className="my-2">
                <input 
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }} 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            {/* Display list of users */}
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
};

// Component to display individual user information
function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            {/* User's avatar and name */}
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            {/* Button to send money to the user */}
            <div className="flex flex-col justify-center h-full">
                <Button 
                    onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName);
                    }} 
                    label={"Send Money"} 
                />
            </div>
        </div>
    );
}
