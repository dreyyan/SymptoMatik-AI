import { useNavigate, Link } from "react-router-dom";
import Styles from '../styles/Styles';

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

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
                <div className="flex flex-col row-span-200 col-span-3 h-screen bg-white-500 px-[4%] pt-[10%]">
                    <div className={Styles.heroSectionDivStyle}>
						{/* HEADER */}
                        <h1 className="text-7xl poppins-bold text-[var(--trust-blue)]">Diagnose with Confidence,</h1>
                        <h2 className="text-5xl poppins-semibold text-[var(--trust-blue)]">Streamlined for Filipino Healthcare</h2>

						{/* TEXT */}
						<div className="pt-6 flex flex-col justify-center items-center">
							<p className="roboto-body text-[var(--trust-blue)]">Empower your practice with AI-driven disease predictions, intuitive symptom ranking, and</p>
							<p className="roboto-body text-[var(--trust-blue)]">blockchain-secured data—tailored for Filipino doctors and patients.</p>
						</div>

                        {/* GET STARTED BUTTON */}
                        <div className="flex gap-4 mt-4">
                            <button type="button" className={Styles.smSquareButtonStyle} onClick={handleGetStarted}>Get Started</button>
                            <button type="button" className={Styles.smSquareButtonOutlineStyle} onClick={handleGetStarted}>View Demo</button>
                        </div>
                        {/* IMAGE */}
                        <div className="flex justify-center items-center mt-2 w-[60%]">
                            <img className="" src="/hero-section-background.png"/>
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
