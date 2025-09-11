import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../styles/Styles.js";

/*
Symptom Ranking
Diagnosis Results
Patient Profiles
*/

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import SymptomsList from "../components/SymptomsList";
import NodeContainer from "../components/NodeContainer.js";

const Diagnosis = () => {
    document.title = "SymptoMatik: Diagnosis";


    return (
        <div className="flex flex-row bg-[url('/')] bg-cover bg-center">
            <div className="grid grid-cols-3 gap-1 w-full h-200">
                {/* Header */}
                {/* <input type="text" placeholder="Enter to search..." className={Styles.searchBarStyle}/> */}
				<Header/>
                {/* Body */}
                <div className="border w-full h-full">
                    <SymptomsList/>
                    <NodeContainer/>
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