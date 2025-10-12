import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NodeContainer from "../../components/NodeContainer";
import LeftSidebarPatient from "../../components/patient/LeftSidebarPatient";
import RightSidebarPatient from "../../components/patient/RightSidebarPatient";

type NodeType = {
  id: string;
  value: string;
  x: number;
  y: number;
  severity: "Low" | "Medium" | "High";
  classification: "Infectious" | "Allergic" | "Chronic";
};

const Diagnosis = () => {
  useEffect(() => {
    document.title = "SymptoMatik: Diagnosis";
  }, []);

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [currentPatient, setCurrentPatient] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
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
  const [modifiedFiles, setModifiedFiles] = useState<Record<string, boolean>>({});

  const addNode = (
    value: string,
    id: string,
    severity: string,
    classification: string
  ): boolean => {
    const validSeverities = ["Low", "Medium", "High"] as const;
    const validClassifications = ["Infectious", "Allergic", "Chronic"] as const;
    const validatedSeverity = validSeverities.includes(severity as never)
      ? severity
      : "Low";
    const validatedClassification = validClassifications.includes(classification as never)
      ? classification
      : "Infectious";

    const existingNode = nodes.find(
      (n) =>
        n.value === value &&
        n.severity === validatedSeverity &&
        n.classification == validatedClassification
    );
    if (existingNode) {
      console.log(
        `Node "${value}" already exists with severity "${validatedSeverity}" and classification "${validatedClassification}"`
      );
      return false;
    }

    setNodes((prev) => [
      ...prev,
      {
        id,
        value,
        x: Math.random() * 200 + 50,
        y: Math.random() * 200 + 50,
        severity: validatedSeverity as "Low" | "Medium" | "High",
        classification: validatedClassification as "Infectious" | "Allergic" | "Chronic",
      },
    ]);
    return true;
  };

  const loadNodes = (newNodes: NodeType[]) => {
    setNodes(newNodes);
  };

  const handleSave = () => {
    if (currentPatient && currentFile) {
      setPatientFiles((prev) => {
        const updatedFiles = prev[currentPatient].map((file) =>
          file.fileName === currentFile ? { ...file, nodes } : file
        );
        const updated = { ...prev, [currentPatient]: updatedFiles };
        localStorage.setItem("patientFiles", JSON.stringify(updated));
        return updated;
      });
      setModifiedFiles((prev) => ({
        ...prev,
        [`${currentPatient}-${currentFile}`]: false,
      }));
      console.log(`Saved ${currentFile} for ${currentPatient}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPatient, currentFile, nodes]);

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Sidebar */}
        <LeftSidebarPatient
          addNode={addNode}
          nodes={nodes}
          loadNodes={loadNodes}
          setCurrentPatient={setCurrentPatient}
          setCurrentFile={setCurrentFile}
          patientFiles={patientFiles}
          setPatientFiles={setPatientFiles}
          modifiedFiles={modifiedFiles}
          setModifiedFiles={setModifiedFiles}
          currentPatient={currentPatient}
          currentFile={currentFile}
        />
        {/* Center: Droppable Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {currentFile && currentPatient && (
            <div className="bg-white p-4 shadow z-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg inter-semibold text-[var(--trust-blue)]">{currentPatient} |</h2>
                <h3 className="text-sm inter-semibold text-[var(--trust-blue)]">{currentFile}</h3>
              </div>
              <button
                className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                onClick={handleSave}
              >
                <img className="w-5" src="save-icon.svg" alt="Save Icon" />
              </button>
            </div>
          )}
          <NodeContainer nodes={nodes} setNodes={setNodes} />
        </div>
        {/* Right: Sidebar */}
        <div className="w-auto">
          <RightSidebarPatient nodes={nodes} />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Diagnosis;