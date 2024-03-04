import React from 'react'
import PageBodySkeleton from './skeletons/PageBodySkeleton';
import { ModelContentInterface } from '@/util/types';

const ModelContent: React.FC<ModelContentInterface> = ({loading, modelContent}) => {
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
    <div className="flex-[3_3_0%] px-10 py-3 flex flex-col gap-6 shadow-xl">
          {loading ? (
            <PageBodySkeleton />
          ) : (
            modelContent.map((content, ind) => {
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
            })
          )}
        </div>
  )
}

export default ModelContent