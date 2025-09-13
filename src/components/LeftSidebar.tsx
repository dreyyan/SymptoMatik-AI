import { useState } from "react";
import Styles from "../styles/Styles.js";
import LinkedList from "../logic/LinkedList.js";

// Components
import Modal from "./Modal.tsx";

type LeftSidebarProps = {
  addNode: (value: string, id: string, severity: string, classification: string) => void;
};

const LeftSidebar = ({ addNode }: LeftSidebarProps) => {
  const list = new LinkedList();
  list.append("Fever");
  list.append("Cough");
  list.append("Rash");

  const [symptoms, setSymptoms] = useState<string[]>(list.toArray());
  const [leftSidebar, setLeftSidebar] = useState("Nodes");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track which patient folders are expanded
  const [openFolders, setOpenFolders] = useState({});

  // PATIENT FILES
  let patientFiles = {
    Adam: ["F1.ndg"],
    Bob: ["F1.ndg", "F2.ndg"],
    Charlie: ["F1.ndg", "F2.ndg", "F3.ndg"],
  };

  // Sample severity and classification for symptoms
  const symptomMetadata: Record<string, { severity: string; classification: string }> = {
    Fever: { severity: "High", classification: "Infectious" },
    Cough: { severity: "Medium", classification: "Infectious" },
    Rash: { severity: "Low", classification: "Allergic" },
  };

  const toggleFolder = (patient: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [patient]: !prev[patient], // toggle open/close
    }));
  };

  const toggleLeftSidebar = () => {
    setSidebarVisibility((prev) => !prev);
  };

  // HANDLE: ADD PATIENT
  const handleAddPatient = () => {};
  const addSymptomNode = () => {
    setIsModalOpen(true);
  };

  return (
    <>
    <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Symptom Added"
        message="Your symptom node was successfully added!"
        confirmText="OK"
      />
    <div
      className={`flex flex-col gap-4 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg h-screen ${
        sidebarVisibility ? "" : "px-1 py-4"
      }`}>
      {/* HEADERS */}
      <div className={`flex justify-between ${sidebarVisibility ? "" : "justify-center"}`}>
        {sidebarVisibility && <img className="w-8" src="symptomatik-black-logo.svg" />}
        <button onClick={toggleLeftSidebar}>
          <img className="w-8 cursor-pointer" src="dock-to-right-icon.svg" />
        </button>
      </div>
      {/* BUTTONS: FILE & NODES */}
      {sidebarVisibility && (
        <div className="flex gap-2">
          <button
            type="button"
            className={leftSidebar === "File" ? Styles.smSquareButtonStyle : Styles.smSquareButtonOutlineStyle}
            onClick={() => setLeftSidebar("File")}
          >
            File
          </button>
          <button
            type="button"
            className={leftSidebar === "Nodes" ? Styles.smSquareButtonStyle : Styles.smSquareButtonOutlineStyle}
            onClick={() => setLeftSidebar("Nodes")}
          >
            Nodes
          </button>
        </div>
      )}
      {/* PANEL: FILE */}
      {sidebarVisibility && leftSidebar === "File" && (
        <div>
          {/* SEARCH BAR */}
          <input
            className="shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none w-full rounded-full mb-4 px-4 py-2"
            type="text"
            placeholder="Enter patient name..."
          />
          {/* MINI-HEADER */}
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold text-[var(--trust-blue)]">Patient Records</h3>
            <button className="cursor-pointer" onClick={handleAddPatient}>
              <img className="w-6" src="add-patient-icon.svg" />
            </button>
          </div>
          {/* PATIENT FILES */}
          <div className="mt-4">
            {Object.entries(patientFiles).map(([patient, files]) => (
              <div key={patient} className="rounded p-2">
                {/* Folder Button */}
                <button
                  onClick={() => toggleFolder(patient)}
                  className="cursor-pointer flex items-center gap-2 w-full text-left"
                >
                  <img className="w-6" src={openFolders[patient] ? "arrow-down.svg" : "arrow-right.svg"} />
                  <span>
                    <img className="w-7" src="patient-icon.svg" />
                  </span>
                  <span className={Styles.subheaderStyle}>{patient}</span>
                </button>
                {/* Expand/Collapse Files */}
                {openFolders[patient] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] hover:text-[var(--dark-navy)] cursor-pointer"
                      >
                        <img className="w-5" src="symptom-file-icon.svg" /> {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* PANEL: NODES */}
      {sidebarVisibility && leftSidebar === "Nodes" && (
        <div className="w-full">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold text-[var(--trust-blue)]">Symptoms</h3>
              <button className="cursor-pointer" onClick={addSymptomNode}>
                <img className="w-6" src="add-icon.svg" />
              </button>
            </div>
            <div className="mt-4">
              {symptoms.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] hover:text-[var(--dark-navy)] cursor-pointer p-2 rounded select-none"
                  onClick={() =>
                    addNode(
                      value,
                      `${value}-${Date.now()}`,
                      symptomMetadata[value].severity,
                      symptomMetadata[value].classification
                    )
                  }
                >
                  <img className="w-5" src="symptom-file-icon.svg" />
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default LeftSidebar;