"use client";

import { Download, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

//https://my-json-server.typicode.com/aryandutt/llm-models/models

const LlmCard = ({}) => {
  const [models, setModels] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "https://my-json-server.typicode.com/aryandutt/llm-models/models"
    );
    const data = await response.json();
    setModels(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-96 h-60 bg-white p-5 flex flex-col border-[2px] border-gray-200 border-solid gap-4 rounded-xl shadow-xl transition duration-200 ease-out hover:ease-in hover:scale-[102%]">
      <div className="flex items-center gap-x-4 text-3xl font-mono ">
        <img
          src={models[0]?.avatarUrl}
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <div>{models[0]?.author}</div>
      </div>
      <div className="text-xl font-sans">{models[0]?.model}</div>
      <div className="flex">
        <div>{models[0]?.tag}</div>
        <span className="px-1.5 text-gray-300">•</span>
        <div className="flex items-center gap-2">
          <ThumbsUp size={16} />
          {models[0]?.likes}
        </div>
        <span className="px-1.5 text-gray-300">•</span>
        <div className="flex items-center gap-2">
          <Download size={16} />
          {models[0]?.downloads}
        </div>
      </div>
    </div>
  );
};

export default LlmCard;
