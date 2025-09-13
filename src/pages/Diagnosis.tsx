import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import NodeContainer from "../components/NodeContainer";

type NodeType = { id: string; value: string; x: number; y: number };

const Diagnosis = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to add a node to the center of NodeContainer
  const addNode = (value: string, id: string) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = rect.width / 2 - 32; // Center x, minus half node width (64px)
      const y = rect.height / 2 - 32; // Center y, minus half node height (64px)
      setNodes((prev) => {
        const exists = prev.find((n) => n.id === id);
        if (exists) return prev; // Avoid duplicates
        return [...prev, { id, value, x, y }];
      });
    }
  };

  useEffect(() => {
    document.title = "SymptoMatik: Diagnosis";
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 p-8 gap-4">
        {/* Left: Symptoms List */}
        <div className="mr-2">
          <LeftSidebar addNode={addNode} />
        </div>
        {/* Right: Droppable Area */}
        <div className="flex-1" ref={containerRef}>
          <NodeContainer nodes={nodes} setNodes={setNodes} />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Diagnosis;