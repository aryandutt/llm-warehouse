import { Tags, TryItOutInterface } from "@/util/types";
import { Boxes, Frown, RefreshCw } from "lucide-react";
import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import TryItOutSkeleton from "./skeletons/TryItOutSkeleton";
import TryItOutWrapper from "./TryItOutWrapper";

const TryItOut: React.FC<TryItOutInterface> = ({ loading, api, tag }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const divRef = useRef<HTMLDivElement>(null);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const getAndDisplayResponseText = async () => {
    setButtonLoading(true);
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
    if (response.ok) {
      const data = await response.json();
      textRef.current.value = data[0].generated_text;
      setButtonLoading(false);
    } else {
      console.error("Error fetching image:", response.statusText);
      setButtonLoading(false);
    }
  };

  const getAndDisplayResponseImage = async () => {
    setButtonLoading(true);
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
      setButtonLoading(false);
    } else {
      console.error("Error fetching image:", response.statusText);
      setButtonLoading(false);
    }
  };
  return (
    <TryItOutWrapper>
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
            <div className="flex flex-col items-center gap-4">
              <div className="font-medium text-lg">Input Text</div>
              <Textarea
                ref={textRef}
                className={
                  tag === Tags.TextGeneration ? "min-h-[150px]" : "min-h-[50px]"
                }
                placeholder="Input text"
                defaultValue={
                  tag === Tags.TextGeneration ? "Hi my name is Aryan" : "A dog"
                }
              />
              <Button
                className="w-full flex gap-1"
                disabled={buttonLoading}
                onClick={
                  tag === Tags.TextGeneration
                    ? getAndDisplayResponseText
                    : getAndDisplayResponseImage
                }
              >
                <div className="p-4 text-lg">
                  {buttonLoading ? "Generating" : "Generate"}
                </div>
                {buttonLoading && (
                  <RefreshCw
                    size={25}
                    className="h-5 w-5 animate-spin animate-r"
                  />
                )}
              </Button>
              <div className="" ref={divRef}></div>
            </div>
          )}
        </>
      )}
    </TryItOutWrapper>
  );
};

export default TryItOut;
