import { useMemo } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import { Navigate, useNavigate } from "react-router-dom";

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
    name: "Dr. Jane Smith",
    specialty: "Infectious Disease Specialist",
    medicalPlace: "City Pediatric Clinic",
    address: "123 Health St, Springfield, IL 62701",
  },
  {
    name: "Dr. Michael Lee",
    specialty: "Allergist",
    medicalPlace: "Allergy Care Center",
    address: "456 Wellness Ave, Springfield, IL 62702",
  },
  {
    name: "Dr. Emily Chen",
    specialty: "Chronic Disease Specialist",
    medicalPlace: "Springfield General Hospital",
    address: "789 Healing Rd, Springfield, IL 62703",
  },
  {
    name: "Dr. Robert Patel",
    specialty: "Pediatrician",
    medicalPlace: "Family Health Clinic",
    address: "321 Care Lane, Springfield, IL 62704",
  },
];

const specialtyToClassification = {
  "Infectious Disease Specialist": "Infectious",
  Allergist: "Allergic",
  "Chronic Disease Specialist": "Chronic",
  Pediatrician: ["Infectious", "Allergic", "Chronic"], // Generalist can handle all
};

const RightSidebarPatient = ({ nodes }: RightSidebarPatientProps) => {
  const navigate = useNavigate();

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

  const connectWithDoctor = () => {
    navigate('/consultation-patient')
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] w-80 overflow-y-auto">
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
              className="bg-white p-4 rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="flex flex-row items-center gap-2">
                <img src="doctor-icon-1.jpg" className="w-9 h-9 rounded-full"/>
                <div className="flex flex-col">
                  <p className="text-base inter-semibold text-[var(--trust-blue)]">{professional.name}</p>
                  <p className="text-sm inter italic text-[var(--slate-gray)]">{professional.specialty}</p>                  
                </div>
              </div>
              <hr className="my-2 border-t border-gray-300" />
              <p className="text-sm inter font-semibold text-[var(--trust-blue)]">{professional.medicalPlace}</p>
              <p className="text-sm inter text-[var(--slate-gray)] mb-4">{professional.address}</p>
              <PrimaryButton
                text="Connect"
                onClick={connectWithDoctor}
                width="100%"
                fontSize="16px"
                height="32px"
                disabled={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebarPatient;