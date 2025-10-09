import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import NodeContainer from "../components/NodeContainer";

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

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Header */}
      <Header/>
      {/* Main Content */}
      <div className="flex min-h-screen flex-1">
        {/* Left: Sidebar */}
        <div className="w-1/5 h-screen">
          <LeftSidebar 
            addNode={addNode} 
            nodes={nodes} 
            loadNodes={loadNodes} 
            setCurrentPatient={setCurrentPatient}
            setCurrentFile={setCurrentFile}
          />
        </div>
        {/* Center: Droppable Area */}
        <div className="flex-1 flex flex-col">
          {currentFile && currentPatient && (
            <div className="bg-white p-4 shadow z-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[var(--trust-blue)]">{currentPatient} |</h2>
                <h3 className="text-sm font-bold text-[var(--trust-blue)]">{currentFile}</h3>
              </div>

              <p className="text-sm text-gray-600">
                Number of symptoms: {nodes.length}
              </p>
            </div>
          )}
          <NodeContainer nodes={nodes} setNodes={setNodes} />
        </div>
        {/* Right: Sidebar */}
        <div className="w-[24%]">
          <RightSidebar nodes={nodes} />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Diagnosis;