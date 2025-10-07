interface SecondaryButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    width?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick, disabled = false, width }) => {

    const style = { width };

    return (
        <button
            style={style}
            onClick={disabled ? undefined : onClick}
            className={`
                cursor-pointer
                rounded-md

                w-auto

                flex justify-center items-center

                mt-2 px-6 py-2

                bg-[var(--clean-white)]
                text-[var(--trust-blue)]
                border
                border-[var(--trust-blue)]
                hover:bg-[var(--trust-blue)]
                hover:text-[var(--clean-white)]

                dm-serif-display

                duration-200 ease-in-out

                transition
                transform 
                hover:scale-101
                
                cursor-pointer

                disabled:opacity-50
                disabled:cursor-not-allowed
            `}
        >
            <p className="text-[14px]">{text}</p>
        </button>
    );
}

export default SecondaryButton;