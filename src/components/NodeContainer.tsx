import { useState } from "react";

type NodeType = { id: string; value: string; x: number; y: number };

const NodeContainer = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);

  // Handle drop inside container
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const { id, value } = JSON.parse(data);

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 32;
    const y = e.clientY - rect.top - 32;

    setNodes((prev) => {
      const exists = prev.find((n) => n.id === id);

      if (exists) {
        // update position instead of duplicating
        return prev.map((n) =>
          n.id === id ? { ...n, x, y } : n
        );
      } else {
        // new node dropped
        return [...prev, { id, value, x, y }];
      }
    });

    e.dataTransfer.dropEffect = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
      // remove node
      setNodes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div
      className="relative w-full h-screen border bg-gray-50"
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
          onDragEnd={(e) => handleDragEnd(e, node.id)}
        >
          {node.value}
        </div>
      ))}
    </div>
  );
};

export default NodeContainer;
