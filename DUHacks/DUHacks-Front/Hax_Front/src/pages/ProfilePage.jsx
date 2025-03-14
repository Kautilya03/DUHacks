import React, { useEffect, useState } from "react";
import banner from "../assets/bannerAptos.webp";
import dp from "../assets/dp.jpg";
import { FaPaste, FaStar } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner"; // Import ThreeCircles loader
import GridLines from "react-gridlines";

const ProfilePage = () => {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProjectDoneByEmployer, setIsProjectDoneByEmployer] = useState(false);
  const [isProjectDoneByFreelancer, setIsProjectDoneByFreelancer] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://hax-back.vercel.app/api/profile", {
          withCredentials: true,
        });

        const { user, projects } = response.data;
        const { username, publicKey } = user;
        setUser({ username, publicKey });
        setProjects(projects);

        console.log("User Profile:", { username, publicKey });
        console.log("User Projects:", projects[0]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleMarkAsDone = async (project) => {
    console.log(project, "project hai yeh");

    try {
      let updateData = {};
      console.log(user, "user id");
      if (user.username === project.Employer.username) {
        console.log("ljdnksjnksjnskjdcnskcjnskcjkj");

        const newStatus = !isProjectDoneByEmployer;
        setIsProjectDoneByEmployer(newStatus);
        updateData = { isProjectDoneByEmployer: newStatus };
        console.log(newStatus, "by empp");
      } else if (user.username === project.user2.username) {
        console.log("popopopopopop");

        const newStatus = !isProjectDoneByFreelancer;
        setIsProjectDoneByFreelancer(newStatus);
        updateData = { isProjectDoneByFreelancer: newStatus };
        console.log(newStatus, "by free");
      }

      // Send the update request to the backend
      const response = await axios.post(
        "https://hax-back.vercel.app/project/updatebool",
        {
          projectId: project._id,
          ...updateData,
        }
      );

      if (response.status === 200) {
        console.log("Project updated successfully:", response.data);
        window.location.reload(); // Reload the page to reflect changes
      } else {
        console.error("Failed to update project:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error updating project:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // const handleMarkAsDone = (project) => {
  //   console.log(project, "project hai yeh");
  //   console.log("hiiiiiiiii");
  // };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  const handleCopy = () => {
    if (user?.publicKey) {
      navigator.clipboard.writeText(user.publicKey).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleNavigate = (projectId) => {
    navigate("/transact", { state: { projectId } });
  };

  const handleCardClick = (project) => {
    navigate("/activeproject", { state: { project } });
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ThreeCircles
          visible={true}
          height={100}
          width={100}
          color="#DC483A"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="bg-[#f5f2e5] min-h-screen font-sans text-black">

    <GridLines
        className="min-h-screen h-full grid-area"
        cellWidth={20}
        strokeWidth={1}
      >

      {/* Banner Section */}
      <div className="relative rounded-lg px-2 py-1 bg-[#f5f2e5]">
        <img
          src={banner}
          alt="banner"
          className="w-full h-[350px] object-cover rounded-lg"
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col p-10 gap-6 border-b-2 border-black">
        <div className="flex gap-10">
          <div className="relative">
            <img
              src={dp}
              alt="profile"
              className="w-36 h-36 border-4 border-black rounded-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-[#1fff45] rounded-full w-6 h-6 border-2 border-black"></div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold font-gravity">{user.username}</h1>
            <div className="flex gap-4 mt-2">
              <div className="px-4 py-2 bg-[#f5f2e5] border-2 border-black rounded-md flex justify-center items-center gap-2">
                <div className="w-44 px-3 py-1 text-gray-700 text-lg tracking-widest font-mono select-none overflow-hidden">
                  {user.publicKey}
                </div>
                <FaPaste
                  className="cursor-pointer text-[#dc483a]"
                  onClick={handleCopy}
                />
              </div>
              <button
                className="relative px-4 py-2 bg-[#d5655b] text-white font-gravity text-xl rounded-md border-2 border-black 
                shadow-[0_4px_0_#a9463d,0_8px_0_#752e28] 
                transition-all duration-300 ease-in-out transform-gpu 
                hover:-translate-y-1 hover:shadow-[0_6px_0_#a9463d,0_12px_0_#752e28] hover:bg-[#df3829] 
                active:translate-y-2 active:shadow-none"
              >
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="w-[70%] font-mono text-lg">
          Free3Lance is a decentralized freelancing platform that connects
          clients and freelancers directly using blockchain technology. It
          eliminates intermediaries, provides transparent payment systems via
          smart contracts, and ensures secure user authentication through Web3
          services.
        </div>
      </div>

      {/* Active Projects Section */}
      <div className="p-10 border-t-2 mt-2 border-black">
        <h2 className="text-3xl font-bold mb-6 font-gravity">
          Active Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={project._id}
                className="bg-white border-2 border-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-[#dfdf49] hover:cursor-pointer" onClick={() => handleCardClick(project._id)}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">Service {index + 1}</h3>
                  <span className="text-md  font-semibold">
                    APT {project.price || "N/A"}
                  </span>
                </div>
                <h3 className="text-xl font font-mono ">
                  Employer : {project.Employer.username}{" "}
                </h3>
                <h3 className="text-xl font-thin font-mono">
                  Freelancer : {project.user2.username}
                </h3>
                <p className="text-md font-mono py-4">
                  {project.description ||
                    "A brief description of the service offered goes here. Add more details to make it engaging."}
                </p>
                <p className="text-sm font-semibold mt-2">
                  Completed by freelancer:{" "}
                  {project.isProjectDoneByFreelancer ? (
                    <span className="text-green-500">✔</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                </p>
                <p className="text-sm font-semibold mt-2">
                  Completed by Employer:{" "}
                  {project.isProjectDoneByEmployer ? (
                    <span className="text-green-500">✔️</span> // Green tick if true
                  ) : (
                    <span className="text-red-500">❌</span> // Red cross if false
                  )}
                </p>
                {/* Project Completed Button */}
                <button
                  className="relative mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md border-2 border-black 
      shadow-[0_4px_0_#3b82f6,0_8px_0_#3b82f6] 
      transition-all duration-300 ease-in-out transform-gpu 
      hover:-translate-y-1 hover:shadow-[0_6px_0_#3b82f6,0_12px_0_#3b82f6] hover:brightness-95 
      active:translate-y-2 active:shadow-none"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMarkAsDone(project)
                }}
                >
                  Mark as Done
                </button>
                {user.username!==project.user2.username?<button
                  className="relative mt-4 w-full px-4 py-2 bg-[#82db85] text-white font-semibold rounded-md border-2 border-black 
                    shadow-[0_4px_0_#45a049,0_8px_0_#2c6b2f] 
                    transition-all duration-300 ease-in-out transform-gpu 
                    hover:-translate-y-1 hover:shadow-[0_6px_0_#45a049,0_12px_0_#2c6b2f] hover:brightness-95 
                    active:translate-y-2 active:shadow-none"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNavigate(project._id)
                  }}
                >
                  Complete Transaction
                </button>:null}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No active projects.
            </p>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="p-10 border-t-2 border-black">
        <h2 className="text-3xl font-bold mb-6 font-gravity">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((review, index) => (
            <div
              key={index}
              className="bg-[#f5f2e5] border-2 border-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-sm font-mono italic">
                "Aditya provided exceptional service and demonstrated expertise
                in Web3. The project was delivered on time and exceeded
                expectations!"
              </p>
              <div className="mt-4 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold">- Client Name</p>
            </div>
          ))}
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
          Public Key Copied!
        </div>
      )}
    </GridLines>
    </div>
  );
};

export default ProfilePage;
