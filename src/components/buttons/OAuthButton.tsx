import React from 'react'

type OAuthButtonProps = {
    src: string;
    alt: string;
    onClick: () => void;
    label?: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({src, alt, onClick, label}) => {
    return (
        <button type="button" onClick={onClick}
        className="
        cursor-pointer
        flex
        justify-center
        items-center
        
        gap-2 border
        text-xs
        rounded-md
        w-full
        mb-4 pl-2 py-2

        text-[var(--trust-blue)]
        hover:text-[var(--clean-white)]
        hover:bg-[var(--trust-blue)]
        hover:border-[var(--trust-blue)]

        duration-200 ease-in-out
        transition
        transform 
        hover:scale-101
        hover:opacity-90
        ">
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