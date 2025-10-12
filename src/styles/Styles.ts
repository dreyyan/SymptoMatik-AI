const Styles = {
  // Div
  mainDivStyle:
  "bg-[url(login-bg.png)] bg-cover bg-end flex flex-row w-full min-h-screen bg-white lg:flex-row lg:bg-center",
  loginDivStyle: "bg-gradient-to-l flex flex-col px-24 pt-2 pb-8 w-[40%] h-auto ml-14 mt-5 lg:px-12",
  heroSectionDivStyle: "flex flex-col justify-center xl:mb-[20%] xl:h-[40%] lg:mb-[8%] lg:h-[60%]",
  signUpLinkDivStyle: "flex flex-row justify-center items-center gap-1 my-2 text-sm",

  // Form & Input
  formStyle: "flex flex-col mt-8 mb-2 py-2 w-[100%] gap-1",
  inputStyle: "border-1 border-[#BABABA] h-10 w-full rounded-full mt-1 mb-2 px-3 py-2 text-sm focus:outline focus:outline focus:outline-[var(--healing-teal)]",
  inputLabelStyle: "text-sm inter-semibold text-[var(--trust-blue)]",

  // Buttons
  primaryButtonStyle: "cursor-pointer bg-[var(--trust-blue)] text-[var(--clean-white)] rounded-full w-auto px-6 text-md inter-semibold",
  secondaryButtonStyle: "cursor-pointer border inter bg-[var(--clean-white)] text-[var(--trust-blue)] rounded-full w-auto px-6 py-1 text-md transition duration-300 ease-in-out hover:bg-[#E6F0F2] hover:text-[var(--trust-blue)] hover:border-[var(--clean-white)]",

  // Text
  pStyle: "text-md",
  sublinkStyle: "text-xs font-bold text-[var(--slate-gray)] text-left duration-200 ease-in-out transition hover:opacity-50",
  subheaderStyle: "text-md inter-semibold text-[var(--trust-blue)]",

  // Semantic Colors
  lowColor: "bg-[#4db6ac]",
  mediumColor: "bg-[#f0c14b]",
  highColor: "bg-[#da4b41ff]",
  undefinedColor: "bg-[#b0bec5]",
};

export default Styles;
