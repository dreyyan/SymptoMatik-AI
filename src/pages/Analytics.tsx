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

const Analytics = () => {
  document.title = "SymptoMatik: Analytics";

  const [caseTrends, setCaseTrends] = useState<CaseTrendData[]>([]);
  const [outbreakAlerts, setOutbreakAlerts] = useState<OutbreakAlert[]>([]);

  // Mock data for Case Trends (Philippines pediatric cases)
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
        description: "Rapid increase in cases among preschool children in urban areas.",
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
        description: "Outbreak confirmed in school clusters; vaccination drive initiated.",
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
            label: "Pediatric Cases",
            data: caseTrends.map((trend) => trend.cases),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "rgb(59, 130, 246)",
            pointBorderColor: "white",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Monthly Case Trends (2025)",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50,
            },
            title: {
              display: true,
              text: "Number of Cases",
            },
          },
          x: {
            title: {
              display: true,
              text: "Month",
            },
          },
        },
      },
    });

    // Store chart reference
    (ctx as any).chartInstance = newChart;

    return () => {
      newChart.destroy();
    };
  }, [caseTrends]);

  const severityColors: Record<string, string> = {
    Low: "bg-green-100 text-green-800 border-green-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    High: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left: Case Trends */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h2 className="text-xl font-bold text-[var(--trust-blue)] mb-4">
              Case Trends - Philippines (Pediatric Cases)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Monthly reported cases of common pediatric diseases (2025)
            </p>
            <div className="h-64 bg-gray-50 rounded-lg p-4">
              <canvas id="caseTrendsChart" className="w-full h-full"></canvas>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-[var(--trust-blue)] mb-2">
              Trend Summary
            </h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Current Month (Oct 2025):</span>{" "}
              {caseTrends[caseTrends.length - 1]?.cases || 0} cases
              <br />
              <span className="font-semibold">Monthly Change:</span> +15% from
              September
              <br />
              <span className="font-semibold">Year-over-Year:</span> +8% increase
              from Oct 2024
            </p>
          </div>
        </div>
        {/* Right: Outbreak Alerts */}
        <div className="w-1/2">
          <div className="bg-white p-6 rounded-lg shadow mb-4">
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
                        ? "bg-red-500"
                        : alert.severity === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-[var(--trust-blue)] mb-2">
              Regional Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold">Metro Manila</p>
                <p className="text-gray-600">42% of cases</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold">Cebu</p>
                <p className="text-gray-600">18% of cases</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold">Davao</p>
                <p className="text-gray-600">15% of cases</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold">Ilocos</p>
                <p className="text-gray-600">12% of cases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Analytics;