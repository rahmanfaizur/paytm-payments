import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

// SendMoney component
export const SendMoney = () => {
    // Get search parameters from the URL
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // Get user ID from search parameters
    const name = searchParams.get("name"); // Get user name from search parameters
    const [amount, setAmount] = useState(0); // State to store the amount to be transferred
    const [balance, setBalance] = useState(null); // State to store balance
    const [error, setError] = useState(""); // State to store error messages
    const [showBalanceButton, setShowBalanceButton] = useState(true); // State to manage balance check button visibility

    // Handle the money transfer
    const handleTransfer = async () => {
        try {
            // Send money to the specified user
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            // Fetch updated balance after the transfer
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setBalance(response.data.balance); // Set the updated balance to the state
        } catch (error) {
            setError("An error occurred. Please try again."); // Set error message if the transfer fails
            console.error(error);
        }
    };

    // Handle balance check
    const handleCheckBalance = async () => {
        try {
            // Fetch balance from the backend
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance); // Set the fetched balance to the state
            setShowBalanceButton(false); // Hide the balance check button after fetching balance
        } catch (error) {
            setError("Failed to fetch balance. Please try again."); // Set error message if balance fetch fails
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                            {showBalanceButton && (
                                <button
                                    onClick={handleCheckBalance}
                                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white mt-4"
                                >
                                    Check Balance
                                </button>
                            )}
                            {balance !== null && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Current Balance:</h3>
                                    <p className="text-xl">{balance} Rs</p>
                                </div>
                            )}
                            {error && (
                                <div className="mt-4 text-red-500">
                                    <p>{error}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
