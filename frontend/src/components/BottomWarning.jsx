import { Link } from "react-router-dom"

// Component for displaying a warning message with a clickable link/button
export function BottomWarning({ label, buttonText, to }) {
    return (
        <div className="py-2 text-sm flex justify-center">
            {/* Warning label text */}
            <div>
                {label}
            </div>
            {/* Link with button text, styled as a clickable element */}
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    );
}
