interface TertiaryButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    href?: string;

    fontSize?: string;
    fontWeight?: string;
}

const TertiaryButton: React.FC<TertiaryButtonProps> = ({ text, onClick, disabled = false, href, fontSize = "14px", fontWeight = "400" }) => {
    const style =  { fontSize, fontWeight };

    if (href) {
        return (
            <a
                target="_blank"
                style={style}
                href={href}
                className={`
                    btn ${disabled ? "btn-disabled" : ""}
                    dm-serif-display
                    text-[var(--text-secondary)]
                    hover:text-gray-400
                    `}
                onClick={(e) => disabled && e.preventDefault()}
            >
                {text}
            </a>
        );
    }

    return (
        <button
        style={style}
            onClick={disabled ? undefined : onClick}
            className={`
                flex justify-center items-center

                h-auto
                mx-[0] my-[0]
                px-[0] py-[0]

                border rounded-lg

                bg-transparent
                border-transparent
                text-[var(--text-secondary)]

                dm-serif-display

                duration-200 ease-in-out

                transition
                hover:text-[var(--text-primary)]
                hover:underline

                transform
                hover:scale-110

                cursor-pointer
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >{text}
        </button>
    );
}

export default TertiaryButton;
