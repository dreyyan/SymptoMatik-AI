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
    return (
        <div className="flex flex-row bg-[url('/')] bg-cover bg-center">
            <div className="grid grid-cols-3 gap-1 w-full h-200">
                {/* Header */}
				<Header/>
                {/* Hero Section */}
                <div className="flex flex-col row-span-200 col-span-3 h-[2000px] bg-white-500 px-[4%] pt-[10%]">
                    {/* First Row */}
                    <div className={Styles.heroSectionDivStyle}>
						{/* HEADER */}
                        <h1 className="text-7xl poppins-bold text-[var(--trust-blue)]">Diagnose with Confidence,</h1>
                        <h2 className="text-5xl poppins-semibold text-[var(--trust-blue)]">Streamlined for Filipino Healthcare</h2>

						{/* TEXT */}
						<div className="pt-6 flex flex-col justify-center items-center">
							<p className="roboto-body text-[var(--trust-blue)]">Empower your practice with AI-driven disease predictions, intuitive symptom ranking, and</p>
							<p className="roboto-body text-[var(--trust-blue)]">blockchain-secured data—tailored for Filipino doctors and patients.</p>
						</div>
                    </div>
                </div>
                {/* Footer */}
                <div className="h-34 row-span-14 col-span-3">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Home;
