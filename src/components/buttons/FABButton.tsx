interface FABButtonProps {
    icon: React.ReactNode; // Any JSX icon
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    color?: string; // Tailwind background color, e.g., "bg-blue-500"
    disabled?: boolean;
}

const FABButton: React.FC<FABButtonProps> = ({
    icon,
    onClick,
    size = "md",
    color = "bg-blue-500",
    disabled = false,
}) => {
    const sizeClass =
        size === "sm" ? "w-10 h-10 p-2" :
        size === "lg" ? "w-16 h-16 p-4" :
        "w-12 h-12 p-3"; // md default

    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={`
                (fixed bottom-6 right-6)
                ${sizeClass}
                ${color} 
                text-white 
                rounded-full
                shadow-lg
                flex items-center justify-center
                transition transform duration-200 ease-in-out
                hover:scale-110
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
        >
            {icon}
        </button>
    );
};

export default FABButton;
