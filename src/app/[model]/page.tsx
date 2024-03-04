"use client";
import PageHeader from "@/components/PageHeader";
import { ModelPageInterface } from "@/util/types";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { model: string } }) => {
  const [modelContent, setModelContent] = useState<ModelPageInterface>();

  const fetchData = async () => {
    const headers = new Headers();
    headers.append("X-Master-Key", process.env.NEXT_PUBLIC_API_KEY as string);
    headers.append("X-JSON-Path", `$['${params.model}']`);
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_BIN_ID}?meta=false`,
      {
        headers: headers,
      }
    );
    const data = await response.json();
    setModelContent(data[0]);
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
    <div>
      <PageHeader
        avatarUrl={modelContent?.avatarUrl as string}
        author={modelContent?.author as string}
        model={params.model}
        likes={modelContent?.likes as number}
        downloads={modelContent?.downloads as number}
        tag={modelContent?.tag as string}
      />
      <div className="flex">
        <div className="flex-[3_3_0%] px-10 py-3 flex flex-col gap-6 shadow-xl">
          {modelContent?.content.map((content, ind) => {
            const codeSnippets = extractCodeSnippet(content?.text);
            return (
              <div key={ind} className="flex flex-col gap-4 max-w-full">
                <div className="text-2xl text-gray-800 font-semibold font-sans">
                  {content?.title}
                </div>
                <div className="text-lg text-gray-800 font-light">
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
                    className="bg-gray-50 shadow-lg p-2 rounded-md overflow-x-auto max-w-[700px]"
                  >
                    <code>{snippet}</code>
                  </pre>
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex-[2_2_0%]"></div>
      </div>
    </div>
  );
};

export default Page;
