import { useState, useRef } from "react";
import Styles from "../styles/Styles.js";

// Components
// @ts-ignore
import LinkedList from "../logic/LinkedList.js";

// Main LeftSidebar component
const LeftSidebar = () => {
  const list = new LinkedList();
  list.append("Fever");
  list.append("Cough");
  list.append("Rash");

  const [symptoms, setSymptoms] = useState<string[]>(list.toArray());
  const [leftSidebar, setLeftSidebar] = useState("File");
  const dragNodeRef = useRef<HTMLDivElement>(null);

  // Handle drag start from LeftSidebar
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, value: string, id: string) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ id, value }));
    // Use the dragged element as the drag image
    if (dragNodeRef.current) {
      e.dataTransfer.setDragImage(dragNodeRef.current, 32, 32); // Center the node on cursor
    }
  };

  // HANLDE: ADD PATIENT/NODE
  const handleAddPatient = () => {}
  const handleAddNode = () => {}

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 border-2 border-gray-700 rounded-lg">
      {/* BUTTONS */}
      <div className="flex gap-2">
        <button type="button" className={leftSidebar === "File" ? Styles.smSquareButtonStyle : Styles.smSquareButtonOutlineStyle} onClick={() => setLeftSidebar("File")}>File</button>
        <button type="button" className={leftSidebar === "Nodes" ? Styles.smSquareButtonStyle : Styles.smSquareButtonOutlineStyle} onClick={() => setLeftSidebar("Nodes")}>Nodes</button>
      </div>

      {/* FILE PANEL */}
      { leftSidebar === "File" &&
        <div className="border">
          {/* SEARCH BAR */}
          <input className="border-2 rounded-xl" type="text" placeholder="Enter patient name..."></input>
          {/* MINI-HEADER */}
          <div className="flex">
            <h3>Patient Records</h3>
            <div className="border ml-[50%]">
              <button className="border" onClick={handleAddPatient}>AP</button>
            </div>
          </div>
        </div>
      }

      {/* NODES PANEL */}
      { leftSidebar === "Nodes" &&
        <div className="border">
            <div className="flex gap-4">
              <button className="border" onClick={handleAddNode}>AN</button>
              {symptoms.map((value, index) => (
                <div
                  key={index}
                  ref={index === 0 ? dragNodeRef : null} // Attach ref to first node for drag image
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow-md cursor-grab select-none"
                  draggable
                  onDragStart={(e) => handleDragStart(e, value, `${value}-${Date.now()}`)}
                >
                  {value}
                </div>
              ))}
            </div>
        </div>
      }
    </div>
  );
};

export default LeftSidebar;