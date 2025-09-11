import { useState } from "react";
// @ts-ignore
import LinkedList from "../logic/LinkedList.js";

// Type for nodes in containers
type NodeType = { id: string; value: string };

// Main SymptomsList component
const SymptomsList = () => {
  // Initialize LinkedList with symptoms
  const list = new LinkedList();
  list.append("Fever");
  list.append("Cough");
  list.append("Rash");
  const [symptoms, setSymptoms] = useState<string[]>(list.toArray());
  const [containers, setContainers] = useState<(NodeType | null)[]>([null, null, null]); // Three fixed containers

  // Handle drag start from SymptomsList or container
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, value: string, id: string) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ id, value }));
  };

  // Handle drop in a specific container
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, containerIndex: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const { id, value } = JSON.parse(data);

    // Check if the node is already in another container
    const currentContainerIndex = containers.findIndex((node) => node && node.id === id);

    // If container is occupied and the node isn't being moved from another container, prevent drop
    if (containers[containerIndex] && currentContainerIndex === -1) return;

    setContainers((prev) => {
      const newContainers = [...prev];

      // If the node is being moved from another container
      if (currentContainerIndex !== -1) {
        newContainers[currentContainerIndex] = null; // Clear the original container
      } else {
        // If it's a new node from SymptomsList, remove from symptoms
        setSymptoms((prev) => prev.filter((symptom) => symptom !== value));
      }

      newContainers[containerIndex] = { id, value }; // Place in new container
      return newContainers;
    });

    e.dataTransfer.dropEffect = "move";
  };

  // Handle drag over in a container
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drag end (remove node if dragged outside container)
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, id: string, value: string, containerIndex: number) => {
    const container = (e.currentTarget.parentNode as HTMLElement).getBoundingClientRect();
    if (
      e.clientX < container.left ||
      e.clientX > container.right ||
      e.clientY < container.top ||
      e.clientY > container.bottom
    ) {
      setContainers((prev) => {
        const newContainers = [...prev];
        newContainers[containerIndex] = null;
        return newContainers;
      });
      setSymptoms((prev) => [...prev, value]); // Add symptom back to list
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Symptoms List */}
      <div className="flex border-2 border-gray-700 rounded-lg gap-4 p-4 bg-gray-100">
        {symptoms.map((value, index) => (
          <div
            key={index}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow-md cursor-grab select-none"
            draggable
            onDragStart={(e) => handleDragStart(e, value, `${value}-${Date.now()}`)}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Fixed Containers */}
      <div className="flex gap-4">
        {containers.map((node, index) => (
          <div
            key={index}
            className="w-20 h-20 border-4 border-blue-600 rounded-lg bg-gray-50 flex items-center justify-center"
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          >
            {node && (
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow-md select-none cursor-grab outline outline-2 outline-gray-700"
                draggable
                onDragStart={(e) => handleDragStart(e, node.value, node.id)}
                onDragEnd={(e) => handleDragEnd(e, node.id, node.value, index)}
              >
                {node.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomsList;