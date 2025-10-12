import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type MessageType = {
  id: string;
  sender: "patient" | "doctor";
  text: string;
  timestamp: string;
};

type PatientType = {
  id: string;
  name: string;
  age: string; // Added for doctor context
  mockConversation: MessageType[];
};

const Consultation = () => {
  document.title = "SymptoMatik: Konsultasyon - Doktor";

  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [showOthersMenu, setShowOthersMenu] = useState<boolean>(false);

  // Mock patient data with Tagalog conversations
  const patients: PatientType[] = [
    {
      id: "1",
      name: "Maria Santos",
      age: "28 years old",
      mockConversation: [
        {
          id: "1-1",
          sender: "patient",
          text: "Magandang araw po, Dok Juan. Nilalagnat ako simula kagabi at masakit ang katawan ko. Parang nanghihina rin ako.",
          timestamp: new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "1-2",
          sender: "doctor",
          text: "Magandang araw din, Maria. May kasabay bang ubo, sipon, o pananakit ng lalamunan? Ilang beses mo na bang nararanasan ito nitong mga nakaraang linggo?",
          timestamp: new Date(Date.now() - 7 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "1-3",
          sender: "patient",
          text: "Opo, may konting ubo at masakit din ang lalamunan ko. Madalas din po akong giniginaw at madaling mapagod.",
          timestamp: new Date(Date.now() - 6 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "1-4",
          sender: "doctor",
          text: "Sige, base sa mga sintomas mo, posible itong viral infection gaya ng trangkaso o influenza. I-monitor mo muna ang temperatura mo. Uminom ng maraming tubig, pahinga, at paracetamol kung masakit ang ulo o lagnatin. Kung tumaas pa ang lagnat sa 39°C o tumagal ng higit 3 araw, bumalik ka agad dito, ha?",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    },
    {
      id: "2",
      name: "Jose Dela Peña",
      age: "42 years old",
      mockConversation: [
        {
          id: "2-1",
          sender: "patient",
          text: "Dok, palagi pong sumisikip ang dibdib ko. Minsan parang may bigat at mabilis akong hingalin kahit konting lakad lang.",
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "2-2",
          sender: "doctor",
          text: "Jose, kailan mo unang napansin itong paninikip ng dibdib? May kasabay ba itong pawis, pagsusuka, o pagkahilo?",
          timestamp: new Date(Date.now() - 9 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "2-3",
          sender: "patient",
          text: "Mga dalawang linggo na po. Oo, madalas din po akong pinagpapawisan at minsan nasusuka.",
          timestamp: new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "2-4",
          sender: "doctor",
          text: "Sige, Jose. Base sa sintomas mo, kailangan nating i-rule out ang posibleng heart condition gaya ng myocardial infarction. Ire-refer kita kay Dr. Ana Reyes, isang cardiologist. Sa ngayon, iwasan mo muna ang mabibigat na gawain at paninigarilyo. Kung lalong sumikip ang dibdib o mahirapan kang huminga, pumunta agad sa emergency room.",
          timestamp: new Date(Date.now() - 7 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    },
    {
      id: "3",
      name: "Liza Mendoza",
      age: "9 years old",
      mockConversation: [
        {
          id: "3-1",
          sender: "patient",
          text: "Dok, anak ko po may mga pantal sa braso at leeg. Tatlong araw na po ito, parang allergy.",
          timestamp: new Date(Date.now() - 6 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "3-2",
          sender: "doctor",
          text: "Sige po, may kinain ba siyang bago nitong mga araw na to? May lagnat o hirap ba sa paghinga?",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "3-3",
          sender: "patient",
          text: "Kumain po siya ng hipon nung isang araw. Wala namang lagnat pero makati po ang mga pantal.",
          timestamp: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: "3-4",
          sender: "doctor",
          text: "Posibleng allergic reaction yan sa hipon. Bigyan ng antihistamine tulad ng cetirizine. Iwas muna sa seafood. Kung lumala o magka-hirap sa paghinga, dalhin agad sa ospital, ha?",
          timestamp: new Date(Date.now() - 3 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    },
  ];

  const handleSelectPatient = (patient: PatientType) => {
    setSelectedPatient(patient);
    // Load mock conversation for the selected patient
    setMessages(patient.mockConversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedPatient) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      sender: "doctor",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    // Simulate patient's response after a short delay
    setTimeout(() => {
      const patientResponse: MessageType = {
        id: Date.now().toString(),
        sender: "patient",
        text: "Salamat po sa payo, Doktor. Susubukan ko po ito.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, patientResponse]);
    }, 1000);
  };

  const handleCallPatient = () => {
    console.log("Tumawag sa pasyente...");
  };

  const toggleOthersMenu = () => {
    setShowOthersMenu((prev) => !prev);
  };

  const handleOthersAction = (action: string) => {
    console.log(`${action} ay napili.`);
    setShowOthersMenu(false);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Left: Patient List */}
        <div className="w-1/4 bg-white rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] p-4">
          <h3 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">My Patients</h3>
          <div className="flex flex-col gap-2">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:bg-gray-100 ${
                  selectedPatient?.id === patient.id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectPatient(patient)}
              >
                <div className="w-8 h-8 bg-gray-400 rounded-full" />
                <div>
                  <p className="text-base inter-semibold text-[var(--trust-blue)]">{patient.name}</p>
                  <p className="text-xs inter text-[var(--slate-gray)]">{patient.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Center: Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
          {selectedPatient ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full" />
                  <div>
                    <h2 className="text-lg inter-semibold text-[var(--trust-blue)]">{selectedPatient.name}</h2>
                    <p className="text-sm inter text-[var(--slate-gray)]">{selectedPatient.age}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                    onClick={handleCallPatient}
                  >
                    <img className="w-5" src="phone-icon.svg" alt="Icon ng Tawag" />
                  </button>
                  <button
                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                    onClick={handleCallPatient}
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
                      <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md p-2 z-10 w-48">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm inter text-[var(--slate-gray)] hover:bg-gray-100 transition-all duration-200"
                          onClick={() => handleOthersAction("View Patient File")}
                        >
                          Tingnan ang File ng Pasyente
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm inter text-red-600 hover:bg-gray-100 transition-all duration-200"
                          onClick={() => handleOthersAction("End Consultation")}
                        >
                          Tapusin ang Konsultasyon
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${message.sender === "doctor" ? "flex-row-reverse" : "flex-row"} items-end gap-2`}
                    >
                      {message.sender === "patient" && (
                        <div className="w-8 h-8 bg-gray-400 rounded-full" />
                      )}
                      <div
                        className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                          message.sender === "doctor"
                            ? "bg-[var(--trust-blue)] text-white rounded-bl-none"
                            : "bg-gray-100 text-gray-800 rounded-br-none"
                        }`}
                      >
                        <p className="text-sm inter">{message.text}</p>
                        <p className="text-xs text-gray-400 mt-1 text-right">{message.timestamp}</p>
                      </div>
                      
                      {message.sender === "doctor" && (
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-md inter-semibold">
                          J
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm inter text-gray-600 text-center mt-20">Simulan ang pag-uusap kay {selectedPatient.name}</p>
                )}
              </div>
              {/* SEND MESSAGE */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Mag-type ng mensahe..."
                    className="flex-1 inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-[var(--trust-blue)] transition-all duration-300 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-[var(--trust-blue)] text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    <img className="w-5" src="send-icon.svg" alt="Icon ng Ipadala" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm inter text-gray-600">Pumili ng pasyente para simulan ang konsultasyon</p>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Consultation;