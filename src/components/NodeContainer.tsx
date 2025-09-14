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

  // Color mappings for severity (dropdown background) and classification (node fill)
  const severityBackgroundColors: Record<string, string> = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
    undefined: "bg-gray-500",
  };

  const classificationFillColors: Record<string, string> = {
    Infectious: "bg-blue-500",
    Allergic: "bg-teal-500",
    Chronic: "bg-gray-500",
    undefined: "bg-gray-300",
  };

  // Handle drag start for nodes in the container
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string,
    value: string,
    severity: string,
    classification: string
  ) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ id, value, severity, classification })
    );
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
    try {
      const { id, value, severity, classification } = JSON.parse(data);
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left - 32, rect.width - 240));
      const y = Math.max(0, Math.min(e.clientY - rect.top - 32, rect.height - 64));
      setNodes((prev) => {
        const exists = prev.find((n) => n.id === id);
        if (exists) {
          return prev.map((n) => (n.id === id ? { ...n, x, y } : n));
        } else {
          return [
            ...prev,
            {
              id,
              value,
              x,
              y,
              severity: severity || "Low",
              classification: classification || "Infectious",
            },
          ];
        }
      });
      e.dataTransfer.dropEffect = "move";
    } catch (error) {
      console.error("Invalid drag data:", error);
    }
  };

  // Handle drag over
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
      setNodes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  // Handle severity change from dropdown
  const handleSeverityChange = (id: string, newSeverity: "Low" | "Medium" | "High") => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, severity: newSeverity } : n
      )
    );
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
          className={`absolute w-72 h-16 flex items-center rounded-lg px-4
            ${classificationFillColors[node.classification] || classificationFillColors.undefined}
            text-white font-bold shadow-md select-none cursor-grab active:cursor-grabbing
            shadow-[0_0_4px_2px_rgba(0,0,0,0.8)]`}
          style={{ left: node.x, top: node.y }}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, node.id, node.value, node.severity, node.classification)
          }
          onDragEnd={(e) => handleDragEnd(e, node.id)}
        >
          <span className="flex-1">{node.value}</span>
          <select
            value={node.severity}
            onChange={(e) =>
              handleSeverityChange(node.id, e.target.value as "Low" | "Medium" | "High")
            }
            className={`h-8 px-2 rounded text-white text-sm
              ${severityBackgroundColors[node.severity] || severityBackgroundColors.undefined}`}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default NodeContainer;