import { useState } from "react";

type DiseaseProps = {
  diseaseName: string;
  classification: string;
  severity: "Mild" | "Moderate" | "Severe";
  symptoms: string[];
  description?: string;
  transmission?: string;
  treatment?: string;
  prevention?: string;
  prognosis?: string;
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
}: DiseaseProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl text-[var(--trust-blue)] shadow-[0px_-4px_10px_-5px_rgba(0,0,0,0.45)] bg-white">
      {/* Disease Name */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-[var(--trust-blue)]">
          {diseaseName}
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-[var(--trust-blue)]"
        >
          {expanded ? "Show less ▲" : "Show more ▼"}
        </button>
      </div>

      {/* Classification & Severity */}
      <div className="flex justify-between text-sm text-gray-600">
        <span className="italic">Classification: {classification}</span>
        <span
          className={`font-semibold ${
            severity === "Severe"
              ? "text-red-600"
              : severity === "Moderate"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          Severity: {severity}
        </span>
      </div>

      {/* Short Description */}
      {description && !expanded && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}

      {/* Expandable Details */}
      {expanded && (
        <>
          {description && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700">
                Description:
              </h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}

          {/* Symptoms */}
          <div>
            <h4 className="font-semibold text-sm text-gray-700">Symptoms:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>

          {transmission && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Transmission:</h4>
              <p className="text-sm text-gray-600">{transmission}</p>
            </div>
          )}

          {treatment && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Treatment:</h4>
              <p className="text-sm text-gray-600">{treatment}</p>
            </div>
          )}

          {prevention && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Prevention:</h4>
              <p className="text-sm text-gray-600">{prevention}</p>
            </div>
          )}

          {prognosis && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Prognosis:</h4>
              <p className="text-sm text-gray-600">{prognosis}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Disease;
