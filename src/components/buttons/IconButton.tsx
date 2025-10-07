interface IconButtonProps {
    icon: React.ReactNode; // Pass any JSX icon
    onClick?: () => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, disabled = false, size = "md" }) => {
    const sizeClass = size === "sm" ? "w-8 h-8 p-1" :
                      size === "lg" ? "w-12 h-12 p-3" :
                      "w-10 h-10 p-2"; // md default

    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={`
                flex justify-center items-center
                ${sizeClass}
                rounded-full
                bg-gray-100 border border-gray-400 text-gray-800
                duration-200 ease-in-out
                transition transform hover:scale-110
                hover:bg-gray-200 hover:border-gray-600
                cursor-pointer
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >
            {icon}
        </button>
    );
}

export default IconButton;
