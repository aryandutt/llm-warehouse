import { Tags, TryItOutInterface } from "@/util/types";
import { Boxes, Frown } from "lucide-react";
import React, { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import TryItOutSkeleton from "./skeletons/TryItOutSkeleton";

const TryItOut: React.FC<TryItOutInterface> = ({ loading, api, tag }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const divRef = useRef<HTMLDivElement>(null);

  const getAndDisplayResponseText = async () => {
    if (!textRef.current || !textRef.current.value.length) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch(api as string, {
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

    const response = await fetch(api as string, {
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
  return (
    <div className="flex-[2_2_0%] p-10 flex flex-col gap-20 ">
      {loading ? (
        <TryItOutSkeleton />
      ) : (
        <>
          <div className="flex gap-3 items-center justify-center">
            <Boxes size={35} strokeWidth={1.5} />
            <div className="font-medium text-3xl">Try It Out</div>
          </div>
          {tag === Tags.ImageToVideo ? (
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
                  tag === Tags.TextGeneration ? "Hi my name is Aryan" : "A dog"
                }
              />
              <Button
                onClick={
                  tag === Tags.TextGeneration
                    ? getAndDisplayResponseText
                    : getAndDisplayResponseImage
                }
              >
                <div className="p-4 text-lg">Generate</div>
              </Button>
              <div ref={divRef}></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TryItOut;
