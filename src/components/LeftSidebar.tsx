import { useState, useEffect } from "react";
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

interface ModalConfig {
  title: string;
  message: string;
  confirmText: string;
  inputValue?: string;
  onConfirm?: (value: string) => void;
  showCancel?: boolean;
}

const LeftSidebar = ({ addNode, nodes, loadNodes }: LeftSidebarProps) => {
  const [symptomList] = useState(() => {
    const list = new LinkedList();
    list.append("Abdominal Pain");
    list.append("Anxiety");
    list.append("Back Pain");
    list.append("Blood in Urine");
    list.append("Chest Pain");
    list.append("Chest Tightness");
    list.append("Chills");
    list.append("Confusion");
    list.append("Congestion");
    list.append("Constipation");
    list.append("Cough");
    list.append("Diarrhea");
    list.append("Difficulty Swallowing");
    list.append("Dizziness");
    list.append("Dry Eyes");
    list.append("Dry Mouth");
    list.append("Facial Pain");
    list.append("Fatigue");
    list.append("Fever");
    list.append("Headache");
    list.append("Heart Palpitations");
    list.append("Itching");
    list.append("Joint Pain");
    list.append("Loss of Appetite");
    list.append("Loss of Taste");
    list.append("Loss of Smell");
    list.append("Memory Loss");
    list.append("Muscle Pain");
    list.append("Nausea");
    list.append("Night Sweats");
    list.append("Numbness");
    list.append("Rash");
    list.append("Runny Nose");
    list.append("Seizures");
    list.append("Shortness of Breath");
    list.append("Skin Lesions");
    list.append("Sneezing");
    list.append("Sore Throat");
    list.append("Swollen Lymph Nodes");
    list.append("Tremors");
    list.append("Vomiting");
    list.append("Weakness");
    list.append("Weight Loss");
    list.append("Wheezing");
    return list;
  });

  const [allSymptoms, setAllSymptoms] = useState<string[]>(symptomList.toArray().sort((a, b) => a.localeCompare(b)));
  const [symptomSearch, setSymptomSearch] = useState<string>("");
  const [leftSidebar, setLeftSidebar] = useState("Nodes");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
  });
  const [patientSearch, setPatientSearch] = useState<string>("");
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [modifiedFiles, setModifiedFiles] = useState<Record<string, boolean>>({});
  const [currentPatient, setCurrentPatient] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  // Initialize patientFiles from localStorage or default
  const [patientFiles, setPatientFiles] = useState<Record<string, { fileName: string; nodes: NodeType[]; modified?: boolean }[]>>(() => {
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

  // Symptom metadata
  const [symptomMetadata, setSymptomMetadata] = useState<Record<string, { severity: string; classification: string; section: string }>>({
    "Abdominal Pain": { severity: "Medium", classification: "Infectious", section: "Gastrointestinal" },
    "Anxiety": { severity: "Medium", classification: "Chronic", section: "Neurological" },
    "Back Pain": { severity: "Medium", classification: "Chronic", section: "Musculoskeletal" },
    "Blood in Urine": { severity: "High", classification: "Chronic", section: "Urological" },
    "Chest Pain": { severity: "High", classification: "Chronic", section: "Cardiovascular" },
    "Chest Tightness": { severity: "Medium", classification: "Chronic", section: "Respiratory" },
    "Chills": { severity: "Medium", classification: "Infectious", section: "Systemic" },
    "Confusion": { severity: "High", classification: "Chronic", section: "Neurological" },
    "Congestion": { severity: "Low", classification: "Allergic", section: "Respiratory" },
    "Constipation": { severity: "Low", classification: "Chronic", section: "Gastrointestinal" },
    "Cough": { severity: "Medium", classification: "Infectious", section: "Respiratory" },
    "Diarrhea": { severity: "Medium", classification: "Infectious", section: "Gastrointestinal" },
    "Difficulty Swallowing": { severity: "Medium", classification: "Chronic", section: "Gastrointestinal" },
    "Dizziness": { severity: "Medium", classification: "Chronic", section: "Neurological" },
    "Dry Eyes": { severity: "Low", classification: "Chronic", section: "Ophthalmological" },
    "Dry Mouth": { severity: "Low", classification: "Chronic", section: "Head" },
    "Facial Pain": { severity: "Low", classification: "Chronic", section: "Head" },
    "Fatigue": { severity: "Medium", classification: "Chronic", section: "Systemic" },
    "Fever": { severity: "High", classification: "Infectious", section: "Systemic" },
    "Headache": { severity: "Medium", classification: "Chronic", section: "Neurological" },
    "Heart Palpitations": { severity: "High", classification: "Chronic", section: "Cardiovascular" },
    "Itching": { severity: "Low", classification: "Allergic", section: "Immune System" },
    "Joint Pain": { severity: "Medium", classification: "Chronic", section: "Musculoskeletal" },
    "Loss of Appetite": { severity: "Medium", classification: "Chronic", section: "Systemic" },
    "Loss of Taste": { severity: "Medium", classification: "Infectious", section: "Systemic" },
    "Loss of Smell": { severity: "Medium", classification: "Infectious", section: "Systemic" },
    "Memory Loss": { severity: "High", classification: "Chronic", section: "Neurological" },
    "Muscle Pain": { severity: "Medium", classification: "Chronic", section: "Musculoskeletal" },
    "Nausea": { severity: "Medium", classification: "Infectious", section: "Gastrointestinal" },
    "Night Sweats": { severity: "Medium", classification: "Infectious", section: "Systemic" },
    "Numbness": { severity: "High", classification: "Chronic", section: "Neurological" },
    "Rash": { severity: "Low", classification: "Allergic", section: "Immune System" },
    "Runny Nose": { severity: "Low", classification: "Allergic", section: "Respiratory" },
    "Seizures": { severity: "High", classification: "Chronic", section: "Neurological" },
    "Shortness of Breath": { severity: "High", classification: "Chronic", section: "Respiratory" },
    "Skin Lesions": { severity: "Medium", classification: "Chronic", section: "Immune System" },
    "Sneezing": { severity: "Low", classification: "Allergic", section: "Respiratory" },
    "Sore Throat": { severity: "Medium", classification: "Infectious", section: "Respiratory" },
    "Swollen Lymph Nodes": { severity: "Medium", classification: "Infectious", section: "Immune System" },
    "Tremors": { severity: "High", classification: "Chronic", section: "Neurological" },
    "Vomiting": { severity: "Medium", classification: "Infectious", section: "Gastrointestinal" },
    "Weakness": { severity: "Medium", classification: "Chronic", section: "Systemic" },
    "Weight Loss": { severity: "High", classification: "Chronic", section: "Systemic" },
    "Wheezing": { severity: "Medium", classification: "Chronic", section: "Respiratory" },
  });

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
  }, {} as Record<string, { fileName: string; nodes: NodeType[]; modified?: boolean }[]>);

  // Track changes to nodes to mark files as modified
  useEffect(() => {
    if (nodes.length > 0 && currentPatient && currentFile) {
      setModifiedFiles((prev) => ({
        ...prev,
        [`${currentPatient}-${currentFile}`]: true,
      }));
    }
  }, [nodes, currentPatient, currentFile]);

  // HANDLE: ADD PATIENT
  const handleAddPatient = () => {
    setModalConfig({
      title: "Add Patient",
      message: "Enter patient name:",
      confirmText: "Add",
      inputValue: "",
      showCancel: true,
      onConfirm: (patientName: string) => {
        if (!patientName.trim()) {
          setModalConfig({
            title: "Error",
            message: "Please enter a patient name.",
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        if (patientFiles[patientName]) {
          setModalConfig({
            title: "Error",
            message: "Patient name already exists.",
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        const newFiles = [{ fileName: `${patientName}_F1.ndg`, nodes: [] }];
        setPatientFiles((prev) => {
          const updated = { ...prev, [patientName]: newFiles };
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        setModalConfig({
          title: "Patient Added",
          message: `Patient ${patientName} was successfully added!`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
  };

  // HANDLE: DELETE PATIENT
  const handleDeletePatient = (patient: string) => {
    setModalConfig({
      title: "Delete Patient",
      message: `Are you sure you want to delete ${patient} and all associated files?`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: () => {
        setPatientFiles((prev) => {
          const updated = { ...prev };
          delete updated[patient];
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        if (currentPatient === patient) {
          setCurrentPatient(null);
          setCurrentFile(null);
          loadNodes([]);
        }
        setModalConfig({
          title: "Patient Deleted",
          message: `Patient ${patient} was successfully deleted.`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
  };

  // HANDLE: DELETE NODE
  const handleDeleteNode = (nodeId: string) => {
    if (!currentPatient || !currentFile) {
      setModalConfig({
        title: "Error",
        message: "No file is currently loaded. Please load a file to delete nodes.",
        confirmText: "OK",
        showCancel: false,
      });
      setIsModalOpen(true);
      return;
    }
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    setModalConfig({
      title: "Delete Node",
      message: `Are you sure you want to delete the node "${node.value}"?`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: () => {
        const updatedNodes = nodes.filter((n) => n.id !== nodeId);
        setPatientFiles((prev) => {
          const newFiles = prev[currentPatient].map((file) =>
            file.fileName === currentFile ? { ...file, nodes: updatedNodes } : file
          );
          const updatedPatientFiles = { ...prev, [currentPatient]: newFiles };
          localStorage.setItem("patientFiles", JSON.stringify(updatedPatientFiles));
          return updatedPatientFiles;
        });
        loadNodes(updatedNodes);
        setModifiedFiles((prev) => ({
          ...prev,
          [`${currentPatient}-${currentFile}`]: true,
        }));
        setModalConfig({
          title: "Node Deleted",
          message: `Node "${node.value}" was successfully deleted.`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
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
        setCurrentPatient(patient);
        setCurrentFile(fileName);
        setModalConfig({
          title: "File Loaded",
          message: `Loaded ${fileName} for ${patient}.`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      } else {
        console.error(`File ${fileName} not found for ${patient}`);
        setModalConfig({
          title: "Error",
          message: `File ${fileName} not found for ${patient}.`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(`Error loading ${fileName} for ${patient}:`, error);
      setModalConfig({
        title: "Error",
        message: `Failed to load ${fileName} for ${patient}.`,
        confirmText: "OK",
        showCancel: false,
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
        showCancel: false,
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
      showCancel: true,
      onConfirm: (fileName: string) => {
        if (!fileName.trim()) {
          setModalConfig({
            title: "Error",
            message: "Please enter a file name.",
            confirmText: "OK",
            showCancel: false,
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
            showCancel: false,
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
          showCancel: false,
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
  };

  // HANDLE: SAVE FILE
  const handleSaveFile = () => {
    if (!currentPatient || !currentFile) {
      setModalConfig({
        title: "Error",
        message: "No file is currently loaded. Please load a file before saving.",
        confirmText: "OK",
        showCancel: false,
      });
      setIsModalOpen(true);
      return;
    }
    setPatientFiles((prev) => {
      const newFiles = [
        ...(prev[currentPatient] || []).filter((f) => f.fileName !== currentFile),
        { fileName: currentFile, nodes: nodes.map((n) => ({ ...n })), modified: false },
      ];
      const updatedPatientFiles = {
        ...prev,
        [currentPatient]: newFiles,
      };
      console.log(`Saving file ${currentFile} for ${currentPatient}:`, updatedPatientFiles);
      localStorage.setItem("patientFiles", JSON.stringify(updatedPatientFiles));
      return updatedPatientFiles;
    });
    setModifiedFiles((prev) => ({
      ...prev,
      [`${currentPatient}-${currentFile}`]: false,
    }));
    setModalConfig({
      title: "File Saved",
      message: `Saved ${currentFile} for ${currentPatient}.`,
      confirmText: "OK",
      showCancel: false,
    });
    setIsModalOpen(true);
  };

  // HANDLE: ADD SYMPTOM NODE
  const addSymptomNode = (value: string = "Custom Symptom") => {
    if (value === "Custom Symptom") {
      setModalConfig({
        title: "Add Custom Symptom",
        message: "Enter custom symptom name:",
        confirmText: "Add",
        inputValue: "",
        showCancel: true,
        onConfirm: (customSymptom: string) => {
          if (!customSymptom.trim()) {
            setModalConfig({
              title: "Error",
              message: "Please enter a symptom name.",
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
            return;
          }
          if (allSymptoms.includes(customSymptom)) {
            setModalConfig({
              title: "Error",
              message: "Symptom already exists.",
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
            return;
          }
          setAllSymptoms((prev) => {
            const updated = [...prev, customSymptom].sort((a, b) => a.localeCompare(b));
            return updated;
          });
          setSymptomMetadata((prev) => ({
            ...prev,
            [customSymptom]: { severity: "Low", classification: "Infectious", section: "Other" },
          }));
          const success = addNode(
            customSymptom,
            `${customSymptom}-${Date.now()}`,
            "Low",
            "Infectious"
          );
          if (success) {
            setModalConfig({
              title: "Symptom Added",
              message: `Custom symptom "${customSymptom}" was successfully added!`,
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
            if (currentPatient && currentFile) {
              setModifiedFiles((prev) => ({
                ...prev,
                [`${currentPatient}-${currentFile}`]: true,
              }));
            }
          }
        },
      });
      setIsModalOpen(true);
    } else {
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
          message: `Symptom "${value}" was successfully added!`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
        if (currentPatient && currentFile) {
          setModifiedFiles((prev) => ({
            ...prev,
            [`${currentPatient}-${currentFile}`]: true,
          }));
        }
      }
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
        showCancel={modalConfig.showCancel}
      />
      <div
        className={`flex flex-col gap-4 p-10 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg h-screen ${
          sidebarVisibility ? "" : "px-1 py-4"
        }`}
      >
        {/* HEADERS */}
        <div className={`flex justify-between ${sidebarVisibility ? "" : "justify-center"}`}>
          {sidebarVisibility && <img className="w-8" src="symptomatik-black-logo.svg" />}
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
          <div className="flex flex-col gap-4">
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
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {Object.keys(filteredFiles).length > 0 ? (
                Object.entries(filteredFiles).map(([patient, files]) => (
                  <div key={patient} className="rounded p-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFolder(patient)}
                        className="cursor-pointer flex items-center gap-2 flex-1 text-left"
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
                      <button
                        className="cursor-pointer text-[var(--trust-blue)] hover:text-red-700 font-bold"
                        onClick={() => handleDeletePatient(patient)}
                      >
                        X
                      </button>
                    </div>
                    {openFolders[patient] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {files.map((file, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] hover:text-[var(---dark-navy)] cursor-pointer p-2 rounded ${
                              hoveredFile === `${patient}-${file.fileName}` ? "bg-gray-200" : ""
                            }`}
                            onClick={() => handleLoadFile(patient, file.fileName)}
                            onMouseEnter={() => setHoveredFile(`${patient}-${file.fileName}`)}
                            onMouseLeave={() => setHoveredFile(null)}
                          >
                            <img className="w-5" src="symptom-file-icon.svg" />
                            {file.fileName}
                            {modifiedFiles[`${patient}-${file.fileName}`] && <span className="ml-1">*</span>}
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold text-[var(--trust-blue)]">Symptoms</h3>
              <button
                className="cursor-pointer"
                onClick={() => addSymptomNode()}
              >
                <img className="w-6" src="add-icon.svg" />
              </button>
            </div>
            <input
              className="shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none w-full rounded-full px-4 py-2"
              type="text"
              placeholder="Search symptoms..."
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
            />
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
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
                              className="flex items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] hover:text-[var(---dark-navy)] cursor-pointer p-2 rounded select-none"
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
              {/* LOADED NODES */}
              {currentFile && currentPatient && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[var(--trust-blue)]">Loaded Nodes</h3>
                  {nodes.length > 0 ? (
                    <div className="mt-2 space-y-1">
                      {nodes.map((node) => (
                        <div
                          key={node.id}
                          className="flex items-center justify-between text-sm font-semibold text-[var(--trust-blue)] p-2 rounded"
                        >
                          <span>{node.value}</span>
                          <button
                            className="cursor-pointer text-red-500 hover:text-red-700 font-bold"
                            onClick={() => handleDeleteNode(node.id)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      No nodes loaded for the current file.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeftSidebar;