import { useRef, useState, useEffect } from "react";

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
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);

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

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    node: NodeType
  ) => {
    e.preventDefault(); // Prevent default browser behavior
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - node.x;
    const offsetY = e.clientY - rect.top - node.y;
    setDraggingNodeId(node.id);
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault(); // Prevent default browser behavior
    if (!draggingNodeId || !offset || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - offset.x, rect.width - 240));
    const y = Math.max(0, Math.min(e.clientY - rect.top - offset.y, rect.height - 64));
    setNodes((prev) =>
      prev.map((n) =>
        n.id === draggingNodeId ? { ...n, x, y } : n
      )
    );
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!draggingNodeId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      setNodes((prev) => prev.filter((n) => n.id !== draggingNodeId));
    }
    setDraggingNodeId(null);
    setOffset(null);
  };

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingNodeId, offset]);

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
      className="relative w-full h-screen rounded-bl-lg rounded-br-lg bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]"
    >
      {nodes.map((node) => {
        console.log(
          `Node: ${node.value}, Classification: ${node.classification}, Color: ${
            classificationFillColors[node.classification] || classificationFillColors.undefined
          }`
        );
        return (
          <div
            key={node.id}
            className="absolute w-80 h-16 flex items-center rounded-lg pr-4 bg-[var(--soft-white)] text-white font-bold shadow-md select-none shadow-[0_0_4px_2px_rgba(0,0,0,0.8)]"
            style={{ left: node.x, top: node.y }}
          >
            {/* Left: Draggable Point with Leeway */}
            <div
              className={`flex items-center justify-center h-full w-10 rounded-tl-lg rounded-bl-lg cursor-grab ${
                draggingNodeId === node.id ? 'cursor-grabbing' : 'cursor-grab'
              } ${
                classificationFillColors[node.classification] || classificationFillColors.undefined
              }`}
              onMouseDown={(e) => handleMouseDown(e, node)}
            >
              <img className="w-6" src="drag-indicator-icon.svg" />
            </div>
            <span className="flex-1 inter text-sm text-black pl-4">{node.value}</span>
            <select
              value={node.severity}
              onChange={(e) =>
                handleSeverityChange(node.id, e.target.value as "Low" | "Medium" | "High")
              }
              className={`h-8 px-2 rounded inter-semibold text-white text-sm ${
                severityBackgroundColors[node.severity] || severityBackgroundColors.undefined
              }`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default NodeContainer;