import React from 'react'

type SignInButtonProps = {
    src: string;
    alt: string;
    onClick: () => void;
    label?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({src, alt, onClick, label}) => {
    return (
        <button type="button" onClick={onClick} className="flex justify-center items-center gap-2 border bg-[var(--clean-white)] text-[var(--trust-blue)] text-xs rounded-md w-full my-2 pl-2 py-2">
            <img
            src={src}
            alt={alt}
            className="w-5 h-5"
            />
        {label && <span>{label}</span>}
        </button>
    );
}

export default SignInButton;