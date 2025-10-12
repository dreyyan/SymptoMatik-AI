import { useMemo } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

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

// Mock data for professionals (Metro Manila version)
const professionals = [
  {
    name: "Dr. Juan dela Cruz",
    specialty: "Infectious Disease Specialist",
    medicalPlace: "St. Luke’s Medical Center Extension Clinic",
    address: "1177 Jorge Bocobo Street, Ermita, Manila 1000, Philippines",
  },
  {
    name: "Dr. Ana Reyes",
    specialty: "Cardiologist",
    medicalPlace: "The Medical City Clinic — Exquadra Tower, Ortigas Center",
    address: "17th Floor, Exquadra Tower, Exchange Road corner Jade Drive, Ortigas Center, Pasig City, Metro Manila",
  },
  {
    name: "Dr. Abad Santos",
    specialty: "Chronic Disease Specialist",
    medicalPlace: "Clinica Manila — SM Megamall Branch",
    address: "2nd Floor, Building A, SM Megamall, Mandaluyong City, Metro Manila",
  },
  {
    name: "Dr. Aaron Chua",
    specialty: "Pediatrician",
    medicalPlace: "Aaron Medical Clinic",
    address: "No. 1923 San Marcelino Street, Barangay 691 Zone 75, Malate, Manila 1004, Metro Manila",
  },
];

// Mapping of specialties to classifications
const specialtyToClassification: Record<string, string | string[]> = {
  "Infectious Disease Specialist": "Infectious",
  Cardiologist: "Chronic",
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
      const specialtyClassifications = Array.isArray(specialtyToClassification[professional.specialty])
        ? specialtyToClassification[professional.specialty] as string[]
        : [specialtyToClassification[professional.specialty]] as string[];

      const matchingClassifications = nodeClassifications.filter((classification) =>
        specialtyClassifications.includes(classification)
      );

      // Assign a score: prioritize specialists with a higher base score
      const isGeneralist = Array.isArray(specialtyToClassification[professional.specialty]);
      const baseScore = isGeneralist ? 1 : 2; // Specialists get double the base score
      const score = matchingClassifications.length * baseScore;

      return {
        ...professional,
        score,
        matchCount: matchingClassifications.length,
      };
    });

    return scoredProfessionals
      .filter((prof) => prof.matchCount > 0)
      .sort((a, b) => {
        // Primary sort by score (specialists with higher base score win)
        if (b.score !== a.score) return b.score - a.score;
        // Secondary sort: prefer specialists over generalists
        const aIsGeneralist = Array.isArray(specialtyToClassification[a.specialty]);
        const bIsGeneralist = Array.isArray(specialtyToClassification[b.specialty]);
        if (aIsGeneralist !== bIsGeneralist) return aIsGeneralist ? 1 : -1;
        // Tertiary sort: alphabetical by name
        return a.name.localeCompare(b.name);
      });
  }, [nodeClassifications]);

  const connectWithDoctor = () => {
    navigate('/consultation-patient');
  };

  return (
    <div className="min-h-screen xl:min-w-100 lg:min-w-60 flex flex-col items-end overflow-y-auto xl:p-4 lg:p-3 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
      <h3 className="xl:text-xl lg:text-lg inter-semibold text-end text-[var(--trust-blue)]">Suitable Professionals</h3>
      {nodes.length === 0 ? (
        <p className="text-sm inter text-gray-600">No symptoms selected.</p>
      ) : recommendedProfessionals.length === 0 ? (
        <p className="text-sm inter text-gray-600">No suitable professionals found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="xl:text-sm lg:text-xs inter text-[var(--slate-gray)] text-right">SymptoMatik-AI thinks you should contact...</p>
          {recommendedProfessionals.map((professional, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.1)] transition-all duration-200 xl:max-w-90 lg:max-w-70"
            >
              <div className="flex flex-row items-center gap-2">
                <img src="doctor-icon-1.jpg" className="xl:w-9 xl:h-9 lg:w-6 lg:h-6 rounded-full" />
                <div className="flex flex-col">
                  <p className="text-base inter-semibold text-[var(--trust-blue)]">{professional.name}</p>
                  <p className="text-sm inter text-[var(--slate-gray)]">{professional.specialty}</p>
                </div>
              </div>
              <hr className="my-2 border-t border-gray-300" />
              <p className="text-sm inter-semibold text-[var(--trust-blue)]">{professional.medicalPlace}</p>
              <p className="text-xs inter text-[var(--slate-gray)] mb-4">{professional.address}</p>
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