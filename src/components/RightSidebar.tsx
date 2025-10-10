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
  const nodeSymptoms = nodes.reduce(
    (acc, node) => ({
      ...acc,
      [node.value]: node.severity,
    }),
    {} as Record<string, string>
  );

  // Calculate probability score and filter matching diseases
  const scoredDiseases = diseases
    .map((disease) => {
      const matchingSymptoms = disease.symptoms.filter(
        (symptom) => nodeSymptoms[symptom]
      );
      const score = matchingSymptoms.reduce(
        (sum, symptom) => sum + (severityScores[nodeSymptoms[symptom]] || 0),
        0
      );
      // Calculate confidence as a percentage: (score / max possible score) * 100
      const maxScore = disease.symptoms.length * severityScores.High; // Max score assumes all symptoms are High severity
      const confidence =
        maxScore > 0 ? Math.min(Math.round((score / maxScore) * 100), 100) : 0;
      return {
        disease,
        score,
        matchCount: matchingSymptoms.length,
        confidence,
      };
    })
    .filter((item) => item.matchCount > 0) // Only include diseases with at least one matching symptom
    .sort((a, b) => {
      // Sort by confidence (descending), then by match count (descending), then by disease name (alphabetical)
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return a.disease.diseaseName.localeCompare(b.disease.diseaseName);
    });

  return (
    <div className="min-h-screen flex flex-col items-end flex-1 overflow-y-auto gap-2 p-4 bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] w-[100%] w-80">
      <h3 className="text-xl text-left inter-semibold text-[var(--primary-teal)]">
        Possible Diseases
      </h3>
      {Object.keys(nodeSymptoms).length === 0 ? (
        <p className="text-sm text-gray-600">No symptoms selected.</p>
      ) : scoredDiseases.length === 0 ? (
        <p className="text-sm text-gray-600">No matching diseases found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-end text-[var(--slate-gray)]">
            SymptoMatik-AI thinks your patient has...
          </p>
          {scoredDiseases.map((item, index) => (
            <Disease
              key={index}
              diseaseName={item.disease.diseaseName}
              classification={item.disease.classification}
              severity={item.disease.severity as "Low" | "Medium" | "High"}
              symptoms={item.disease.symptoms}
              description={item.disease.description}
              transmission={item.disease.transmission}
              treatment={item.disease.treatment}
              prevention={item.disease.prevention}
              prognosis={item.disease.prognosis}
              confidenceLevel={item.confidence}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
