"use client";
import ModelContent from "@/components/ModelContent";
import PageHeader from "@/components/PageHeader";
import TryItOut from "@/components/TryItOut";
import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";
import { ModelPageInterface, Tags } from "@/util/types";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { model: string } }) => {
  const [modelContent, setModelContent] = useState<ModelPageInterface>();
  const [loading, setLoading] = useState<boolean>(true);

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
    if(!response.ok) {
      // route to 404
      
    }
    const data = await response.json();
    setModelContent(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <PageHeaderSkeleton />
      ) : (
        <PageHeader
          avatarUrl={modelContent?.avatarUrl as string}
          author={modelContent?.author as string}
          model={params.model}
          likes={modelContent?.likes as number}
          downloads={modelContent?.downloads as number}
          tag={modelContent?.tag as string}
        />
      )}
      <div className="flex">
        <ModelContent
          loading={loading}
          modelContent={
            modelContent?.content as { text: string; title: string }[]
          }
        />
        <TryItOut
          loading={loading}
          api={modelContent?.api as string}
          tag={modelContent?.tag as Tags}
        />
      </div>
    </div>
  );
};

export default Page;
