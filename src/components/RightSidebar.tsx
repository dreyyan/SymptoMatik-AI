import Disease from "./Disease";

type NodeType = {
  id: string;
  value: string;
  x: number;
  y: number;
  severity: "Low" | "Medium" | "High";
  classification: "Infectious" | "Allergic" | "Chronic";
};

type RightSidebarProps = {
  nodes: NodeType[];
};

const RightSidebar = ({ nodes }: RightSidebarProps) => {
  // Sample disease data (replace with actual data source if needed)
  const diseases = [
    {
      diseaseName: "Common Cold",
      classification: "Infectious",
      severity: "Low",
      symptoms: ["Fever", "Cough", "Sore Throat", "Nasal Congestion", "Runny Nose", "Sneezing", "Headache", "Fatigue"],
      description: "A viral infection of the upper respiratory tract.",
      transmission: "Airborne droplets or contact with infected surfaces.",
      treatment: "Rest, fluids, and over-the-counter medications.",
      prevention: "Hand washing and avoiding sick individuals.",
      prognosis: "Full recovery in 7-10 days.",
    },
    {
      diseaseName: "Influenza",
      classification: "Infectious",
      severity: "Medium",
      symptoms: ["Fever", "Cough", "Fatigue", "Headache", "Sore Throat", "Muscle Pain", "Chills"],
      description: "A contagious respiratory illness caused by influenza viruses.",
      transmission: "Airborne droplets or direct contact.",
      treatment: "Antiviral medications and supportive care.",
      prevention: "Annual flu vaccination and good hygiene.",
      prognosis: "Recovery in 1-2 weeks, complications possible.",
    },
    {
      diseaseName: "Allergic Rhinitis",
      classification: "Allergic",
      severity: "Low",
      symptoms: ["Sneezing", "Nasal Congestion", "Itching", "Rash", "Runny Nose"],
      description: "An allergic reaction to environmental allergens.",
      transmission: "Not transmissible.",
      treatment: "Antihistamines and nasal corticosteroids.",
      prevention: "Avoid allergens and use air purifiers.",
      prognosis: "Manageable with treatment.",
    },
    {
      diseaseName: "Chronic Fatigue Syndrome",
      classification: "Chronic",
      severity: "Medium",
      symptoms: ["Fatigue", "Headache", "Muscle Pain"],
      description: "A disorder characterized by extreme fatigue that doesn't improve with rest.",
      transmission: "Not transmissible.",
      treatment: "Symptom management and cognitive behavioral therapy.",
      prevention: "No specific prevention; manage stress and sleep.",
      prognosis: "Varies, often long-term management required.",
    },
    {
      diseaseName: "COVID-19",
      classification: "Infectious",
      severity: "High",
      symptoms: ["Fever", "Cough", "Fatigue", "Shortness of Breath", "Loss of Taste", "Muscle Pain", "Headache", "Sore Throat", "Congestion", "Runny Nose", "Nausea", "Vomiting", "Diarrhea", "Chills"],
      description: "A respiratory illness caused by the SARS-CoV-2 virus.",
      transmission: "Airborne droplets and close contact.",
      treatment: "Supportive care, antivirals, and vaccination.",
      prevention: "Vaccination, masks, and social distancing.",
      prognosis: "Recovery in 2-4 weeks, long-term effects possible.",
    },
    {
      diseaseName: "Asthma",
      classification: "Chronic",
      severity: "Medium",
      symptoms: ["Shortness of Breath", "Cough", "Wheezing", "Chest Tightness"],
      description: "A chronic condition that inflames and narrows the airways.",
      transmission: "Not transmissible.",
      treatment: "Inhalers and avoiding triggers.",
      prevention: "Avoid allergens and irritants.",
      prognosis: "Manageable with treatment.",
    },
    {
      diseaseName: "Migraine",
      classification: "Chronic",
      severity: "Medium",
      symptoms: ["Headache", "Nausea", "Vomiting"],
      description: "A neurological condition causing severe headaches.",
      transmission: "Not transmissible.",
      treatment: "Pain relievers and preventive medications.",
      prevention: "Avoid triggers like stress and certain foods.",
      prognosis: "Episodic, manageable.",
    },
    {
      diseaseName: "Gastroenteritis",
      classification: "Infectious",
      severity: "Low",
      symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal Pain", "Fever", "Headache"],
      description: "Inflammation of the stomach and intestines, often viral.",
      transmission: "Contaminated food or water.",
      treatment: "Hydration and rest.",
      prevention: "Hygiene and safe food handling.",
      prognosis: "Recovery in a few days.",
    },
    {
      diseaseName: "Sinusitis",
      classification: "Chronic",
      severity: "Low",
      symptoms: ["Headache", "Nasal Congestion", "Facial Pain"],
      description: "Inflammation of the sinuses.",
      transmission: "Often follows infections.",
      treatment: "Decongestants and antibiotics if bacterial.",
      prevention: "Treat allergies and avoid irritants.",
      prognosis: "Acute resolves quickly; chronic may persist.",
    },
  ];

  // Severity scoring for probability
  const severityScores: Record<string, number> = {
    High: 3,
    Medium: 2,
    Low: 1,
    undefined: 0,
  };

  // Get node symptoms with their severities
  const nodeSymptoms = nodes.reduce((acc, node) => ({
    ...acc,
    [node.value]: node.severity,
  }), {} as Record<string, string>);

  // Calculate probability score and filter matching diseases
  const scoredDiseases = diseases
    .map((disease) => {
      const matchingSymptoms = disease.symptoms.filter((symptom) => nodeSymptoms[symptom]);
      const score = matchingSymptoms.reduce((sum, symptom) => sum + (severityScores[nodeSymptoms[symptom]] || 0), 0);
      return { disease, score, matchCount: matchingSymptoms.length };
    })
    .filter((item) => item.matchCount > 0) // Only include diseases with at least one matching symptom
    .sort((a, b) => {
      // Sort by score (descending), then by match count (descending), then by disease name (alphabetical)
      if (b.score !== a.score) return b.score - a.score;
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return a.disease.diseaseName.localeCompare(b.disease.diseaseName);
    })
    .map((item) => item.disease);

  return (
    <div className="min-h-screen flex flex-col flex-1 overflow-y-auto gap-4 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] w-[100%] rounded-lg w-80">
      <h3 className="text-sm font-semibold text-[var(--trust-blue)]">Possible Diseases</h3>
      {Object.keys(nodeSymptoms).length === 0 ? (
        <p className="text-sm text-gray-600">No symptoms selected.</p>
      ) : scoredDiseases.length === 0 ? (
        <p className="text-sm text-gray-600">No matching diseases found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {scoredDiseases.map((disease, index) => (
            <Disease
              key={index}
              diseaseName={disease.diseaseName}
              classification={disease.classification}
              severity={disease.severity as "Low" | "Medium" | "High"}
              symptoms={disease.symptoms}
              description={disease.description}
              transmission={disease.transmission}
              treatment={disease.treatment}
              prevention={disease.prevention}
              prognosis={disease.prognosis}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;