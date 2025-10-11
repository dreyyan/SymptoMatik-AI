import { useNavigate, Link } from "react-router-dom";
import Styles from "../styles/Styles";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";

const Home = () => {
  document.title = "SymptoMatik: Diagnose with Confidence";
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("../diagnosis");
  };

  return (
    <div className="flex flex-col bg-cover bg-center">
      <div className="grid grid-cols-3 w-full">
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <div className="flex flex-col row-span-200 col-span-3 h-screen bg-[url('/hero-bg.png')] bg-cover px-[6%] pt-[6%]">
          <div className={Styles.heroSectionDivStyle}>
            {/* HEADER */}
            <div className="flex w-4xl text-7xl leading-18">
              <h1 className="inter-semibold text-[var(--dark-navy)]">
                Your Health, Diagnosed with
                <span   className="inter-semibold inline-block
             bg-gradient-to-r from-[var(--trust-blue)] to-[var(--healing-teal)] px-2
             bg-clip-text text-transparent">
                  Confidence
                </span>
              </h1>
            </div>

            {/* TEXT */}
            <div className="pt-6 flex flex-col justify-center">
              <p className="inter text-lg text-[var(--slate-gray)] w-xl pl-2">
                Support your healthcare practices with AI-powered disease
                prediction and symptom assessment.
              </p>
            </div>

            {/* GET STARTED BUTTON */}
            <div className="flex gap-6 mt-6">
              <PrimaryButton
                text="Get Started"
                height="42px"
                fontSize="18px"
                onClick={handleGetStarted}
                disabled={false}
              />
              <SecondaryButton
                text="View Demo"
                fontSize="16px"
                disabled={false}
              />
            </div>
            {/* IMAGE */}
            <div className="flex justify-center items-center mt-2 w-[60%]"></div>
          </div>
        </div>
      </div>
        {/* Footer */}
        <Footer />
    </div>
  );
};

export default Home;
