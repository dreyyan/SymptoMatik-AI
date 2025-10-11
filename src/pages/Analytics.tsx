/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import Header from "../components/Header";
import Footer from "../components/Footer";

type CaseTrendData = {
  month: string;
  cases: number;
};

type OutbreakAlert = {
  id: string;
  region: string;
  disease: string;
  severity: "Low" | "Medium" | "High";
  date: string;
  description: string;
};

type SymptomData = {
  symptom: string;
  count: number;
};

const Analytics = () => {
  document.title = "SymptoMatik: Analytics";

  const [caseTrends, setCaseTrends] = useState<CaseTrendData[]>([]);
  const [outbreakAlerts, setOutbreakAlerts] = useState<OutbreakAlert[]>([]);
  const [symptomData, setSymptomData] = useState<SymptomData[]>([]);

  // Mock data for Case Trends (general health cases in Philippines)
  useEffect(() => {
    const mockCaseTrends: CaseTrendData[] = [
      { month: "Jan 2025", cases: 120 },
      { month: "Feb 2025", cases: 150 },
      { month: "Mar 2025", cases: 180 },
      { month: "Apr 2025", cases: 210 },
      { month: "May 2025", cases: 190 },
      { month: "Jun 2025", cases: 220 },
      { month: "Jul 2025", cases: 250 },
      { month: "Aug 2025", cases: 230 },
      { month: "Sep 2025", cases: 260 },
    ];
    setCaseTrends(mockCaseTrends);
  }, []);

  // Mock data for Outbreak Alerts
  useEffect(() => {
    const mockOutbreakAlerts: OutbreakAlert[] = [
      {
        id: "1",
        region: "Metro Manila",
        disease: "Hand, Foot, and Mouth Disease",
        severity: "High",
        date: "October 5, 2025",
        description: "Rapid increase in cases in urban areas.",
      },
      {
        id: "2",
        region: "Cebu",
        disease: "Dengue Fever",
        severity: "Medium",
        date: "October 3, 2025",
        description: "Seasonal spike in dengue cases; enhanced surveillance recommended.",
      },
      {
        id: "3",
        region: "Davao",
        disease: "Measles",
        severity: "High",
        date: "September 28, 2025",
        description: "Outbreak confirmed in communities; vaccination drive initiated.",
      },
      {
        id: "4",
        region: "Ilocos Region",
        disease: "Influenza",
        severity: "Low",
        date: "September 25, 2025",
        description: "Mild increase in flu cases; standard precautions advised.",
      },
    ];
    setOutbreakAlerts(mockOutbreakAlerts);
  }, []);

  // Mock data for Top Symptoms Reported
  useEffect(() => {
    const mockSymptomData: SymptomData[] = [
      { symptom: "Fever", count: 350 },
      { symptom: "Cough", count: 280 },
      { symptom: "Rash", count: 200 },
      { symptom: "Headache", count: 150 },
    ];
    setSymptomData(mockSymptomData);
  }, []);

  // Chart.js configuration for Case Trends
  useEffect(() => {
    const ctx = document.getElementById("caseTrendsChart") as HTMLCanvasElement;
    if (!ctx) return;

    // Destroy existing chart if it exists
    const existingChart = (ctx as any).chartInstance;
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: caseTrends.map((trend) => trend.month),
        datasets: [
          {
            label: "Health Cases",
            data: caseTrends.map((trend) => trend.cases),
            borderColor: "#02a9a6",
            backgroundColor: "rgba(2, 169, 166, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#02a9a6",
            pointBorderColor: "white",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Philippines Health Case Trends",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Cases",
            },
          },
        },
      },
    });

    // Save the new chart instance
    (ctx as any).chartInstance = newChart;

    return () => {
      newChart.destroy();
    };
  }, [caseTrends]);

  // Chart.js configuration for Regional Breakdown Pie Chart
  useEffect(() => {
    const ctx = document.getElementById("regionalBreakdownChart") as HTMLCanvasElement;
    if (!ctx) return;

    // Destroy existing chart if it exists
    const existingChart = (ctx as any).chartInstance;
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Metro Manila", "Cebu", "Davao", "Ilocos Region", "Others"],
        datasets: [
          {
            label: "Case Distribution",
            data: [42, 18, 15, 12, 13],
            backgroundColor: [
              "#4db6ac",
              "#f0c14b",
              "#da4b41ff",
              "#81c784",
              "#9575cd",
            ],
            borderColor: ["#ffffff"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
          title: {
            display: true,
            text: "Regional Case Distribution",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw as number;
                return `${label}: ${value}%`;
              },
            },
          },
        },
      },
    });

    // Save the new chart instance
    (ctx as any).chartInstance = newChart;

    return () => {
      newChart.destroy();
    };
  }, []);

  // Chart.js configuration for Top Symptoms Reported
  useEffect(() => {
    const ctx = document.getElementById("symptomsChart") as HTMLCanvasElement;
    if (!ctx) return;

    // Destroy existing chart if it exists
    const existingChart = (ctx as any).chartInstance;
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: symptomData.map((data) => data.symptom),
        datasets: [
          {
            label: "Symptom Reports",
            data: symptomData.map((data) => data.count),
            backgroundColor: "#4db6ac",
            borderColor: "#02a9a6",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Top Reported Symptoms",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Symptom",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Reports",
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Save the new chart instance
    (ctx as any).chartInstance = newChart;

    return () => {
      newChart.destroy();
    };
  }, [symptomData]);

  const severityColors = {
    Low: "bg-[#4db6ac]",
    Medium: "bg-[#f0c14b]",
    High: "bg-[#da4b41ff]",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Analytics Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[var(--trust-blue)] mb-6">
          Health Analytics Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Case Trends Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-[var(--trust-blue)] mb-4">
              Case Trends
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Monthly health case trends in the Philippines
            </p>
            <canvas id="caseTrendsChart" className="w-full h-64"></canvas>
          </div>

          {/* Outbreak Alerts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-[var(--trust-blue)] mb-4">
              Outbreak Alerts
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Active alerts and surveillance notifications
            </p>
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {outbreakAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-3 p-3 border rounded-lg bg-gray-50"
                >
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "High"
                        ? "bg-[#da4b41ff]"
                        : alert.severity === "Medium"
                        ? "bg-[#f0c14b]"
                        : "bg-[#4db6ac]"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[var(--trust-blue)]">
                        {alert.disease}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[alert.severity]}`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.region}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      {alert.description}
                    </p>
                  </div>
                </div>
              ))}
              {outbreakAlerts.length === 0 && (
                <p className="text-sm text-gray-600 text-center italic">
                  No active outbreak alerts
                </p>
              )}
            </div>
          </div>

          {/* Regional Breakdown Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-[var(--trust-blue)] mb-4">
              Regional Case Distribution
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Percentage of health cases by region
            </p>
            <div className="w-[600px] h-[500px] mx-auto">
              <canvas id="regionalBreakdownChart"></canvas>
            </div>
          </div>

          {/* Top Symptoms Reported */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-[var(--trust-blue)] mb-4">
              Top Reported Symptoms
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Most frequently reported symptoms across cases
            </p>
            <canvas id="symptomsChart" className="w-full h-64"></canvas>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Analytics;