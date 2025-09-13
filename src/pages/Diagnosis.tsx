import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import NodeContainer from "../components/NodeContainer";

const Diagnosis = () => {
  useEffect(() => {
    document.title = "SymptoMatik: Diagnosis";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left: Symptoms List */}
        <div className="w-[20%]">
          <LeftSidebar />
        </div>

        {/* Right: Droppable Area */}
        <div className="w-3/4">
          <NodeContainer />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Diagnosis;