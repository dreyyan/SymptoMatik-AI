import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

type MessageType = {
  id: string;
  sender: "patient" | "doctor";
  text: string;
  timestamp: string;
};

type DoctorType = {
  id: string;
  name: string;
  specialty: string;
  mockConversation: MessageType[];
};

const ConsultADoctor = () => {
  document.title = "SymptoMatik: Consult A Doctor";

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [showOthersMenu, setShowOthersMenu] = useState<boolean>(false);

  // Mock doctor data with Tagalog conversations
  const doctors: DoctorType[] = [
    {
      id: "1",
      name: "Dr. Tim Bautista",
      specialty: "Pediatrician",
      mockConversation: [
        {
          id: "1-1",
          sender: "patient",
          text: "Magandang araw, Doktor. Ang anak ko po ay may lagnat at ubo simula kahapon. Ano po ang dapat kong gawin?",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "1-2",
          sender: "doctor",
          text: "Magandang araw din! Ilang taon po ang anak mo, at gaano kataas ang lagnat? May iba pa bang sintomas, tulad ng sipon o pananakit ng katawan?",
          timestamp: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "1-3",
          sender: "patient",
          text: "Apat na taon po siya. Ang lagnat ay mga 38.5°C, at may kaunting sipon din po. Hindi naman siya masyadong masakit ang katawan.",
          timestamp: new Date(Date.now() - 3 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "1-4",
          sender: "doctor",
          text: "Sige po, pakikalmahan mo muna ang lagnat gamit ang paracetamol para sa edad niya. Siguraduhing hydrated siya—bigyan ng maraming tubig at juice. Subaybayan mo ang lagnat sa susunod na 48 oras. Kung lumala o may bagong sintomas, mag-follow-up ka agad, ha?",
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    },
    {
      id: "2",
      name: "Dr. Juan Dela Cruz",
      specialty: "General Practitioner",
      mockConversation: [
        {
          id: "2-1",
          sender: "patient",
          text: "Dok, kamusta po? May pananakit po ang tiyan ko pagkatapos kumain. Parang gas pain, pero madalas.",
          timestamp: new Date(Date.now() - 6 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "2-2",
          sender: "doctor",
          text: "Kumusta! Ilang araw na bang ganyan ang tiyan mo? May pagbabago ba sa pagkain mo o may diarrhea ka rin? Anong edad mo po?",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "2-3",
          sender: "patient",
          text: "Mga tatlong araw na po. Wala namang diarrhea, pero minsan parang bloated. 35 po ako.",
          timestamp: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "2-4",
          sender: "doctor",
          text: "Maaaring acid reflux o dyspepsia yan. Iwasan muna ang maanghang, mamantika, at kape. Subukan mo rin ang over-the-counter antacid tulad ng omeprazole. Kung hindi bumuti sa loob ng isang linggo, magpatingin sa klinika para sa blood tests, okay?",
          timestamp: new Date(Date.now() - 3 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    },
    {
      id: "3",
      name: "Dra. Ana Reyes",
      specialty: "Allergist",
      mockConversation: [
        {
          id: "3-1",
          sender: "patient",
          text: "Magandang umaga, Doktora. Ang anak ko po ay may mga pantal sa balat at madalas humihikab. Allergic reaction po kaya ito?",
          timestamp: new Date(Date.now() - 7 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "3-2",
          sender: "doctor",
          text: "Magandang umaga! Posible ngang allergic reaction yan. Ilang taon ang anak mo, at may kinain ba siyang bago o nalantad sa bagong halaman? May lagnat ba siya o hirap sa paghinga?",
          timestamp: new Date(Date.now() - 6 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "3-3",
          sender: "patient",
          text: "Siyam na taon po siya. Wala namang lagnat o hirap sa paghinga, pero kumain siya ng hipon kahapon. Mga tatlong araw na rin po ang pantal.",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "3-4",
          sender: "doctor",
          text: "Mukhang posible na allergic sa hipon yan. Bigyan mo muna ng antihistamine tulad ng cetirizine, sundin ang dosage para sa edad niya. Iwasan ang hipon at iba pang seafood sa ngayon. Kung lumala ang pantal o may bagong sintomas, dalhin mo agad sa doktor para i-check, ha?",
          timestamp: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    },
  ];

  const handleSelectDoctor = (doctor: DoctorType) => {
    setSelectedDoctor(doctor);
    // Load mock conversation for the selected doctor
    setMessages(doctor.mockConversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedDoctor) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      sender: "patient",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    // Simulate doctor response in Tagalog
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "doctor",
          text: `Sige po, salamat sa impormasyon. Ano pa po ang ibang sintomas o tanong mo tungkol sa ${messageInput}?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  const handleCallDoctor = () => {
    if (!selectedDoctor) {
      console.log("Walang napiling doktor para sa tawag");
      return;
    }
    console.log(`Tumatawag kay ${selectedDoctor.name} (${selectedDoctor.specialty})`);
    // Placeholder for actual call functionality (e.g., WebRTC integration)
  };

  const handleOthersAction = (str: string) => {

  };

  const toggleOthersMenu = () => {

  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left: Doctor List Sidebar */}
        <div className="w-1/5 h-screen bg-gray-100 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[var(--trust-blue)] mb-4">Mga Available na Doktor</h3>
          <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`flex items-center gap-4 text-sm font-semibold text-[var(--trust-blue)] p-2 rounded cursor-pointer ${
                  selectedDoctor?.id === doctor.id ? "bg-blue-100" : "hover:bg-gray-200"
                }`}
                onClick={() => handleSelectDoctor(doctor)}
              >
                <img className="w-8 rounded-full" src="doctor-icon.webp" alt="Icon ng Doktor" />
                <div>
                  <p>{doctor.name}</p>
                  <p className="text-xs text-gray-600">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Center: Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedDoctor ? (
            <>
              <div className="bg-white p-4 rounded-tl-lg rounded-tr-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[var(--trust-blue)]">{selectedDoctor.name}</h2>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                      onClick={handleCallDoctor}
                    >
                      <img className="w-5" src="phone-icon.svg" alt="Icon ng Tawag" />
                    </button>
                    <button
                      className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                      onClick={handleCallDoctor}
                    >
                      <img className="w-5" src="video-call-icon.svg" alt="Icon ng Tawag" />
                    </button>
                    <div className="relative">
                      <button
                        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                        onClick={toggleOthersMenu}
                      >
                        <img className="w-5" src="others-icon.svg" alt="Icon ng Iba Pa" />
                      </button>
                      {showOthersMenu && (
                        <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md p-2 z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleOthersAction("Share File")}
                          >
                            Magbahagi ng File
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleOthersAction("End Consultation")}
                          >
                            Tapusin ang Konsultasyon
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 rounded-bl-lg rounded-br-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"} mb-2`}
                      >
                        {message.sender === "doctor" && (
                          <img className="w-8 h-8 rounded-full mr-2 mb-4 self-end" src="doctor-icon.webp" alt="Icon ng Doktor" />
                        )}
                        <div
                          className={`max-w-[70%] mb-4 p-3 rounded-lg ${
                            message.sender === "patient"
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 text-center">Simulan ang pag-uusap kay {selectedDoctor.name}</p>
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Mag-type ng mensahe..."
                    className="flex-1 rounded-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                  >
                    <img className="w-5" src="send-icon.svg" alt="Icon ng Ipadala" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 bg-gray-100 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] flex items-center justify-center">
              <p className="text-sm text-gray-600">Pumili ng doktor para simulan ang konsultasyon</p>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConsultADoctor;