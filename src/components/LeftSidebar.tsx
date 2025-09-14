import { useState } from "react";
import Styles from "../styles/Styles.js";
import LinkedList from "../logic/LinkedList.js";
import Modal from "./Modal.tsx";

type NodeType = {
  id: string;
  value: string;
  x: number;
  y: number;
  severity: "Low" | "Medium" | "High";
  classification: "Infectious" | "Allergic" | "Chronic";
};

type LeftSidebarProps = {
  addNode: (value: string, id: string, severity: string, classification: string) => boolean;
  nodes: NodeType[];
  loadNodes: (nodes: NodeType[]) => void;
};

const LeftSidebar = ({ addNode, nodes, loadNodes }: LeftSidebarProps) => {
  const list = new LinkedList();
  list.append("Abdominal Pain");
  list.append("Chest Tightness");
  list.append("Chills");
  list.append("Congestion");
  list.append("Cough");
  list.append("Diarrhea");
  list.append("Facial Pain");
  list.append("Fatigue");
  list.append("Fever");
  list.append("Headache");
  list.append("Itching");
  list.append("Loss of Taste");
  list.append("Muscle Pain");
  list.append("Nausea");
  list.append("Rash");
  list.append("Runny Nose");
  list.append("Shortness of Breath");
  list.append("Sneezing");
  list.append("Sore Throat");
  list.append("Vomiting");
  list.append("Wheezing");

  const allSymptoms = list.toArray().sort((a, b) => a.localeCompare(b));
  const [symptomsFilter, setSymptomsFilter] = useState<string>("All");
  const [leftSidebar, setLeftSidebar] = useState("Nodes");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    confirmText: string;
  }>({ title: "", message: "", confirmText: "OK" });
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [newPatientName, setNewPatientName] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");

  // Track which patient folders and symptom sections are expanded
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  // Patient files with node data
  const [patientFiles, setPatientFiles] = useState<Record<string, { fileName: string; nodes: NodeType[] }[]>>({
    Adam: [{ fileName: "F1.ndg", nodes: [] }],
    Bob: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }],
    Charlie: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }, { fileName: "F3.ndg", nodes: [] }],
  });

  // Sample severity, classification, and section for symptoms
  const symptomMetadata: Record<
    string,
    { severity: string; classification: string; section: string }
  > = {
    "Abdominal Pain": {
      severity: "Medium",
      classification: "Infectious",
      section: "Gastrointestinal",
    },
    "Chest Tightness": {
      severity: "Medium",
      classification: "Chronic",
      section: "Respiratory",
    },
    "Chills": {
      severity: "Medium",
      classification: "Infectious",
      section: "Systemic",
    },
    "Congestion": {
      severity: "Low",
      classification: "Allergic",
      section: "Head",
    },
    "Cough": {
      severity: "Medium",
      classification: "Infectious",
      section: "Respiratory",
    },
    "Diarrhea": {
      severity: "Medium",
      classification: "Infectious",
      section: "Gastrointestinal",
    },
    "Facial Pain": {
      severity: "Low",
      classification: "Chronic",
      section: "Head",
    },
    "Fatigue": {
      severity: "Medium",
      classification: "Chronic",
      section: "Systemic",
    },
    "Fever": {
      severity: "High",
      classification: "Infectious",
      section: "Systemic",
    },
    "Headache": {
      severity: "Medium",
      classification: "Chronic",
      section: "Head",
    },
    "Itching": {
      severity: "Low",
      classification: "Allergic",
      section: "Immune System",
    },
    "Loss of Taste": {
      severity: "Medium",
      classification: "Infectious",
      section: "Systemic",
    },
    "Muscle Pain": {
      severity: "Medium",
      classification: "Chronic",
      section: "Musculoskeletal",
    },
    "Nausea": {
      severity: "Medium",
      classification: "Infectious",
      section: "Gastrointestinal",
    },
    "Rash": {
      severity: "Low",
      classification: "Allergic",
      section: "Immune System",
    },
    "Runny Nose": {
      severity: "Low",
      classification: "Allergic",
      section: "Head",
    },
    "Shortness of Breath": {
      severity: "Medium",
      classification: "Chronic",
      section: "Respiratory",
    },
    "Sneezing": {
      severity: "Low",
      classification: "Allergic",
      section: "Immune System",
    },
    "Sore Throat": {
      severity: "Medium",
      classification: "Infectious",
      section: "Head",
    },
    "Vomiting": {
      severity: "Medium",
      classification: "Infectious",
      section: "Gastrointestinal",
    },
    "Wheezing": {
      severity: "Medium",
      classification: "Chronic",
      section: "Respiratory",
    },
  };

  // Group symptoms by section
  const symptomsBySection = allSymptoms.reduce((acc, symptom) => {
    const section = symptomMetadata[symptom]?.section || "Other";
    if (!acc[section]) acc[section] = [];
    acc[section].push(symptom);
    return acc;
  }, {} as Record<string, string[]>);

  // Available sections for filtering
  const sections = ["All", ...Object.keys(symptomsBySection).sort()];

  // Filter symptoms based on selected section
  const filteredSections =
    symptomsFilter === "All"
      ? symptomsBySection
      : { [symptomsFilter]: symptomsBySection[symptomsFilter] || [] };

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleLeftSidebar = () => {
    setSidebarVisibility((prev) => !prev);
  };

  // HANDLE: ADD PATIENT
  const handleAddPatient = () => {
    if (newPatientName.trim() && !patientFiles[newPatientName]) {
      setPatientFiles((prev) => ({
        ...prev,
        [newPatientName]: [{ fileName: `${newPatientName}_F1.ndg`, nodes: [] }],
      }));
      setNewPatientName("");
      setModalConfig({
        title: "Patient Added",
        message: `Patient ${newPatientName} was successfully added!`,
        confirmText: "OK",
      });
      setIsModalOpen(true);
    } else {
      setModalConfig({
        title: "Error",
        message: "Please enter a unique patient name.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
    }
  };

  // HANDLE: LOAD FILE
  const handleLoadFile = (patient: string, fileName: string) => {
    const file = patientFiles[patient]?.find((f) => f.fileName === fileName);
    if (file) {
      loadNodes(file.nodes);
      setModalConfig({
        title: "File Loaded",
        message: `Loaded ${fileName} for ${patient}.`,
        confirmText: "OK",
      });
      setIsModalOpen(true);
    }
  };

  // HANDLE: SAVE FILE
  const handleSaveFile = () => {
    if (!selectedPatient || !newFileName.trim()) {
      setModalConfig({
        title: "Error",
        message: "Please select a patient and enter a file name.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
      return;
    }
    const fileName = newFileName.endsWith(".ndg") ? newFileName : `${newFileName}.ndg`;
    setPatientFiles((prev) => ({
      ...prev,
      [selectedPatient]: [
        ...(prev[selectedPatient] || []).filter((f) => f.fileName !== fileName),
        { fileName, nodes: nodes.map((n) => ({ ...n })) },
      ],
    }));
    // Save to localStorage (simulating file storage)
    localStorage.setItem(
      "patientFiles",
      JSON.stringify({
        ...patientFiles,
        [selectedPatient]: [
          ...(patientFiles[selectedPatient] || []).filter((f) => f.fileName !== fileName),
          { fileName, nodes },
        ],
      })
    );
    setNewFileName("");
    setModalConfig({
      title: "File Saved",
      message: `Saved ${fileName} for ${selectedPatient}.`,
      confirmText: "OK",
    });
    setIsModalOpen(true);
  };

  // HANDLE: ADD FILE
  const handleAddFile = () => {
    if (!selectedPatient || !newFileName.trim()) {
      setModalConfig({
        title: "Error",
        message: "Please select a patient and enter a file name.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
      return;
    }
    const fileName = newFileName.endsWith(".ndg") ? newFileName : `${newFileName}.ndg`;
    if (patientFiles[selectedPatient]?.some((f) => f.fileName === fileName)) {
      setModalConfig({
        title: "Error",
        message: "File name already exists for this patient.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
      return;
    }
    setPatientFiles((prev) => ({
      ...prev,
      [selectedPatient]: [...(prev[selectedPatient] || []), { fileName, nodes: [] }],
    }));
    setNewFileName("");
    setModalConfig({
      title: "File Added",
      message: `Added ${fileName} for ${selectedPatient}.`,
      confirmText: "OK",
    });
    setIsModalOpen(true);
  };

  const addSymptomNode = (value: string) => {
    const metadata = symptomMetadata[value] || {
      severity: "Low",
      classification: "Infectious",
      section: "Other",
    };
    const success = addNode(
      value,
      `${value}-${Date.now()}`,
      metadata.severity,
      metadata.classification
    );
    if (success) {
      setModalConfig({
        title: "Symptom Added",
        message: "Your symptom node was successfully added!",
        confirmText: "OK",
      });
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
      />
      <div
        className={`flex flex-col gap-4 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg h-screen ${
          sidebarVisibility ? "" : "px-1 py-4"
        }`}
      >
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
              className={
                leftSidebar === "File"
                  ? Styles.smSquareButtonStyle
                  : Styles.smSquareButtonOutlineStyle
              }
              onClick={() => setLeftSidebar("File")}
            >
              File
            </button>
            <button
              type="button"
              className={
                leftSidebar === "Nodes"
                  ? Styles.smSquareButtonStyle
                  : Styles.smSquareButtonOutlineStyle
              }
              onClick={() => setLeftSidebar("Nodes")}
            >
              Nodes
            </button>
          </div>
        )}
        {/* PANEL: FILE */}
        {sidebarVisibility && leftSidebar === "File" && (
          <div>
            {/* SEARCH BAR AND PATIENT INPUT */}
            <input
              className="shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none w-full rounded-full mb-4 px-4 py-2"
              type="text"
              placeholder="Enter patient name..."
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
            />
            {/* MINI-HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-[var(--trust-blue)]">
                Patient Records
              </h3>
              <div className="flex gap-2">
                <button className="cursor-pointer" onClick={handleAddPatient}>
                  <img className="w-6" src="add-patient-icon.svg" />
                </button>
                <button className="cursor-pointer" onClick={handleAddFile}>
                  <img className="w-6" src="add-file-icon.svg" />
                </button>
                <button className="cursor-pointer" onClick={handleSaveFile}>
                  <img className="w-6" src="save-icon.svg" />
                </button>
              </div>
            </div>
            {/* PATIENT SELECTION FOR SAVE/ADD FILE */}
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="h-8 px-2 rounded text-sm text-gray-600 bg-white shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] mb-4 w-full"
            >
              <option value="">Select a patient</option>
              {Object.keys(patientFiles).map((patient) => (
                <option key={patient} value={patient}>
                  {patient}
                </option>
              ))}
            </select>
            <input
              className="shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none w-full rounded-full mb-4 px-4 py-2"
              type="text"
              placeholder="Enter file name (.ndg)"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            {/* PATIENT FILES */}
            <div className="mt-4">
              {Object.entries(patientFiles).map(([patient, files]) => (
                <div key={patient} className="rounded p-2">
                  <button
                    onClick={() => toggleFolder(patient)}
                    className="cursor-pointer flex items-center gap-2 w-full text-left"
                  >
                    <img
                      className="w-6"
                      src={openFolders[patient] ? "arrow-down.svg" : "arrow-right.svg"}
                    />
                    <span>
                      <img className="w-7" src="patient-icon.svg" />
                    </span>
                    <span className={Styles.subheaderStyle}>{patient}</span>
                  </button>
                  {openFolders[patient] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] hover:text-[var(--dark-navy)] cursor-pointer"
                          onClick={() => handleLoadFile(patient, file.fileName)}
                        >
                          <img className="w-5" src="symptom-file-icon.svg" />
                          {file.fileName}
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
                <button
                  className="cursor-pointer"
                  onClick={() => addSymptomNode("Custom Symptom")}
                >
                  <img className="w-6" src="add-icon.svg" />
                </button>
              </div>
              <select
                value={symptomsFilter}
                onChange={(e) => setSymptomsFilter(e.target.value)}
                className="h-8 px-2 rounded text-sm text-gray-600 bg-white shadow-[0_0_4px_1px_rgba(0,0,0,0.1)]"
              >
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                {Object.entries(filteredSections).map(([section, symptoms]) => (
                  <div key={section} className="rounded p-2">
                    <button
                      onClick={() => toggleFolder(section)}
                      className="cursor-pointer flex items-center gap-2 w-full text-left"
                    >
                      <img
                        className="w-6"
                        src={openFolders[section] ? "arrow-down.svg" : "arrow-right.svg"}
                      />
                      <span className={Styles.subheaderStyle}>{section}</span>
                    </button>
                    {openFolders[section] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {symptoms.map((value, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] hover:text-[var(--dark-navy)] cursor-pointer p-2 rounded select-none"
                            onClick={() => addSymptomNode(value)}
                          >
                            <img className="w-5" src="symptom-file-icon.svg" />
                            {value}
                          </div>
                        ))}
                      </div>
                    )}
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