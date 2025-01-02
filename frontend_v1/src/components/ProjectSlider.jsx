/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export function ProjectSlider({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "not started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isRequestDisabled = (status) => {
    return status.toLowerCase() !== "not started";
  };

  const handleRequest = () => {
    if (!isRequestDisabled(project.status)) {
      console.log("Request submitted for project:", project.title);
      // You might want to show a confirmation message or modal here
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[32rem] md:w-[40rem] h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 h-full overflow-y-auto max-w-3xl mx-auto flex flex-col">
          <Button
            onClick={onClose}
            className="absolute top-4 right-4"
            variant="ghost"
            size="icon"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              {project.title}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="space-y-4 flex-grow">
            <div>
              <h3 className="font-semibold">Estimated Time</h3>
              <p>{project.estimatedTime}</p>
            </div>
            <div>
              <h3 className="font-semibold">Team Size</h3>
              <p>{project.teamSize}</p>
            </div>
            <div>
              <h3 className="font-semibold">Payment Price</h3>
              <p>${project.paymentPrice.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Posted by</h3>
              <p>{project.posterName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Milestones</h3>
              <ul className="list-disc pl-5 mt-2">
                {project.milestones.map((milestone) => (
                  <li key={milestone.id} className="mb-2">
                    <span className="font-medium">{milestone.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({milestone.status})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <Button
              onClick={handleRequest}
              className="w-full"
              disabled={isRequestDisabled(project.status)}
              variant={
                isRequestDisabled(project.status) ? "secondary" : "default"
              }
            >
              Request Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}