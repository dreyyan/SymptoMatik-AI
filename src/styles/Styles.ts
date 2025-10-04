const Styles = {
    // Div
    mainDivStyle: "bg-[url('/symptomatik-background-login-page.png')] bg-cover bg-end flex flex-row w-full min-h-screen",
    loginDivStyle: "bg-gradient-to-l from-transparent from-30% to-[var(--clean-white)] to-80% flex flex-col px-24 pt-2 pb-8 w-[40%] h-auto",
    heroSectionDivStyle: "flex flex-col justify-center items-center mb-[20%]",
    sidebarLinkDivStyle: "flex flex-col items-center justify-start items-end w-full h-full pr-[10%] text-2xl font-semibold border-b-2",
    signUpLinkDivStyle: "flex flex-row justify-center items-center gap-1 my-2 text-sm",
    sidebarLinkSeparatorStyle: "w-full text-end border-b py-2 border-slate-400",

    // Form & Input
    formStyle: "flex flex-col mt-8 mb-2 py-2 w-[100%]",
    inputStyle: "border-1 border-[var(--trust-blue)] w-full rounded-md mt-1 mb-2 px-3 py-2 text-sm focus:outline-none",
    inputLabelStyle: "text-sm text-[12px] text-[var(--trust-blue)]",

    // Images
    loginPageBackground: "h-screen",

    // Buttons
    roundedButtonStyle: "cursor-pointer border bg-[var(--trust-blue)] text-[var(--clean-white)] rounded-full w-full mt-2 px-6 py-1 text-sm",
    squareButtonStyle: "cursor-pointer border bg-[var(--trust-blue)] text-[var(--clean-white)] rounded-md w-full mt-2 px-6 py-2 text-md",
    smSquareButtonStyle: "cursor-pointer border bg-[var(--trust-blue)] text-[var(--clean-white)] rounded-md w-auto mt-2 px-6 py-2 text-md transition duration-300 ease-in-out hover:bg-[var(--clean-white)] hover:text-[var(--trust-blue)] hover:border-[var(--clean-white)]",
    smSquareButtonOutlineStyle: "cursor-pointer border bg-[var(--clean-white)] text-[var(--trust-blue)] rounded-md w-auto mt-2 px-6 py-2 text-md transition duration-300 ease-in-out hover:bg-[var(--clean-white)] hover:text-[var(--trust-blue)] hover:border-[var(--clean-white)]",

    // Components
    searchBarStyle: "border-2 border-[var(--trust-blue)] rounded-full w-[28%] h-[54%] pl-[1%] ml-8 mr-4",
    modalStyle: "w-20 h-20",

    // Headers
    h1Style: "text-5xl font-bold",
    h2Style: "text-[var(--trust-blue)] text-3xl font-bold",
    h3Style: "text-2xl font-bold",
    h4Style: "text-xl font-semibold",
    logoHeaderStyle: "text-5xl font-bold color-primary",

    // Text
    pStyle: "text-md",
    linkTextStyle: "text-2xl font-semibold text-white",
    headerLinkStyle: "text-2xl font-semibold color-gray",
    sublinkStyle: "text-sm text-[var(--trust-blue)] text-right",
    separatorStyle: "text-md text-center my-2",
    navigationLinkStyle: "text-lg roboto-cta relative text-[var(--trust-blue)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:origin-center after:bg-[var(--trust-blue)] after:transition-transform after:duration-300 hover:after:scale-x-100",
    sidebarLinkStyle: "text-lg poppins-semibold relative text-[var(--trust-blue)]",
    subheaderStyle: "text-sm font-semibold text-[var(--trust-blue)]",
}

export default Styles