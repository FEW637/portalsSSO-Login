import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HyperDesignerLogo from "./logo/hyper.png";
import DMADesignerLogo from "./logo/logo.png";
const applications = [
  {
    id: 1,
    name: "Hyper Designer",
    description:
      "Hyper Suite is a powerful integration tool that seamlessly connects and streamlines your software applications.",
    logo: HyperDesignerLogo, // Update with actual logo URL
    tags: ["API Integration", "Communication"],
    link: "https://hyper-designer-uat-02.techberry.co.th/hypersuite/auth/login",
    type: "Integration",
  },
  {
    id: 2,
    name: "DMA Designer",
    description:
      "Build your own application with low coding by DMA that would help you be strongly competitive.",
    logo: DMADesignerLogo, // Update with actual logo URL
    tags: ["Workspace Tools", "Productivity"],
    link: "https://dmadesignercloudsit.beebuddy.net/dmaDesigner/",
    type: "Tool",
  },
];

const ApplicationDirectory = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("all");
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check for access token
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
      return;
    }
    setAccessToken(token);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  const handleAccessApp = (app) => {
    try {
      const redirectUrl = `/redirect?target=${encodeURIComponent(app.link)}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error accessing application:', error);
    }
  };

  const filteredApplications = applications.filter((app) =>
    selectedType === "all" ? true : app.type === selectedType
  );

  if (!accessToken) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 sm:p-10 bg-purple-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Application Directory</h1>
            <p className="text-gray-600 text-lg">
              Discover and connect with powerful applications to enhance your workflow.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex space-x-6 mb-10 border-b border-purple-100">
          <button
            onClick={() => setSelectedType("all")}
            className={`pb-3 px-2 font-medium transition-colors ${
              selectedType === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            All Apps
          </button>
          <button
            onClick={() => setSelectedType("Integration")}
            className={`pb-3 px-2 transition-colors ${
              selectedType === "Integration"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setSelectedType("Tool")}
            className={`pb-3 px-2 transition-colors ${
              selectedType === "Tool"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Tools
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="group bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-purple-100 hover:border-purple-200"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <img
                    src={app.logo}
                    alt={`${app.name} Logo`}
                    className="w-12 h-12 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{app.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">{app.description}</p>
              <div className="mt-auto">
                <button
                  onClick={() => handleAccessApp(app)}
                  className="inline-flex w-full items-center justify-center px-4 py-2.5 border border-purple-200 text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200"
                >
                  Access
                  <svg
                    className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDirectory;