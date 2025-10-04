import Disease from "./Disease";
import pediatricData from "../data/pediatricData.json";

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
  const diseases = pediatricData.diseases;

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