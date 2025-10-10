import { useState, useEffect, useRef } from "react";
import Styles from "../styles/Styles.js";
import LinkedList from "../logic/LinkedList.js";
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
  const [symptomList] = useState(() => {
    const list = new LinkedList();
    Object.keys(data.symptoms).forEach((symptom) => list.append(symptom));
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
    if (nodes.length > 0 && currentPatient && currentFile) {
      setModifiedFiles((prev) => ({
        ...prev,
        [`${currentPatient}-${currentFile}`]: true,
      }));
    }
  }, [nodes, currentPatient, currentFile, setModifiedFiles]);

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
        className={`flex flex-col gap-4 px-6 py-4 bg-white shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] h-screen ${
          sidebarVisibility ? "" : "px-1 py-4"
        }`}
      >
        {/* PANEL: NODES */}
        {sidebarVisibility && leftSidebar === "Nodes" && (
          <div className="flex flex-col gap-4 pt-3">
            <h3 className="text-lg font-[600] text-[var(--trust-blue)]">Symptoms</h3>
            <input
              className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
              type="text"
              placeholder="Search symptoms..."
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
            />
            <div className="max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide">
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
                        <div className="ml-6 mt-1 ">
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
                  <h3 className="text-sm inter-semibold text-[var(--trust-blue)]">Loaded Nodes</h3>
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
                            <span className="text-xs font-bold">X</span>
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