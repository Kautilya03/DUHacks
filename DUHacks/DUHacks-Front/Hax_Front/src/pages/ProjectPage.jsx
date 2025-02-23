import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import GridLines from "react-gridlines";

const ActiveProject = () => {
  const location = useLocation();
  const { project } = location.state || {};

  const [messages, setMessages] = useState([
    { sender: "employer", text: "Hello! How's the progress on the project?" },
    { sender: "freelancer", text: "Hey! I'm making good progress." },
    { sender: "employer", text: "Great! Let me know if you need anything." },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "freelancer", text: newMessage }]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "employer", text: "Thanks for the update!" }]);
    }, 1000);
  };

  const milestones = [
    { title: "Project Agreement", date: "Jan 22" },
    { title: "25% Work Completed", date: "Feb 22" },
    { title: "50% Work Completed", date: "March 7" },
    { title: "Project Handover", date: "March 7" },
  ];

  return (
    <div className="bg-[#f5f0e6] min-h-screen ">
      <GridLines className="min-h-screen h-full grid-area p-7" cellWidth={16} strokeWidth={0.8}>
        <h1 className="text-5xl font-bold text-[#cf553d] mb-4 font-gravity">
          Project Details
        </h1>

        <div className="flex flex-col md:flex-row bg-white border-2 border-black p-4 rounded-lg shadow-md">
          <div className="flex-1 flex flex-col items-center border-r-2 border-black p-3">
            <img
              src={project?.Employer?.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
              alt="Employer"
              className="w-24 h-24 rounded-full border-2 border-black object-cover"
            />
            <h2 className="text-xl font-bold mt-3">{project?.Employer?.username || "Employer"}</h2>
          </div>

          <div className="flex items-center justify-center px-3">
            <h1 className="text-4xl font-bold">→</h1>
          </div>

          <div className="flex-1 flex flex-col items-center border-l-2 border-black p-3">
            <img
              src={project?.user2?.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
              alt="Freelancer"
              className="w-24 h-24 rounded-full border-2 border-black object-cover"
            />
            <h2 className="text-xl font-bold mt-3">{project?.user2?.username || "Freelancer"}</h2>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white border-2 border-black p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Timeline</h2>
            <div className="relative border-l-2 border-black pl-4 space-y-4 ml-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[26px] top-1 w-4 h-4 bg-black rounded-full border-2 border-white"></div>
                  <p className="ml-2 text-lg font-semibold">{milestone.title}</p>
                  <p className="text-gray-500 text-sm">{milestone.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white border-2 border-black p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-bold mb-3">Chat</h2>
            <div className="flex-1 border-2 border-black p-3 rounded-md bg-gray-100 relative">
              <div
                className="h-full overflow-y-auto pr-1"
                style={{ maxHeight: "160px", scrollbarWidth: "thin", scrollbarColor: "#a0aec0 #edf2f7" }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 my-1 w-fit max-w-[70%] rounded-lg shadow-md ${
                      msg.sender === "freelancer" ? "bg-red-300 self-end ml-auto" : "bg-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border-2 border-black rounded-md text-sm"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="px-3 py-1 bg-black text-white font-semibold rounded-md border-2 border-black text-sm"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white border-2 border-black p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Project Details:</h2>
          <p className="text-sm">
            <span className="text-red-500 font-bold">{project.description}</span>
          </p>
          <div className="mt-4 flex justify-center">
            <button className="px-5 py-2 bg-red-500 text-white font-bold text-md rounded-md border-2 border-black shadow-lg hover:bg-gray-800">
              Mark as Done
            </button>
          </div>
        </div>
      </GridLines>
    </div>
  );
};

export default ActiveProject;
