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

  const addNode = (
    value: string,
    id: string,
    severity: string,
    classification: string
  ): boolean => {
    const validSeverities = ["Low", "Medium", "High"] as const;
    const validClassifications = ["Infectious", "Allergic", "Chronic"] as const;
    const validatedSeverity = validSeverities.includes(severity as any)
      ? severity
      : "Low";
    const validatedClassification = validClassifications.includes(classification as any)
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
    <div className="flex flex-col bg-gray-100 pb-24">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex min-h-screen flex-1 p-4 gap-4">
        {/* Left: Sidebar */}
        <div className="w-1/5">
          <LeftSidebar addNode={addNode} nodes={nodes} loadNodes={loadNodes} />
        </div>
        {/* Center: Droppable Area */}
        <div className="flex-1">
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