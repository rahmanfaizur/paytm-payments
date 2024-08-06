export const Balance = ({ value }) => {
    return (
        <div className="flex">
            {/* Label for balance */}
            <div className="font-bold text-lg">
                Your balance
            </div>
            {/* Display the balance value */}
            <div className="font-semibold ml-4 text-lg">
                Rs {value}
            </div>
        </div>
    );
};
