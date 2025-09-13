import { useRef } from "react";

type NodeType = { id: string; value: string; x: number; y: number };

type NodeContainerProps = {
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
};

const NodeContainer = ({ nodes, setNodes }: NodeContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle drag start for nodes in the container
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, value: string) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ id, value }));
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

    const { id, value } = JSON.parse(data);

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
        return [...prev, { id, value, x, y }];
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
    const container = (e.currentTarget.parentNode as HTMLElement).getBoundingClientRect();
    if (
      e.clientX < container.left ||
      e.clientX > container.right ||
      e.clientY < container.top ||
      e.clientY > container.bottom
    ) {
      // Remove node if dragged outside
      setNodes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-200px)] bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] bg-gray-50 rounded-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-16 h-16 flex items-center justify-center rounded-full 
          bg-blue-500 text-white font-bold shadow-md select-none cursor-grab
          outline outline-2 outline-gray-700"
          style={{ left: node.x, top: node.y }}
          draggable
          onDragStart={(e) => handleDragStart(e, node.id, node.value)}
          onDragEnd={(e) => handleDragEnd(e, node.id)}
        >
          {node.value}
        </div>
      ))}
    </div>
  );
};

export default NodeContainer;