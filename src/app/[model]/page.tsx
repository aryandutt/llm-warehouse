"use client";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ModelPageInterface, Tags } from "@/util/types";
import { Boxes, Frown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Page = ({ params }: { params: { model: string } }) => {
  const [modelContent, setModelContent] = useState<ModelPageInterface>();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const divRef = useRef<HTMLDivElement>(null);

  const getAndDisplayResponseText = async () => {
    if (!textRef.current || !textRef.current.value.length) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch(modelContent?.api as string, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        inputs: textRef.current?.value,
        parameters: { max_new_tokens: 30 },
      }),
    });
    const data = await response.json();
    textRef.current.value = data[0].generated_text;
  };

  const getAndDisplayResponseImage = async () => {
    if (!textRef.current || !textRef.current.value.length) return;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch(modelContent?.api as string, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        inputs: textRef.current?.value,
      }),
    });
    if (response.ok) {
      const buffer = await response.arrayBuffer();

      const blob = new Blob([buffer]);

      const imageURL = URL.createObjectURL(blob);
      const img = new Image();
      img.src = imageURL;

      while (divRef.current?.firstChild) {
        divRef.current?.removeChild(divRef.current?.firstChild);
      }

      divRef.current?.appendChild(img);
    } else {
      console.error("Error fetching image:", response.statusText);
    }
  };

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
                  {!!content?.text &&
                    content.text
                      .split(/```([\s\S]*?)```/g)
                      .map((section: string, index: number): string | null =>
                        index % 2 === 0 ? section : null
                      )}
                </div>
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
        <div className="flex-[2_2_0%] p-10 flex flex-col gap-20 ">
          <div className="flex gap-3 items-center justify-center">
            <Boxes size={35} strokeWidth={1.5} />
            <div className="font-medium text-3xl">Try It Out</div>
          </div>
          {modelContent?.tag === Tags.ImageToVideo ? (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Frown size={40} />
              <div className="font-medium text-lg">
                Sorry this is unavailable at the moment
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="font-medium text-lg">Input Text</div>
              <Textarea
                ref={textRef}
                placeholder="Input text for completion"
                defaultValue={
                  modelContent?.tag === Tags.TextGeneration
                    ? "Hi my name is Aryan,"
                    : "A dog"
                }
              />
              <Button
                onClick={
                  modelContent?.tag === Tags.TextGeneration
                    ? getAndDisplayResponseText
                    : getAndDisplayResponseImage
                }
              >
                <div className="p-4 text-lg">Generate</div>
              </Button>
              <div ref={divRef}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
