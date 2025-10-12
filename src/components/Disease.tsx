import { useState } from "react";

type DiseaseProps = {
  diseaseName: string;
  classification: string;
  severity: "Low" | "Medium" | "High";
  symptoms: string[];
  description?: string;
  transmission?: string;
  treatment?: string;
  prevention?: string;
  prognosis?: string;
  confidenceLevel?: number; // Confidence level as a percentage (0-100)
};

const Disease = ({
  diseaseName,
  classification,
  severity,
  symptoms = [],
  description,
  transmission,
  treatment,
  prevention,
  prognosis,
  confidenceLevel,
}: DiseaseProps) => {
  const [expanded, setExpanded] = useState(false);

  // Determine confidence level color based on percentage
  const getConfidenceColor = (confidence: number | undefined) => {
    if (confidence === undefined) return 'bg-[#d1d5db]';
    if (confidence <= 33) return 'bg-[#ff6f61]';
    if (confidence <= 66) return 'bg-[#005566]';
    return 'bg-[#02a9a6]';
  };

  // Map severity to hex colors
  const severityColor = {
    High: 'text-[#ff6f61]',
    Medium: 'text-[#f0c14b]',
    Low: 'text-[#02a9a6]',
  };

  return (
    <div className="flex flex-col gap-3 p-4 mb-2 rounded-xl text-[#005566] xl:w-90 lg:w-60 shadow-[0_0_6px_rgba(0,0,0,0.15)] bg-[#f5f7fa] sm:p-3">
      <div className="flex justify-between items-center">
        {/* Disease Name */}
        <h3 className="text-lg font-bold text-[#005566] sm:text-base">
          {diseaseName}
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-[#4a5e6d] hover:text-[#005566] focus:ring-2 focus:ring-[#02a9a6] focus:outline-none rounded transition-all duration-300 sm:text-xs"
          aria-expanded={expanded}
          aria-controls={`disease-details-${diseaseName}`}
        >
          {expanded ? "Show less ▲" : "Show more ▼"}
        </button>
      </div>

      {/* Classification & Severity */}
      <div className="flex justify-between text-sm text-[#4a5e6d] sm:text-xs">
        <span className="italic">Classification: {classification}</span>
        <span className={`text-end font-semibold ${severityColor[severity]}`}>
          Severity: {severity}
        </span>
      </div>

      {/* Confidence Level */}
      {confidenceLevel !== undefined && (
        <div className="flex flex-col">
          <div className="text-sm text-[#005566] font-semibold mt-2 sm:text-xs">
            Confidence Level:
          </div>
          <div className="flex-1 bg-[#e5e7eb] rounded-full h-3.5 sm:h-3 mt-1">
            <div
              className={`h-3.5 rounded-full transition-all duration-300 ${getConfidenceColor(confidenceLevel)}`}
              style={{ width: `${confidenceLevel}%` }}
              role="progressbar"
              aria-valuenow={confidenceLevel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Confidence level ${confidenceLevel}%`}
            ></div>
          </div>
        </div>
      )}

      {/* Short Description */}
      {description && !expanded && (
        <p className="text-sm text-[#4a5e6d] line-clamp-2 sm:text-xs">{description}</p>
      )}

      {/* Expandable Section */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        id={`disease-details-${diseaseName}`}
      >
        <div className="flex flex-col gap-3 mt-3">
          {description && (
            <div>
              <h4 className="font-semibold text-sm text-[#005566] sm:text-xs">
                Description:
              </h4>
              <p className="text-sm text-[#4a5e6d] sm:text-xs">{description}</p>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-sm text-[#005566] sm:text-xs">Symptoms:</h4>
            <ul className="list-disc list-inside text-sm text-[#4a5e6d] sm:text-xs">
              {symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
          {transmission && (
            <div>
              <h4 className="font-semibold text-sm text-[#005566] sm:text-xs">
                Transmission:
              </h4>
              <p className="text-sm text-[#4a5e6d] sm:text-xs">{transmission}</p>
            </div>
          )}
          {treatment && (
            <div>
              <h4 className="font-semibold text-sm text-[#005566] sm:text-xs">Treatment:</h4>
              <p className="text-sm text-[#4a5e6d] sm:text-xs">{treatment}</p>
            </div>
          )}
          {prevention && (
            <div>
              <h4 className="font-semibold text-sm text-[#005566] sm:text-xs">Prevention:</h4>
              <p className="text-sm text-[#4a5e6d] sm:text-xs">{prevention}</p>
            </div>
          )}
          {prognosis && (
            <div>
              <h4 className="font-semibold text-sm text-[#005566] sm:text-xs">Prognosis:</h4>
              <p className="text-sm text-[#4a5e6d] sm:text-xs">{prognosis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Disease;