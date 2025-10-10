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
    <div className="flex flex-row bg-cover bg-center">
      <div className="grid grid-cols-3 gap-1 w-full">
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <div className="flex flex-col row-span-200 col-span-3 h-screen bg-[url('/hero-bg.png')] bg-cover px-[6%] pt-[10%]">
          <div className={Styles.heroSectionDivStyle}>
            {/* HEADER */}
            <div className="flex w-4xl text-6xl leading-18">
              <h1 className="inter-regular text-black">
                Your Health, Diagnosed with
                <span className="inter-semibold text-[var(--primary-teal)] ml-2">
                  Confidence
                </span>
              </h1>
            </div>

            {/* TEXT */}
            <div className="pt-6 flex flex-col justify-center">
              <p className="inter text-lg text-[var(--neutral-gray)] w-xl">
                Support your healthcare practices with AI-powered disease
                prediction and symptom assessment.
              </p>
            </div>

            {/* GET STARTED BUTTON */}
            <div className="flex gap-4 mt-6">
              <PrimaryButton
                text="Get Started"
                height="46px"
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
        {/* Footer */}
        <div className="row-span-14 col-span-3">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
