import { useMemo } from "react";
import PrimaryButton from "./buttons/PrimaryButton";

type NodeType = {
  id: string;
  value: string;
  x: number;
  y: number;
  severity: "Low" | "Medium" | "High";
  classification: "Infectious" | "Allergic" | "Chronic";
};

type RightSidebarPatientProps = {
  nodes: NodeType[];
};

// Mock data for professionals
const professionals = [
  {
    name: "Dr. Maria Santos",
    specialty: "Infectious Disease Specialist",
    medicalPlace: "Maynila Pediatric Center",
    address: "123 Kalusugan St., Ermita, Manila",
  },
  {
    name: "Dr. Michael Dela Cruz",
    specialty: "Allergist",
    medicalPlace: "Quezon City Allergy Clinic",
    address: "456 Kaginhawaan Ave., Diliman, Quezon City",
  },
  {
    name: "Dr. Emily Reyes",
    specialty: "Chronic Disease Specialist",
    medicalPlace: "Makati General Hospital",
    address: "789 Galing Rd., Poblacion, Makati City",
  },
  {
    name: "Dr. Roberto Garcia",
    specialty: "Pediatrician",
    medicalPlace: "Pasig Family Health Clinic",
    address: "321 Aruga Lane, Kapitolyo, Pasig City",
  },
];

const specialtyToClassification = {
  "Infectious Disease Specialist": "Infectious",
  Allergist: "Allergic",
  "Chronic Disease Specialist": "Chronic",
  Pediatrician: ["Infectious", "Allergic", "Chronic"], // Generalist can handle all
};

const handleConnectDoctor = () => {
    
};

const RightSidebarPatient = ({ nodes }: RightSidebarPatientProps) => {
  // Get unique classifications from nodes
  const nodeClassifications = useMemo(() => {
    return Array.from(new Set(nodes.map((node) => node.classification)));
  }, [nodes]);

  // Calculate recommended professionals
  const recommendedProfessionals = useMemo(() => {
    const scoredProfessionals = professionals.map((professional) => {
      const matchingClassifications = Array.isArray(specialtyToClassification[professional.specialty])
        ? nodeClassifications.filter((classification) =>
            specialtyToClassification[professional.specialty].includes(classification)
          )
        : nodeClassifications.includes(specialtyToClassification[professional.specialty])
        ? [specialtyToClassification[professional.specialty]]
        : [];
      const score = matchingClassifications.length;
      return { ...professional, score, matchCount: matchingClassifications.length };
    });

    return scoredProfessionals
      .filter((prof) => prof.matchCount > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score; // Sort by number of matching classifications
        return a.name.localeCompare(b.name); // Then by name
      });
  }, [nodeClassifications]);

  return (
    <div className="min-h-screen flex flex-col gap-2 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] w-100 overflow-y-auto">
      <h3 className="text-xl inter-semibold text-end text-[var(--trust-blue)]">Suitable Professionals</h3>
      {nodes.length === 0 ? (
        <p className="text-sm inter text-gray-600">No symptoms selected.</p>
      ) : recommendedProfessionals.length === 0 ? (
        <p className="text-sm inter text-gray-600">No suitable professionals found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xs inter text-[var(--slate-gray)] text-right">SymptoMatik-AI thinks you should contact...</p>
          {recommendedProfessionals.map((professional, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.1)] hover:shadow-[0_0_4px_rgba(0,0,0,0.2)] transition-all duration-200"
            >
              {/* HEADER */}
                <div className="flex gap-4">
                  <img className="w-10 h-10 rounded-full" src="doctor-icon.webp" alt="Icon ng Doktor" />
                  <div className="">
                    <p className="text-md inter-semibold text-[var(--trust-blue)]">{professional.name}</p>
                    <p className="text-sm inter italic text-[var(--slate-gray)]">{professional.specialty}</p>
                  </div>
                </div>
                <hr className="my-2 mb-4 border-t border-gray-300"/>
                <div className="flex flex-col gap-y-2 mb-4">
                  <span className="flex gap-2"><img className="w-6" src="establishment-icon.svg"/><p className="text-sm inter-semibold text-[var(--trust-blue)]">{professional.medicalPlace}</p></span>
                  <span className="flex gap-2"><img className="w-6" src="current-location-icon.svg"/><p className="text-sm inter text-[var(--slate-gray)]">{professional.address}</p></span>
                </div>
                  <button
                    className="inter-semibold cursor-pointer flex items-center justify-center w-full h-8 rounded-full bg-[var(--healing-teal)] text-[var(--clean-white)] hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1"
                    onClick={handleConnectDoctor}
                  >Connect
                  </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebarPatient;