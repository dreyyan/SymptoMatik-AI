interface PrimaryButtonProps {
    text: string,
    onClick?: () => void;
    disabled: boolean;
    href?: string;

    width?: string;
    height?: string;
    borderRadius?: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, onClick, disabled = false, href, width = "150px", height = "52px", borderRadius = "100px"}) => {
    const fontSize = `calc(${height} * 0.5)`;

    const style = { width, height, borderRadius, fontSize };
        if (href) {
        return (
            <a
                href={href}
                className={`btn ${disabled ? "btn-disabled" : ""}`}
                onClick={(e) => disabled && e.preventDefault()}
            >
                {text}
            </a>
        );
    }

    return (
        <button style={style} onClick={onClick} className="
        cursor-pointer
        rounded-md

        w-auto

        flex justify-center items-center

        mt-2 px-6 py-2

        bg-[var(--trust-blue)]
        text-[var(--clean-white)]
        text-md

        dm-serif-display
        font-semibold

        duration-200 ease-in-out

        transition
        transform 
        hover:scale-101
        hover:opacity-90
        
        cursor-pointer

        disabled:opacity-50
        disabled:cursor-not-allowed
        ">{text}
        </button>
    );
}

export default PrimaryButton;