import { useState, useEffect, useRef } from "react";
import Styles from "../styles/Styles.js";
import LinkedList from "../logic/LinkedList.js";
import Modal from "./Modal.tsx";
import pediatricData from "../data/pediatricData.json";

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
};

interface ModalConfig {
  title: string;
  message: string;
  confirmText: string;
  inputValue?: string;
  onConfirm?: (value: string) => void;
  showCancel?: boolean;
}

const LeftSidebar = ({ addNode, nodes, loadNodes, setCurrentPatient, setCurrentFile }: LeftSidebarProps) => {
  const [symptomList] = useState(() => {
    const list = new LinkedList();
    Object.keys(pediatricData.symptoms).forEach((symptom) => list.append(symptom));
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
  const [currentLocalPatient, setCurrentLocalPatient] = useState<string | null>(null);
  const [currentLocalFile, setCurrentLocalFile] = useState<string | null>(null);
  const [symptomMetadata] = useState(pediatricData.symptoms);
  const [settingsMenuPatient, setSettingsMenuPatient] = useState<string | null>(null);
  const [settingsMenuFile, setSettingsMenuFile] = useState<string | null>(null);
  const settingsMenuRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = Object.values(settingsMenuRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (isOutside && (settingsMenuPatient || settingsMenuFile)) {
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
    if (nodes.length > 0 && currentLocalPatient && currentLocalFile) {
      setModifiedFiles((prev) => ({
        ...prev,
        [`${currentLocalPatient}-${currentLocalFile}`]: true,
      }));
    }
  }, [nodes, currentLocalPatient, currentLocalFile]);

  // Calculate dropdown menu position
  const getMenuPosition = (buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) return { top: '0px', left: '0px', openUpward: false };
    const rect = buttonRef.getBoundingClientRect();
    const menuHeight = 80; // Approximate height of the menu
    const viewportHeight = window.innerHeight;
    const openUpward = rect.bottom + menuHeight > viewportHeight;
    const menuTop = openUpward ? rect.top - menuHeight : rect.bottom;
    const menuLeft = rect.right - 100; // Adjust to align menu with button (assuming menu width ~100px)
    return {
      top: `${menuTop}px`,
      left: `${menuLeft}px`,
      openUpward,
    };
  };

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
        if (currentLocalPatient === patient) {
          setCurrentLocalPatient(null);
          setCurrentLocalFile(null);
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

  // HANDLE: RENAME PATIENT
  const renamePatient = (patient: string) => {
    setModalConfig({
      title: "Rename Patient",
      message: `Enter new name for ${patient}:`,
      confirmText: "Rename",
      inputValue: "",
      showCancel: true,
      onConfirm: (newName: string) => {
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
        setPatientFiles((prev) => {
          const updated = { ...prev };
          updated[newName] = updated[patient];
          delete updated[patient];
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        if (currentLocalPatient === patient) {
          setCurrentLocalPatient(newName);
          setCurrentPatient(newName);
        }
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
    setSettingsMenuPatient((prev) => (prev === patient ? null : patient));
    setSettingsMenuFile(null); // Close any open file menu
  };

  // HANDLE: TOGGLE FILE SETTINGS
  const toggleFileSettings = (patient: string, fileName: string) => {
    const key = `${patient}-${fileName}`;
    setSettingsMenuFile((prev) => (prev === key ? null : key));
    setSettingsMenuPatient(null); // Close any open patient menu
  };

  // HANDLE: DELETE FILE
  const handleDeleteFile = (patient: string, fileName: string) => {
    setModalConfig({
      title: "Delete File",
      message: `Are you sure you want to delete ${fileName} for ${patient}?`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: () => {
        setPatientFiles((prev) => {
          const updatedFiles = prev[patient].filter((file) => file.fileName !== fileName);
          const updated = { ...prev, [patient]: updatedFiles };
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        if (currentLocalPatient === patient && currentLocalFile === fileName) {
          setCurrentLocalFile(null);
          setCurrentFile(null);
          loadNodes([]);
        }
        setModifiedFiles((prev) => {
          const updated = { ...prev };
          delete updated[`${patient}-${fileName}`];
          return updated;
        });
        setModalConfig({
          title: "File Deleted",
          message: `File ${fileName} was successfully deleted.`,
          confirmText: "OK",
          showCancel: false,
        });
        setIsModalOpen(true);
      },
    });
    setIsModalOpen(true);
  };

  // HANDLE: RENAME FILE
  const renameFile = (patient: string, fileName: string) => {
    setModalConfig({
      title: "Rename File",
      message: `Enter new name for ${fileName}:`,
      confirmText: "Rename",
      inputValue: "",
      showCancel: true,
      onConfirm: (newFileName: string) => {
        if (!newFileName.trim()) {
          setModalConfig({
            title: "Error",
            message: "Please enter a valid file name.",
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        const finalNewFileName = newFileName.endsWith(".ndg") ? newFileName : `${newFileName}.ndg`;
        if (patientFiles[patient].some((file) => file.fileName === finalNewFileName)) {
          setModalConfig({
            title: "Error",
            message: "A file with this name already exists.",
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        setPatientFiles((prev) => {
          const updatedFiles = prev[patient].map((file) =>
            file.fileName === fileName ? { ...file, fileName: finalNewFileName } : file
          );
          const updated = { ...prev, [patient]: updatedFiles };
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        if (currentLocalPatient === patient && currentLocalFile === fileName) {
          setCurrentLocalFile(finalNewFileName);
          setCurrentFile(finalNewFileName);
        }
        setModifiedFiles((prev) => {
          const updated = { ...prev };
          if (updated[`${patient}-${fileName}`]) {
            updated[`${patient}-${finalNewFileName}`] = updated[`${patient}-${fileName}`];
            delete updated[`${patient}-${fileName}`];
          }
          return updated;
        });
        setModalConfig({
          title: "File Renamed",
          message: `File ${fileName} was successfully renamed to ${finalNewFileName}.`,
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
    if (!currentLocalPatient || !currentLocalFile) {
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
          const newFiles = prev[currentLocalPatient].map((file) =>
            file.fileName === currentLocalFile ? { ...file, nodes: updatedNodes } : file
          );
          const updatedPatientFiles = { ...prev, [currentLocalPatient]: newFiles };
          localStorage.setItem("patientFiles", JSON.stringify(updatedPatientFiles));
          return updatedPatientFiles;
        });
        loadNodes(updatedNodes);
        setModifiedFiles((prev) => ({
          ...prev,
          [`${currentLocalPatient}-${currentLocalFile}`]: true,
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
        setCurrentLocalPatient(patient);
        setCurrentLocalFile(fileName);
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
        message: "Please enter a patient name in the search bar to add a file.",
        confirmText: "OK",
        showCancel: false,
      });
      setIsModalOpen(true);
      return;
    }
    const selectedPatient = filteredPatients.length === 1 ? filteredPatients[0] : patientSearch.trim();
    if (!patientFiles[selectedPatient]) {
      setModalConfig({
        title: "Error",
        message: "Patient not found. Please add the patient first or select an existing one.",
        confirmText: "OK",
        showCancel: false,
      });
      setIsModalOpen(true);
      return;
    }
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
        const finalFileName = fileName.endsWith(".ndg") ? fileName : `${fileName}.ndg`;
        if (patientFiles[selectedPatient].some((f) => f.fileName === finalFileName)) {
          setModalConfig({
            title: "Error",
            message: `File ${finalFileName} already exists for ${selectedPatient}.`,
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
          return;
        }
        setPatientFiles((prev) => {
          const updatedFiles = [...prev[selectedPatient], { fileName: finalFileName, nodes: [] }];
          const updated = { ...prev, [selectedPatient]: updatedFiles };
          localStorage.setItem("patientFiles", JSON.stringify(updated));
          return updated;
        });
        setModalConfig({
          title: "File Added",
          message: `File ${finalFileName} was successfully added to ${selectedPatient}.`,
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
    if (!currentLocalPatient || !currentLocalFile) {
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
      const updatedFiles = prev[currentLocalPatient].map((file) =>
        file.fileName === currentLocalFile ? { ...file, nodes } : file
      );
      const updated = { ...prev, [currentLocalPatient]: updatedFiles };
      localStorage.setItem("patientFiles", JSON.stringify(updated));
      return updated;
    });
    setModifiedFiles((prev) => ({
      ...prev,
      [`${currentLocalPatient}-${currentLocalFile}`]: false,
    }));
    setModalConfig({
      title: "File Saved",
      message: `File ${currentLocalFile} for ${currentLocalPatient} was successfully saved.`,
      confirmText: "OK",
      showCancel: false,
    });
    setIsModalOpen(true);
  };

  // HANDLE: ADD SYMPTOM NODE
  const addSymptomNode = (value?: string) => {
    if (!value) {
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
        showCancel={modalConfig.showCancel}
      />
      <div
        className={`flex flex-col gap-4 px-6 py-10 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg h-screen ${
          sidebarVisibility ? "" : "px-1 py-4"
        }`}
      >
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
          <div className="flex flex-col gap-4 min-h-32 pt-6">
            {/* MINI-HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[var(--trust-blue)]">
                Patient Records
              </h3>
              <div className="flex gap-2">
                <button className="cursor-pointer duration-300 hover:opacity-60" onClick={handleAddPatient}>
                  <img className="w-6" src="add-patient-icon.svg" />
                </button>
                <button className="cursor-pointer duration-300 hover:opacity-60" onClick={handleAddFile}>
                  <img className="w-6" src="add-file-icon.svg" />
                </button>
                <button className="cursor-pointer duration-300 hover:opacity-60" onClick={handleSaveFile}>
                  <img className="w-6" src="save-icon.svg" />
                </button>
              </div>
            </div>
            {/* SEARCH BAR */}
            <input
              className="w-full rounded-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
              type="text"
              placeholder="Search patient or file..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
            {/* PATIENT FILES */}
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto relative">
              {Object.keys(filteredFiles).length > 0 ? (
                Object.entries(filteredFiles).map(([patient, files]) => (
                  <div key={patient} className="rounded p-2 pr-4 relative">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => toggleFolder(patient)}
                        className="cursor-pointer flex items-center gap-1 flex-1 text-left"
                      >
                        <img
                          className="w-6 transition-transform duration-300"
                          src={openFolders[patient] ? "arrow-down.svg" : "arrow-right.svg"}
                        />
                        <span>
                          <img className="w-6 mr-1" src="patient-icon.svg" />
                        </span>
                        <span className={Styles.subheaderStyle}>{patient}</span>
                      </button>
                      <button
                        className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300"
                        onClick={() => togglePatientSettings(patient)}
                        ref={(el) => (settingsMenuRefs.current[`patient-${patient}`] = el)}
                      >
                        <span className="text-md text-[var(--trust-blue)]">•••</span>
                      </button>
                    </div>
                    {/* Settings Menu for Patient */}
                    {settingsMenuPatient === patient && (
                      <div
                        className="fixed bg-white shadow-lg rounded-md p-2 z-20 w-40"
                        style={getMenuPosition(settingsMenuRefs.current[`patient-${patient}`])}
                      >
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            renamePatient(patient);
                            setSettingsMenuPatient(null);
                          }}
                        >
                          Rename Patient
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            handleDeletePatient(patient);
                            setSettingsMenuPatient(null);
                          }}
                        >
                          Delete Patient
                        </button>
                      </div>
                    )}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFolders[patient] ? "h-auto opacity-100" : "h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-6 mt-1 space-y-1">
                        {files.map((file, idx) => (
                          <div
                            key={idx}
                            className={`relative flex items-center justify-between text-md font-bold text-[var(--slate-gray)] hover:text-[var(---dark-navy)] cursor-pointer px-2 py-1 rounded ${
                              hoveredFile === `${patient}-${file.fileName}` ? "bg-gray-200" : ""
                            }`}
                            onMouseEnter={() => setHoveredFile(`${patient}-${file.fileName}`)}
                            onMouseLeave={() => setHoveredFile(null)}
                          >
                            <div className="flex items-center gap-2 flex-1" onClick={() => handleLoadFile(patient, file.fileName)}>
                              <img className="w-4" src="symptom-file-icon.svg" />
                              <p className="text-xs">{file.fileName}</p>
                              {modifiedFiles[`${patient}-${file.fileName}`] && <span className="ml-1">*</span>}
                            </div>
                            <button
                              className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300"
                              onClick={() => toggleFileSettings(patient, file.fileName)}
                              ref={(el) => (settingsMenuRefs.current[`${patient}-${file.fileName}`] = el)}
                            >
                              <span className="text-xs text-[var(--trust-blue)]">•••</span>
                            </button>
                            {/* Settings Menu for File */}  
                            {settingsMenuFile === `${patient}-${file.fileName}` && (
                              <div
                                className="fixed bg-white shadow-lg rounded-md p-2 z-20 w-40"
                                style={getMenuPosition(settingsMenuRefs.current[`${patient}-${file.fileName}`])}
                              >
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    renameFile(patient, file.fileName);
                                    setSettingsMenuFile(null);
                                  }}
                                >
                                  Rename File
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => {
                                    handleDeleteFile(patient, file.fileName);
                                    setSettingsMenuFile(null);
                                  }}
                                >
                                  Delete File
                                </button>
                              </div>
                            )}
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
          <div className="flex flex-col gap-4 pt-6">
            <h3 className="text-lg font-semibold text-[var(--trust-blue)]">Symptoms</h3>
            <input
              className="w-full rounded-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
              type="text"
              placeholder="Search symptoms..."
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
            />
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
              <div>
                {Object.keys(filteredSymptomsBySection).length > 0 ? (
                  Object.entries(filteredSymptomsBySection).map(([section, symptoms]) => (
                    <div key={section} className="rounded p-2">
                      <button
                        onClick={() => toggleFolder(section)}
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
              {currentLocalFile && currentLocalPatient && (
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
                            className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-700 transition-all duration-300"
                            onClick={() => handleDeleteNode(node.id)}
                          >
                            <span className="text-sm font-bold">×</span>
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