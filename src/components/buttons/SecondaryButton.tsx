interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  fontSize?: string;
  borderRadius?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onClick,
  disabled = false,
  width,
  fontSize = "16px",
  borderRadius = "20px",
}) => {
  const style = { width, fontSize, borderRadius };

  return (
    <button
      style={style}
      onClick={disabled ? undefined : onClick}
      className={`
                cursor-pointer
                rounded-sm

                w-42

                flex justify-center items-center

                mt-2 px-6 py-2

                text-[var(--trust-blue)]
                border-[var(--trust-blue)]
                hover:text-[var(--healing-teal)]
                border

                dm-serif-display

                duration-200 ease-in-out

                transition
                transform
                
                cursor-pointer

                disabled:opacity-50
                disabled:cursor-not-allowed
            `}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
