import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

const ConsultationPatient = () => {
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

    // Simulate doctor's response after a short delay
    setTimeout(() => {
      const doctorResponse: MessageType = {
        id: Date.now().toString(),
        sender: "doctor",
        text: "Salamat sa iyong mensahe. Susuriin ko ito agad.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, doctorResponse]);
    }, 1000);
  };

  const handleCallDoctor = () => {
    console.log("Tumawag sa doktor...");
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
        {/* Left: Doctor List */}
        <div className="w-1/4 bg-white rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] p-4">
          <h3 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Mga Doktor</h3>
          <div className="flex flex-col gap-2">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:bg-gray-100 ${
                  selectedDoctor?.id === doctor.id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectDoctor(doctor)}
              >
                <img className="w-10 h-10 rounded-full" src="doctor-icon.webp" alt="Icon ng Doktor" />
                <div>
                  <p className="text-base inter-semibold text-[var(--trust-blue)]">{doctor.name}</p>
                  <p className="text-xs inter text-[var(--slate-gray)]">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Center: Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
          {selectedDoctor ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full" src="doctor-icon.webp" alt="Icon ng Doktor" />
                  <div>
                    <h2 className="text-lg inter-semibold text-[var(--trust-blue)]">{selectedDoctor.name}</h2>
                    <p className="text-sm inter text-[var(--slate-gray)]">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                    onClick={handleCallDoctor}
                  >
                    <img className="w-5" src="phone-icon.svg" alt="Phone Icon" />
                  </button>
                  <button
                    className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                    onClick={handleCallDoctor}
                  >
                    <img className="w-5" src="video-call-icon.svg" alt="Video Call Icon" />
                  </button>
                  <div className="relative">
                    <button
                      className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                      onClick={toggleOthersMenu}
                    >
                      <img className="w-5" src="others-icon.svg" alt="Others Icon" />
                    </button>
                    {showOthersMenu && (
                      <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md p-2 z-10 w-48">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm inter text-[var(--slate-gray)] hover:bg-gray-100 transition-all duration-200"
                          onClick={() => handleOthersAction("Share File")}
                        >
                          Magbahagi ng File
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm inter text-red-600 hover:bg-gray-100 transition-all duration-200"
                          onClick={() => handleOthersAction("End ConsultationPatient")}
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
                      className={`flex mb-4 ${message.sender === "patient" ? "flex-row-reverse" : "flex-row"} items-end gap-2`}
                    >
                      {message.sender === "doctor" && (
                        <img className="w-8 h-8 rounded-full" src="doctor-icon.webp" alt="Icon ng Doktor" />
                      )}
                      <div
                        className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                          message.sender === "patient"
                            ? "bg-[var(--healing-teal)] text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm inter">{message.text}</p>
                        <p className="text-xs text-gray-400 mt-1 text-right">{message.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm inter text-gray-600 text-center mt-20">Simulan ang pag-uusap kay {selectedDoctor.name}</p>
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
              <p className="text-sm inter text-gray-600">Pumili ng doktor para simulan ang konsultasyon</p>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConsultationPatient;