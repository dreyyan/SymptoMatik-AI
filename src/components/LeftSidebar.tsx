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
  const [symptomSearch, setSymptomSearch] = useState<string>("");
  const [leftSidebar, setLeftSidebar] = useState("Nodes");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    confirmText: string;
    inputValue?: string;
    onConfirm?: (value: string) => void;
  }>({ title: "", message: "", confirmText: "OK" });
  const [patientSearch, setPatientSearch] = useState<string>("");
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  // Initialize patientFiles from localStorage or default
  const [patientFiles, setPatientFiles] = useState<Record<string, { fileName: string; nodes: NodeType[] }[]>>(() => {
    try {
      const saved = localStorage.getItem("patientFiles");
      return saved
        ? JSON.parse(saved)
        : {
            Adam: [{ fileName: "F1.ndg", nodes: [] }],
            Bob: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }],
            Charlie: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }, { fileName: "F3.ndg", nodes: [] }],
          };
    } catch (error) {
      console.error("Error parsing patientFiles from localStorage:", error);
      return {
        Adam: [{ fileName: "F1.ndg", nodes: [] }],
        Bob: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }],
        Charlie: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }, { fileName: "F3.ndg", nodes: [] }],
      };
    }
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

  // Filter symptoms based on search input
  const filteredSymptomsBySection = Object.keys(symptomsBySection).reduce((acc, section) => {
    const symptoms = symptomsBySection[section].filter((symptom) =>
      symptom.toLowerCase().includes(symptomSearch.toLowerCase())
    );
    if (symptoms.length > 0) acc[section] = symptoms;
    return acc;
  }, {} as Record<string, string[]>);

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleLeftSidebar = () => {
    setSidebarVisibility((prev) => !prev);
  };

  // Filter patients and files based on search input
  const filteredPatients = Object.keys(patientFiles).filter(
    (patient) =>
      patient.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patientFiles[patient].some((file) =>
        file.fileName.toLowerCase().includes(patientSearch.toLowerCase())
      )
  );
  const filteredFiles = filteredPatients.reduce((acc, patient) => {
    const matchingFiles = patientFiles[patient].filter((file) =>
      file.fileName.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patient.toLowerCase().includes(patientSearch.toLowerCase())
    );
    if (matchingFiles.length > 0) acc[patient] = matchingFiles;
    return acc;
  }, {} as Record<string, { fileName: string; nodes: NodeType[] }[]>);

  // HANDLE: ADD PATIENT
  const handleAddPatient = () => {
    if (patientSearch.trim() && !patientFiles[patientSearch]) {
      const newFiles = [{ fileName: `${patientSearch}_F1.ndg`, nodes: [] }];
      setPatientFiles((prev) => {
        const updated = { ...prev, [patientSearch]: newFiles };
        localStorage.setItem("patientFiles", JSON.stringify(updated));
        return updated;
      });
      setPatientSearch("");
      setModalConfig({
        title: "Patient Added",
        message: `Patient ${patientSearch} was successfully added!`,
        confirmText: "OK",
      });
      setIsModalOpen(true);
    } else {
      setModalConfig({
        title: "Error",
        message: patientSearch.trim()
          ? "Patient name already exists."
          : "Please enter a patient name.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
    }
  };

  // HANDLE: LOAD FILE
  const handleLoadFile = (patient: string, fileName: string) => {
    try {
      const file = patientFiles[patient]?.find((f) => f.fileName === fileName);
      if (file) {
        const validNodes = Array.isArray(file.nodes)
          ? file.nodes.filter(
              (node) =>
                node &&
                typeof node.id === "string" &&
                typeof node.value === "string" &&
                typeof node.x === "number" &&
                typeof node.y === "number" &&
                ["Low", "Medium", "High"].includes(node.severity) &&
                ["Infectious", "Allergic", "Chronic"].includes(node.classification)
            )
          : [];
        console.log(`Loading ${fileName} for ${patient}:`, validNodes);
        loadNodes(validNodes);
        setModalConfig({
          title: "File Loaded",
          message: `Loaded ${fileName} for ${patient}.`,
          confirmText: "OK",
        });
        setIsModalOpen(true);
      } else {
        console.error(`File ${fileName} not found for ${patient}`);
        setModalConfig({
          title: "Error",
          message: `File ${fileName} not found for ${patient}.`,
          confirmText: "OK",
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(`Error loading ${fileName} for ${patient}:`, error);
      setModalConfig({
        title: "Error",
        message: `Failed to load ${fileName} for ${patient}.`,
        confirmText: "OK",
      });
      setIsModalOpen(true);
    }
  };

  // HANDLE: ADD FILE
  const handleAddFile = () => {
    if (!patientSearch.trim()) {
      setModalConfig({
        title: "Error",
        message: "Please enter a patient name in the search bar.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
      return;
    }
    const selectedPatient = filteredPatients.length === 1 && patientFiles[patientSearch] ? filteredPatients[0] : patientSearch.trim();
    setModalConfig({
      title: "Add File",
      message: `Enter file name for ${selectedPatient} (.ndg):`,
      confirmText: "Add",
      inputValue: "",
      onConfirm: (fileName: string) => {
        if (!fileName.trim()) {
          setModalConfig({
            title: "Error",
            message: "Please enter a file name.",
            confirmText: "OK",
          });
          setIsModalOpen(true);
          return;
        }
        const finalPatient = patientFiles[selectedPatient] ? selectedPatient : patientSearch.trim();
        const finalFileName = fileName.endsWith(".ndg") ? fileName : `${fileName}.ndg`;
        if (patientFiles[finalPatient]?.some((f) => f.fileName === finalFileName)) {
          setModalConfig({
            title: "Error",
            message: `File ${finalFileName} already exists for ${finalPatient}.`,
            confirmText: "OK",
          });
          setIsModalOpen(true);
          return;
        }
        setPatientFiles((prev) => {
          const newFiles = [...(prev[finalPatient] || []), { fileName: finalFileName, nodes: [] }];
          const updatedPatientFiles = {
            ...prev,
            [finalPatient]: newFiles,
          };
          console.log(`Adding file ${finalFileName} for ${finalPatient}:`, updatedPatientFiles);
          localStorage.setItem("patientFiles", JSON.stringify(updatedPatientFiles));
          return updatedPatientFiles;
        });
        setPatientSearch("");
        setModalConfig({
          title: "File Added",
          message: `Added ${finalFileName} for ${finalPatient}.`,
          confirmText: "OK",
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
  };

  // HANDLE: SAVE FILE
  const handleSaveFile = () => {
    if (!patientSearch.trim()) {
      setModalConfig({
        title: "Error",
        message: "Please enter a patient name in the search bar.",
        confirmText: "OK",
      });
      setIsModalOpen(true);
      return;
    }
    const selectedPatient = filteredPatients.length === 1 && patientFiles[patientSearch] ? filteredPatients[0] : patientSearch.trim();
    setModalConfig({
      title: "Save File",
      message: `Enter file name for ${selectedPatient} (.ndg):`,
      confirmText: "Save",
      inputValue: "",
      onConfirm: (fileName: string) => {
        if (!fileName.trim()) {
          setModalConfig({
            title: "Error",
            message: "Please enter a file name.",
            confirmText: "OK",
          });
          setIsModalOpen(true);
          return;
        }
        const finalPatient = patientFiles[selectedPatient] ? selectedPatient : patientSearch.trim();
        const finalFileName = fileName.endsWith(".ndg") ? fileName : `${fileName}.ndg`;
        setPatientFiles((prev) => {
          const newFiles = [
            ...(prev[finalPatient] || []).filter((f) => f.fileName !== finalFileName),
            { fileName: finalFileName, nodes: nodes.map((n) => ({ ...n })) },
          ];
          const updatedPatientFiles = {
            ...prev,
            [finalPatient]: newFiles,
          };
          console.log(`Saving file ${finalFileName} for ${finalPatient}:`, updatedPatientFiles);
          localStorage.setItem("patientFiles", JSON.stringify(updatedPatientFiles));
          return updatedPatientFiles;
        });
        setPatientSearch("");
        setModalConfig({
          title: "File Saved",
          message: `Saved ${finalFileName} for ${finalPatient}.`,
          confirmText: "OK",
        });
        setIsModalOpen(true);
      },
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
        inputValue={modalConfig.inputValue}
        onConfirm={modalConfig.onConfirm}
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
            {/* SEARCH BAR */}
            <input
              className="shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none w-full rounded-full mb-4 px-4 py-2"
              type="text"
              placeholder="Search patient or file..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
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
            {/* PATIENT FILES */}
            <div className="mt-4">
              {Object.keys(filteredFiles).length > 0 ? (
                Object.entries(filteredFiles).map(([patient, files]) => (
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
                ))
              ) : (
                <div className="text-sm text-gray-600">
                  No patients or files match your search.
                </div>
              )}
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
              <input
                className="shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none w-full rounded-full mb-4 px-4 py-2"
                type="text"
                placeholder="Search symptoms..."
                value={symptomSearch}
                onChange={(e) => setSymptomSearch(e.target.value)}
              />
              <div className="mt-4">
                {Object.keys(filteredSymptomsBySection).length > 0 ? (
                  Object.entries(filteredSymptomsBySection).map(([section, symptoms]) => (
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
                  ))
                ) : (
                  <div className="text-sm text-gray-600">
                    No symptoms match your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeftSidebar;