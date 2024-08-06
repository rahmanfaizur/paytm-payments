import { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

// Dashboard component
export const Dashboard = () => {
    // State to store balance
    const [balance, setBalance] = useState(null);
    // State to handle loading state
    const [loading, setLoading] = useState(true);
    // State to handle errors
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch balance from the API
        const fetchBalance = async () => {
            try {
                // Make GET request to the API to fetch balance
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        // Include authorization token from localStorage in the request headers
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                // Set the fetched balance to the state
                setBalance(response.data.balance);
                setLoading(false);
            } catch (err) {
                // Set error message if the request fails
                setError('Failed to fetch balance');
                setLoading(false);
            }
        };

        // Call the fetchBalance function to initiate the API request
        fetchBalance();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div>
            {/* Appbar component */}
            <Appbar />
            <div className="m-8">
                {/* Conditional rendering based on loading and error states */}
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <Balance value={`${balance} Rs`} />
                )}
                {/* Users component */}
                <Users />
            </div>
        </div>
    );
};
