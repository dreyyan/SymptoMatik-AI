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
  severity: string;
  classification: string;
};

const Diagnosis = () => {
  useEffect(() => {
    document.title = "SymptoMatik: Diagnosis";
  }, []);

  const [nodes, setNodes] = useState<NodeType[]>([]);

  const addNode = (value: string, id: string, severity: string, classification: string) => {
    // Optional: Prevent duplicates based on value, severity, and classification
    const existingNode = nodes.find(
      (n) => n.value === value && n.severity === severity && n.classification === classification
    );
    if (existingNode) {
      console.log(`Node "${value}" already exists with severity "${severity}" and classification "${classification}"`);
      return; // Skip adding duplicate
    }

    setNodes((prev) => [
      ...prev,
      {
        id,
        value,
        x: Math.random() * 200 + 50, // Random x for better spread
        y: Math.random() * 200 + 50, // Random y for better spread
        severity,
        classification,
      },
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left: Sidebar */}
        <div className="w-2/8">
          <LeftSidebar addNode={addNode} />
        </div>

        {/* Center: Droppable Area */}
        <div className="w-full">
          <NodeContainer nodes={nodes} setNodes={setNodes} />
        </div>

        {/* Right: Sidebar */}
        <div className="w-5/16">
          <RightSidebar />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Diagnosis;