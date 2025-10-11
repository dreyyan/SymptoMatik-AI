import { useState, useEffect, useRef } from "react";
import Styles from "../styles/Styles.js";
import LinkedList from "../logic/LinkedList.ts";
import Modal from "./Modal.tsx";
import data from "../data/data.json";

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
  setCurrentPatient: (patient: string | null) => void;
  setCurrentFile: (file: string | null) => void;
  patientFiles: Record<string, { fileName: string; nodes: NodeType[]; modified?: boolean }[]>;
  setPatientFiles: React.Dispatch<React.SetStateAction<Record<string, { fileName: string; nodes: NodeType[]; modified?: boolean }[]>>>;
  modifiedFiles: Record<string, boolean>;
  setModifiedFiles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  currentPatient: string | null;
  currentFile: string | null;
};

interface ModalConfig {
  title: string;
  message: string;
  confirmText: string;
  inputValue?: string;
  onConfirm?: (value: string) => void;
  showCancel?: boolean;
}

const LeftSidebar = ({ addNode, nodes, loadNodes, setCurrentPatient, setCurrentFile, patientFiles, setPatientFiles, modifiedFiles, setModifiedFiles, currentPatient, currentFile }: LeftSidebarProps) => {
  const [symptomList] = useState<LinkedList<string>>(() => {
    const list = new LinkedList<string>();
    Object.keys(data.symptoms).forEach((symptom) => list.append(symptom));
    return list;
  });

  const [allSymptoms, setAllSymptoms] = useState<string[]>(symptomList.toArray().sort((a, b) => a.localeCompare(b)));
  const [symptomSearch, setSymptomSearch] = useState<string>("");
  const [leftSidebar, setLeftSidebar] = useState("File");
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
  const [symptomMetadata] = useState(data.symptoms);
  const [settingsMenuPatient, setSettingsMenuPatient] = useState<string | null>(null);
  const [settingsMenuFile, setSettingsMenuFile] = useState<string | null>(null);
  const settingsMenuRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = Object.values(settingsMenuRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (isOutside && (settingsMenuPatient || settingsMenuFile)) {
        console.log("Clicked outside, closing menus");
        setSettingsMenuPatient(null);
        setSettingsMenuFile(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsMenuPatient, settingsMenuFile]);

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
    console.log("Toggling folder for:", key);
    setOpenFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleLeftSidebar = () => {
    console.log("Toggling sidebar visibility");
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
      console.log("Marking file as modified:", `${currentPatient}-${currentFile}`);
      setModifiedFiles((prev) => ({
        ...prev,
        [`${currentPatient}-${currentFile}`]: true,
      }));
    }
  }, [nodes, currentPatient, currentFile, setModifiedFiles]);

  // Calculate dropdown menu position
  const getMenuPosition = (buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) {
      console.log("No button ref found for menu positioning");
      return { top: '0px', left: '0px', openUpward: false };
    }
    const rect = buttonRef.getBoundingClientRect();
    const menuHeight = 80; // Approximate height of the menu
    const viewportHeight = window.innerHeight;
    const openUpward = rect.bottom + menuHeight > viewportHeight;
    const menuTop = openUpward ? rect.top - menuHeight : rect.bottom;
    const menuLeft = rect.right - 100; // Adjust to align menu with button
    return {
      top: `${menuTop}px`,
      left: `${menuLeft}px`,
      openUpward,
    };
  };

  // HANDLE: ADD PATIENT
  const handleAddPatient = () => {
    console.log("Opening Add Patient modal");
    setModalConfig({
      title: "Add Patient",
      message: "",
      confirmText: "Add",
      inputValue: "",
      showCancel: true,
      onConfirm: (patientName: string) => {
        console.log("Adding patient:", patientName);
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
    console.log("Opening Delete Patient modal for:", patient);
    setModalConfig({
      title: "Delete Patient",
      message: `Are you sure you want to delete ${patient} and all associated files?`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: () => {
        console.log("Deleting patient:", patient);
        setPatientFiles((prev) => {
          const updated = { ...prev };
          delete updated[patient];
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        setModifiedFiles((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((key) => {
            if (key.startsWith(`${patient}-`)) {
              delete updated[key];
            }
          });
          return updated;
        });
        if (currentPatient === patient) {
          console.log("Clearing current patient and file");
          setCurrentPatient(null);
          setCurrentFile(null);
          loadNodes([]);
        }
        setOpenFolders((prev) => {
          const updated = { ...prev };
          delete updated[patient];
          return updated;
        });
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

  // HANDLE: RENAME PATIENT
// HANDLE: RENAME PATIENT
  const renamePatient = (patient: string) => {
    console.log("Opening Rename Patient modal for:", patient);
    setModalConfig({
      title: "Rename Patient",
      message: `Enter new name for ${patient}:`,
      confirmText: "Rename",
      inputValue: patient,
      showCancel: true,
      onConfirm: (newName: string) => {
        console.log("Renaming patient from", patient, "to", newName);
        if (!newName.trim()) {
          setModalConfig({
            title: "Error",
            message: "Please enter a valid patient name.",
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        if (newName === patient) {
          setIsModalOpen(false);
          return;
        }
        if (patientFiles[newName]) {
          setModalConfig({
            title: "Error",
            message: "A patient with this name already exists.",
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        
        // Update patient files
        setPatientFiles((prev) => {
          const updated = { ...prev };
          updated[newName] = updated[patient];
          delete updated[patient];
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        
        // Update modified files
        setModifiedFiles((prev) => {
          const updated = { ...prev };
          Object.keys(prev).forEach((key) => {
            if (key.startsWith(`${patient}-`)) {
              const newKey = `${newName}${key.substring(patient.length)}`;
              updated[newKey] = updated[key];
              delete updated[key];
            }
          });
          return updated;
        });
        
        // Update current patient if it's the one being renamed
        if (currentPatient === patient) {
          console.log("Updating current patient to:", newName);
          setCurrentPatient(newName);
        }
        
        // Update open folders state
        setOpenFolders((prev) => {
          const updated = { ...prev };
          if (prev[patient] !== undefined) {
            updated[newName] = prev[patient];
            delete updated[patient];
          }
          return updated;
        });
        
        setModalConfig({
          title: "Patient Renamed",
          message: `Patient ${patient} was successfully renamed to ${newName}.`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
  };

  // HANDLE: TOGGLE PATIENT SETTINGS
  const togglePatientSettings = (patient: string) => {
    console.log("Toggling patient settings for:", patient);
    setSettingsMenuPatient((prev) => {
      const newState = prev === patient ? null : patient;
      console.log("New settingsMenuPatient state:", newState);
      return newState;
    });
    setSettingsMenuFile(null);
  };

  // HANDLE: DELETE NODE
  const handleDeleteNode = (nodeId: string) => {
    console.log("Deleting node with ID:", nodeId);
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
  };

  // HANDLE: LOAD FILE
  const handleLoadFile = (patient: string, fileName: string) => {
    console.log("Loading file:", fileName, "for patient:", patient);
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
        console.log(`Loaded nodes for ${fileName}:`, validNodes);
        loadNodes(validNodes);
        setCurrentPatient(patient);
        setCurrentFile(fileName);
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
    console.log("Opening Add File modal, hoveredFile:", hoveredFile);
    if (hoveredFile) {
      const [patient] = hoveredFile.split("-");
      if (patientFiles[patient]) {
        setModalConfig({
          title: "Add File",
          message: `Enter file name for ${patient} (.ndg):`,
          confirmText: "Add",
          inputValue: "",
          showCancel: true,
          onConfirm: (fileName: string) => {
            console.log("Adding file:", fileName, "for patient:", patient);
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
            const finalFileName = fileName.endsWith(".ndg") ? fileName : `${fileName}.ndg`;
            if (patientFiles[patient].some((f) => f.fileName === finalFileName)) {
              setModalConfig({
                title: "Error",
                message: `File ${finalFileName} already exists for ${patient}.`,
                confirmText: "OK",
                showCancel: false,
              });
              setIsModalOpen(true);
              return;
            }
            setPatientFiles((prev) => {
              const updatedFiles = [...prev[patient], { fileName: finalFileName, nodes: [] }];
              const updated = { ...prev, [patient]: updatedFiles };
              localStorage.setItem("patientFiles", JSON.stringify(updated));
              return updated;
            });
            setModalConfig({
              title: "File Added",
              message: `File ${finalFileName} was successfully added to ${patient}.`,
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
          },
        });
        setIsModalOpen(true);
      } else {
        setModalConfig({
          title: "Add File",
          message: "Enter patient name and file name (Patient:FileName.ndg):",
          confirmText: "Add",
          inputValue: "",
          showCancel: true,
          onConfirm: (input: string) => {
            console.log("Adding file with input:", input);
            const [patient, fileName] = input.split(":");
            if (!patient || !fileName) {
              setModalConfig({
                title: "Error",
                message: "Invalid format. Use Patient:FileName.ndg",
                confirmText: "OK",
                showCancel: false,
              });
              setIsModalOpen(true);
              return;
            }
            const finalFileName = fileName.endsWith(".ndg") ? fileName : `${fileName}.ndg`;
            if (patientFiles[patient.trim()]) {
              if (patientFiles[patient.trim()].some((f) => f.fileName === finalFileName)) {
                setModalConfig({
                  title: "Error",
                  message: `File ${finalFileName} already exists for ${patient.trim()}.`,
                  confirmText: "OK",
                  showCancel: false,
                });
                setIsModalOpen(true);
                return;
              }
              setPatientFiles((prev) => {
                const updatedFiles = [...prev[patient.trim()], { fileName: finalFileName, nodes: [] }];
                const updated = { ...prev, [patient.trim()]: updatedFiles };
                localStorage.setItem("patientFiles", JSON.stringify(updated));
                return updated;
              });
              setModalConfig({
                title: "File Added",
                message: `File ${finalFileName} was successfully added to ${patient.trim()}.`,
                confirmText: "OK",
                showCancel: false,
              });
              setIsModalOpen(true);
            } else {
              setModalConfig({
                title: "Error",
                message: "Patient not found. Please add the patient first.",
                confirmText: "OK",
                showCancel: false,
              });
              setIsModalOpen(true);
            }
          },
        });
        setIsModalOpen(true);
      }
    } else {
      setModalConfig({
        title: "Add File",
        message: "Enter patient name and file name (Patient:FileName.ndg):",
        confirmText: "Add",
        inputValue: "",
        showCancel: true,
        onConfirm: (input: string) => {
          console.log("Adding file with input:", input);
          const [patient, fileName] = input.split(":");
          if (!patient || !fileName) {
            setModalConfig({
              title: "Error",
              message: "Invalid format. Use Patient:FileName.ndg",
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
            return;
          }
          const finalFileName = fileName.endsWith(".ndg") ? fileName : `${fileName}.ndg`;
          if (patientFiles[patient.trim()]) {
            if (patientFiles[patient.trim()].some((f) => f.fileName === finalFileName)) {
              setModalConfig({
                title: "Error",
                message: `File ${finalFileName} already exists for ${patient.trim()}.`,
                confirmText: "OK",
                showCancel: false,
              });
              setIsModalOpen(true);
              return;
            }
            setPatientFiles((prev) => {
              const updatedFiles = [...prev[patient.trim()], { fileName: finalFileName, nodes: [] }];
              const updated = { ...prev, [patient.trim()]: updatedFiles };
              localStorage.setItem("patientFiles", JSON.stringify(updated));
              return updated;
            });
            setModalConfig({
              title: "File Added",
              message: `File ${finalFileName} was successfully added to ${patient.trim()}.`,
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
          } else {
            setModalConfig({
              title: "Error",
              message: "Patient not found. Please add the patient first.",
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
          }
        },
      });
      setIsModalOpen(true);
    }
  };

  // HANDLE: ADD SYMPTOM NODE
  const addSymptomNode = (value?: string) => {
    console.log("Adding symptom node:", value);
    if (!value) {
      setModalConfig({
        title: "Add Custom Symptom",
        message: "Enter custom symptom name:",
        confirmText: "Add",
        inputValue: "",
        showCancel: true,
        onConfirm: (customSymptom: string) => {
          console.log("Adding custom symptom:", customSymptom);
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
          setAllSymptoms((prev) => [...prev, customSymptom].sort((a, b) => a.localeCompare(b)));
          const metadata = { section: "Custom", severity: "Medium", classification: "Other" };
          const id = Date.now().toString();
          addNode(customSymptom, id, metadata.severity, metadata.classification);
          setModalConfig({
            title: "Symptom Added",
            message: `Custom symptom "${customSymptom}" added successfully.`,
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
        },
      });
      setIsModalOpen(true);
      return;
    }
    const metadata = symptomMetadata[value];
    if (!metadata) return;
    const id = Date.now().toString();
    addNode(value, id, metadata.severity, metadata.classification);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          console.log("Closing modal");
          setIsModalOpen(false);
          setModalConfig({
            title: "",
            message: "",
            confirmText: "OK",
            showCancel: false,
          });
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        inputValue={modalConfig.inputValue}
        onConfirm={modalConfig.onConfirm}
      />
      <div
        className={`flex flex-col gap-4 bg-white shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] h-auto transition-all duration-300 ${
          sidebarVisibility ? "w-90 px-6 py-4" : "w-16 px-4 py-4 overflow-hidden"
        }`}
      >
        <div className="flex justify-end mt-4">
          <button
            className="cursor-pointer duration-300 hover:opacity-60"
            onClick={toggleLeftSidebar}
          >
            <img
              className="w-8 transition-all duration-150 hover:scale-105"
              src={sidebarVisibility ? "dock-to-right-icon.svg" : "dock-to-left-icon.svg"}
            />
          </button>
        </div>
        {sidebarVisibility && (
          <div className="flex gap-2">
            <button
              type="button"
              className={
                leftSidebar === "File"
                  ? Styles.primaryButtonStyle
                  : Styles.secondaryButtonStyle
              }
              onClick={() => {
                console.log("Switching to File tab");
                setLeftSidebar("File");
              }}
            >
              Files
            </button>
            <button
              type="button"
              className={
                leftSidebar === "Nodes"
                  ? Styles.primaryButtonStyle
                  : Styles.secondaryButtonStyle
              }
              onClick={() => {
                console.log("Switching to Symptoms tab");
                setLeftSidebar("Nodes");
              }}
            >
              Symptoms
            </button>
          </div>
        )}
        {/* PANEL: FILE */}
        {sidebarVisibility && leftSidebar === "File" && (
          <div className="flex flex-col gap-4 pt-4 flex-1">
            {/* MINI-HEADER */}
            <div className="flex justify-between items-end">
              <h3 className="text-lg font-[600] leading-none text-[var(--trust-blue)]">
                Patient Records
              </h3>
              <div className="flex gap-2">
                <button
                  className="cursor-pointer duration-300 hover:opacity-60"
                  onClick={() => {
                    console.log("Add Patient button clicked");
                    handleAddPatient();
                  }}
                >
                  <img className="w-6 transition-all duration-150 hover:scale-105" src="add-patient-icon.svg" />
                </button>
                <button
                  className="cursor-pointer duration-300 hover:opacity-60"
                  onClick={() => {
                    console.log("Add File button clicked");
                    handleAddFile();
                  }}
                >
                  <img className="w-6 transition-all duration-150 hover:scale-105" src="add-symptom-file-icon.svg" />
                </button>
              </div>
            </div>
            {/* SEARCH BAR */}
            <input
              className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
              type="text"
              placeholder="Search patient or file..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
            {/* PATIENT FILES */}
            <div className="flex-1 overflow-y-auto relative">
              {Object.keys(filteredFiles).length > 0 ? (
                Object.entries(filteredFiles).map(([patient, files]) => (
                  <div key={patient} className="rounded p-2 pr-4 relative">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => {
                          console.log("Toggling folder for patient:", patient);
                          toggleFolder(patient);
                        }}
                        className="cursor-pointer flex items-center gap-1 flex-1 text-left"
                      >
                        <img
                          className="w-6 transition-transform duration-300"
                          src={openFolders[patient] ? "arrow-down.svg" : "arrow-right.svg"}
                        />
                        <span className="flex justify-center items-center pr-1">
                          <img className="w-5" src="patient-icon.svg"/>
                        </span>
                        <span className="text-md inter-semibold text-[var(--trust-blue)]">{patient}</span>
                      </button>
                      <button
                        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Patient settings button clicked for:", patient);
                          togglePatientSettings(patient);
                        }}
                        ref={(el) => {
                          console.log("Setting ref for patient:", patient);
                          settingsMenuRefs.current[`patient-${patient}`] = el;
                        }}
                      >
                        <span className="text-2xl text-[var(--text)]">…</span>
                      </button>
                    </div>
                    {/* Settings Menu for Patient */}
                    {settingsMenuPatient === patient && (
                      <div
                        className="fixed bg-white shadow-lg rounded-md p-2 z-50 w-40"
                        style={getMenuPosition(settingsMenuRefs.current[`patient-${patient}`])}
                        ref={(el) => {
                          if (el) settingsMenuRefs.current[`patient-menu-${patient}`] = el as never;
                        }}
                      >
                        <button
                          className="roboto-cta block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Rename Patient button clicked for:", patient);
                            setSettingsMenuPatient(null);
                            renamePatient(patient);
                          }}
                        >
                          Rename Patient
                        </button>
                        <button
                          className="roboto-cta block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Delete Patient button clicked for:", patient);
                            setSettingsMenuPatient(null);
                            handleDeletePatient(patient);
                          }}
                        >
                          Delete Patient
                        </button>
                      </div>
                    )}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out pl-6 ${
                        openFolders[patient] ? "h-auto opacity-100" : "h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-6 mt-1 space-y-1">
                        {files.map((file, idx) => (
                          <div
                            key={idx}
                            className={`border-b border-[rgba(107,114,128,0.2)] relative flex items-center justify-between text-md font-bold text-[var(--slate-gray)] hover:text-[var(--dark-navy)] cursor-pointer px-2 pr-2 py-1 rounded ${
                              hoveredFile === `${patient}-${file.fileName}` ? "bg-gray-200" : ""
                            }`}
                            onMouseEnter={() => setHoveredFile(`${patient}-${file.fileName}`)}
                            onMouseLeave={() => setHoveredFile(null)}
                          >
                            <div className="flex items-center gap-2 flex-1" onClick={() => handleLoadFile(patient, file.fileName)}>
                              <img src="symptom-file-icon.svg" className="w-5 transition-colors duration-150"/>
                              <p className="text-sm inter-body flex items-center gap-2 text-[var(--slate-gray)] transition duration-150 cursor-pointer select-none">{file.fileName}</p>
                              {modifiedFiles[`${patient}-${file.fileName}`] && <span className="ml-1">*</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
          <div className="flex flex-col gap-4 pt-3 flex-1">
            <h3 className="text-lg font-[600] text-[var(--trust-blue)]">Symptoms</h3>
            <input
              className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
              type="text"
              placeholder="Search symptoms..."
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
            />
            <div className="flex-1 overflow-y-auto relative">
              <div>
                {Object.keys(filteredSymptomsBySection).length > 0 ? (
                  Object.entries(filteredSymptomsBySection).map(([section, symptoms]) => (
                    <div key={section} className="rounded p-2">
                      <button
                        onClick={() => {
                          console.log("Toggling folder for section:", section);
                          toggleFolder(section);
                        }}
                        className="cursor-pointer flex items-center gap-2 w-full text-left"
                      >
                        <img
                          className="w-6 transition-transform duration-300"
                          src={openFolders[section] ? "arrow-down.svg" : "arrow-right.svg"}
                        />
                        <span className={Styles.subheaderStyle}>{section}</span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFolders[section] ? "h-auto opacity-100" : "h-0 opacity-0"
                        }`}
                      >
                        <div className="ml-6 mt-1">
                          {symptoms.map((value, index) => (
                            <div
                              key={index}
                              className="border-b border-[rgba(107,114,128,0.2)] text-sm inter-body flex items-center gap-2 text-[var(--text)] transition duration-150 cursor-pointer p-2 select-none"
                              onClick={() => addSymptomNode(value)}
                            >
                              <img
                                className="w-5 transition-colors duration-150"
                                src="symptom-icon.svg"
                                alt="Symptom icon"
                              />
                              {value}
                            </div>
                          ))}
                        </div>
                      </div>
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
                  <h3 className="text-md inter-semibold text-[var(--trust-blue)]">Loaded Nodes</h3>
                  {nodes.length > 0 ? (
                    <div className="mt-2 space-y-1">
                      {nodes.map((node) => (
                        <div
                          key={node.id}
                          className="flex items-center justify-between text-sm font-semibold text-[var(--trust-blue)] p-2 rounded"
                        >
                          <span className="inter">{node.value}</span>
                          <button
                            className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full hover:opacity-50 transition-all duration-300"
                            onClick={() => handleDeleteNode(node.id)}
                          >
                          <img
                          className="w-8 transition-transform duration-300"
                          src="remove-node-icon.svg"
                          />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm inter text-gray-600">
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