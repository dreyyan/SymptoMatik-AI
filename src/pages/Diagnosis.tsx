import { Link } from "react-router-dom";
import Styles from "../styles/Styles";

/*
Symptom Ranking
Diagnosis Results
Patient Profiles
*/

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Diagnosis = () => {
    document.title = "SymptoMatik: Diagnosis";
    return (
        <div className="flex flex-row bg-[url('/')] bg-cover bg-center">
            <div className="grid grid-cols-3 gap-1 w-full h-200">
                {/* Header */}
                    <input type="text" placeholder="Enter to search..." className={Styles.searchBarStyle}/>
				<Header/>
                {/* Hero Section */}
                <div>
                    
                </div>
                {/* Footer */}
                <div className="h-34 row-span-14 col-span-3">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};
export default Diagnosis;