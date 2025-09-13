import { useRef } from "react";

type NodeType = {
  id: string;
  value: string;
  x: number;
  y: number;
  severity: "Low" | "Medium" | "High";
  classification: "Infectious" | "Allergic" | "Chronic";
};

type NodeContainerProps = {
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
};

const NodeContainer = ({ nodes, setNodes }: NodeContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Color mappings for severity (outline) and classification (fill)
  const severityOutlineColors: Record<string, string> = {
    Low: "outline-green-500",
    Medium: "outline-yellow-500",
    High: "outline-red-500",

    // Fallback for missing severity
    undefined: "outline-gray-500",
  };

  const classificationFillColors: Record<string, string> = {
    Infectious: "bg-blue-500", // Trust Blue
    Allergic: "bg-teal-500", // Healing Teal
    Chronic: "bg-gray-500", // Slate Gray

    // Fallback for missing classification
    undefined: "bg-gray-300",
  };

  // Handle drag start for nodes in the container
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, value: string, severity: string, classification: string) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ id, value, severity, classification }));
    // Create a 1x1 transparent canvas to hide the drag image
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 1, 1);
    }
    e.dataTransfer.setDragImage(canvas, 0, 0);
  };

  // Handle drop inside container
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const { id, value, severity, classification } = JSON.parse(data);

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 32; // Center the node
    const y = e.clientY - rect.top - 32;

    setNodes((prev) => {
      const exists = prev.find((n) => n.id === id);

      if (exists) {
        // Update position of existing node
        return prev.map((n) =>
          n.id === id ? { ...n, x, y } : n
        );
      } else {
        // Add new node
        return [...prev, { id, value, x, y, severity: severity || "Low", classification: classification || "Infectious" }];
      }
    });

    e.dataTransfer.dropEffect = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle when dragging a node away
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const container = containerRef.current?.getBoundingClientRect();
    if (
      container &&
      (e.clientX < container.left ||
        e.clientX > container.right ||
        e.clientY < container.top ||
        e.clientY > container.bottom)
    ) {
      // Remove node if dragged outside
      setNodes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute w-16 h-16 flex items-center justify-center rounded-full 
          ${classificationFillColors[node.classification] || classificationFillColors.undefined} 
          text-white font-bold shadow-md select-none cursor-grab active:cursor-grabbing 
          outline outline-4  ${severityOutlineColors[node.severity] || severityOutlineColors.undefined}`}
          style={{ left: node.x, top: node.y }}
          draggable
          onDragStart={(e) => handleDragStart(e, node.id, node.value, node.severity, node.classification)}
          onDragEnd={(e) => handleDragEnd(e, node.id)}
        >
          {node.value}
        </div>
      ))}
    </div>
  );
};

export default NodeContainer;