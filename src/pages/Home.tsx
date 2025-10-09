import { useNavigate, Link } from "react-router-dom";
import Styles from '../styles/Styles';

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";

/*
Symptom Ranking
Diagnosis Results
Patient Profiles
*/

const Home = () => {
    document.title = "SymptoMatik: Home";
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');

    }

    return (
        <div className="flex flex-row bg-cover bg-center">
            <div className="grid grid-cols-3 gap-1 w-full h-screen">
                {/* Header */}
				<Header/>
                {/* Hero Section */}
                <div className="flex flex-col row-span-200 col-span-3 h-screen bg-white-500 px-[8%] pt-[6%]">
                    <div className={Styles.heroSectionDivStyle}>
						{/* HEADER */}
                        <h1 className="text-7xl poppins-bold text-[var(--trust-blue)]">Diagnose with Confidence,</h1>
                        <h2 className="text-5xl poppins-semibold text-[var(--trust-blue)]">Streamlined for Filipino Pediatric Healthcare</h2>

						{/* TEXT */}
						<div className="pt-6 flex flex-col justify-center">
							<p className="roboto-body text-[var(--neutral-gray)]">Support your pediatric practice with AI-powered disease prediction, child focused symptom assessment, and</p>
							<p className="roboto-body text-[var(--neutral-gray)]">blockchain-secured health data — crafted for Filipino doctors and their young patients.</p>
						</div>

                        {/* GET STARTED BUTTON */}
                        <div className="flex gap-4 mt-6">
                            <PrimaryButton text="Get Started" height="46px" fontSize="18px" disabled={false}/>
                            <SecondaryButton text="View Demo" fontSize="16px" onClick={handleGetStarted} disabled={false}/>
                        </div>
                        {/* IMAGE */}
                        <div className="flex justify-center items-center mt-2 w-[60%]">
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="row-span-14 col-span-3">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Home;
