import React from 'react'

type OAuthButtonProps = {
    src: string;
    alt: string;
    onClick: () => void;
    label?: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({src, alt, onClick, label}) => {
    return (
        <button type="button" onClick={onClick} className="flex justify-center items-center gap-2 border bg-[var(--clean-white)] text-[var(--trust-blue)] text-xs rounded-md w-full mb-4 pl-2 py-2">
            <img
            src={src}
            alt={alt}
            className="w-5 h-5"
            />
        {label && <span>{label}</span>}
        </button>
    );
}

export default OAuthButton;