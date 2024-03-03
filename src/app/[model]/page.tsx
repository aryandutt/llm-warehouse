"use client";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { model: string } }) => {
  const [modelContent, setModelContent] = useState({
    content: [{ title: "", text: "" }],
  });

  const fetchData = async () => {
    const headers = new Headers();
    headers.append(
      "X-Master-Key",
      "$2a$10$pHFEUEhljnqDDsEyy1qBdO3bFvU8Gf2E9mIjOxuyy9tnOa3kYxpsK"
    );
    const response = await fetch(
        `https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_BIN_ID}?meta=false`,
      {
        cache: "no-store",
        headers: headers,
      }
    );
    const data = await response.json();
    setModelContent(data[params.model]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to extract code snippet from text
  const extractCodeSnippet = (text: string) => {
    const codeSnippetRegex = /```([\s\S]*?)```/g;
    const codeSnippets = [];
    let match;
    while ((match = codeSnippetRegex.exec(text)) !== null) {
      codeSnippets.push(match[1]);
    }
    return codeSnippets;
  };

  return (
    <div className="flex">
      <div className="flex-[3_3_0%] p-10 flex flex-col gap-6">
        {modelContent.content.map((content, ind) => {
          const codeSnippets = extractCodeSnippet(content?.text);
          return (
            <div key={ind} className="flex flex-col gap-4 max-w-full">
              <div className="text-2xl font-semibold font-sans">
                {content?.title}
              </div>
              <div className="text-lg font-light">
                {/* Render text content excluding code snippets */}
                {!!content?.text &&
                  content.text
                    .split(/```([\s\S]*?)```/g)
                    .map((section: string, index: number): string | null =>
                      index % 2 === 0 ? section : null
                    )}
              </div>
              {/* Render code snippets in code blocks */}
              {codeSnippets.map((snippet, index) => (
                <pre
                  key={index}
                  className="bg-gray-100 shadow-lg p-2 rounded-md overflow-x-auto max-w-96"
                >
                  <code>{snippet}</code>
                </pre>
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex-[2_2_0%] bg-red-200 h-20"></div>
    </div>
  );
};

export default Page;
