import { useState } from "react";
import Styles from "../styles/Styles.js";
import LinkedList from "../logic/LinkedList.js";

// Components
import Disease from "./Disease.js";

const RightSidebar = ({ addNode }: RightSidebarProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg h-full">
        <h2 className="text-2xl font-semibold text-[var(--trust-blue)]">SymptoMatik-AI</h2>
        <h3 className="text-sm font-semibold text-[var(--trust-blue)]">SymptoMatik-AI thinks your patient has...</h3>

        <Disease
          diseaseName="Flu"
          classification="Infectious"
          severity="Mild"
          symptoms={["Fever", "Cough", "Headache"]}
          description="The flu, or influenza, is a highly contagious viral respiratory illness causing symptoms like fever, cough, muscle aches, fatigue, and a runny nose. It is spread through respiratory droplets from coughs and sneezes and can range from mild to severe, sometimes leading to life-threatening complications. Prevention includes the annual flu vaccine, good hygiene, and staying home when sick"
          />
        <Disease
          diseaseName="Flu"
          classification="Infectious"
          severity="Mild"
          symptoms={["Fever", "Cough", "Headache"]}
          description="The flu, or influenza, is a highly contagious viral respiratory illness causing symptoms like fever, cough, muscle aches, fatigue, and a runny nose. It is spread through respiratory droplets from coughs and sneezes and can range from mild to severe, sometimes leading to life-threatening complications. Prevention includes the annual flu vaccine, good hygiene, and staying home when sick"
          />
        <Disease
          diseaseName="Flu"
          classification="Infectious"
          severity="Mild"
          symptoms={["Fever", "Cough", "Headache"]}
          description="The flu, or influenza, is a highly contagious viral respiratory illness causing symptoms like fever, cough, muscle aches, fatigue, and a runny nose. It is spread through respiratory droplets from coughs and sneezes and can range from mild to severe, sometimes leading to life-threatening complications. Prevention includes the annual flu vaccine, good hygiene, and staying home when sick"
          />
    </div>
  );
};

export default RightSidebar;