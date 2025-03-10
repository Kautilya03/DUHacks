import React, { useEffect, useState } from "react";
import GridLines from "react-gridlines";
import { PeopleCard } from "../components/PeopleCard";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThreeCircles } from "react-loader-spinner";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.webp";
import img4 from "../assets/4.png";
const ExplorePage = () => {
  const location = useLocation();
  const { domain } = location.state || {};

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activePerson, setActivePerson] = useState(null);
  const [domainFilter, setDomainFilter] = useState("");
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://hax-back.vercel.app/service/users");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#DC483A"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const peopledata = services.map((service) => ({
    userid: service.user._id,
    dp: service.image,
    name: service.user.username,
    work: service.title,
    domain: service.domain, // Example domain field
    description: service.description,
    price: service.price.toString(),
    mainphoto:
      service.domain === "Web Development"
        ? img3
        : service.domain === "App Development"
        ? img4
        : service.domain === "Video Editing"
        ? img2
        : service.domain === "Graphic Designing"
        ? img1
        : 1, // Default to service.image if no match
    contact: service.contact, // Example contact field
  }));

  console.log(peopledata);

  const filteredPeople = peopledata.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      person.domain.includes(domainFilter) &&
      (!domain || person.domain.includes(domain)) // Show all if domain is undefined
  );

  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  const handleClick = (person) => {
    console.log(person);
    navigate("/hire", { state: { person } });
  };

  return (
    <div className="h-full w-screen">
      <div className="bg-[#f5f2e5] h-full w-screen">
        <GridLines
          className="min-h-screen h-full grid-area"
          cellWidth={20}
          strokeWidth={1}
        >
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-center items-center">
              <h1 className="text-7xl tracking-wide text-gray-800 font-gravity">
                Experts Available
              </h1>
            </div>
            <div className="flex flex-col items-center py-5 px-4 font-mono">
              <div className="flex justify-between w-2/3">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="border-2 h-12 border-black rounded-md px-3 py-2 mb-8 w-2/3 outline-none focus:ring-2 focus:ring-[#bdaa6d] placeholder:text-gray-400 text-xl"
                />
                <select
                  className=" w-fit font-mono h-12 bg-[#fc8277] border-black border-2 rounded-lg mb-8 outline-none focus:ring-2 focus:ring-[#bdaa6d] font-bold text-xl px-2"
                  onChange={(event) => setDomainFilter(event.target.value)}
                  defaultValue=""
                >
                  <option value="">All Experts</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                </select>
              </div>
              <div className="relative w-full flex flex-wrap justify-center items-center gap-5 max-w-8xl">
                {filteredPeople.length === 0 ? (
                  <p className="mt-20 text-center text-7xl font-gravity animate-bounce">
                    No results found
                  </p>
                ) : (
                  filteredPeople.map((person, index) => (
                    <PeopleCard
                      key={index}
                      userid={person.userid}
                      dp={person.dp}
                      name={person.name}
                      work={person.work}
                      price={person.price}
                      mainphoto={person.mainphoto}
                      description={person.description}
                      contact={person.contact}
                      domain={person.domain}
                      setActivePerson={setActivePerson}
                    />
                  ))
                )}
                {activePerson && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div
                      className="h-fit w-11/12 mx-auto absolute z-20 bg-[#efe9ca] bg-opacity-85 p-6 rounded-lg shadow-2xl backdrop-blur-lg border-[3px] border-black transition-all duration-500 ease-in-out transform opacity-0 scale-75"
                      style={{ animation: "fadeIn 1s forwards" }}
                      onMouseEnter={() => setActivePerson(activePerson)}
                      onMouseLeave={() => setActivePerson(null)}
                    >
                      <img
                        src={activePerson.mainphoto}
                        alt="Main"
                        className="mx-auto w-[500px] h-50 object-contain rounded-xl border-2 border-black"
                      />
                      <button
                        onClick={() => handleClick(activePerson)}
                        className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#DC483A] hover:scale-110 transition duration-300"
                      >
                        HIRE
                      </button>
                      <div className="bg-white p-4 rounded-lg shadow-md mt-4 border-2 border-black">
                      <div className="mt-4 flex items-center gap-4">
                        <img
                          src={activePerson.dp}
                          alt="DP"
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {activePerson.name}
                          </h3>
                          <p className="text-gray-800 text-sm mt-1">
                            {activePerson.work}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 text-wrap">
                        <span className="font-bold">Description : </span>
                        <span>{activePerson.description}</span>
                      </div>
                      <div className="text-gray-900 text-lg font-semibold mt-3">
                        Price : APT{activePerson.price}
                      </div>
                      <div className="mt-1">
                        <span>
                          <span className="font-bold">Contact : </span>
                          {activePerson.contact}
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </GridLines>
      </div>
    </div>
  );
};

export default ExplorePage;
