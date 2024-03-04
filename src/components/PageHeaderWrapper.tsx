import React from 'react'

type PageHeaderWrapperProps = {
    children: React.ReactNode;
}

const PageHeaderWrapper: React.FC<PageHeaderWrapperProps> = ({children}) => {
    return (
        <div className="p-7 flex flex-col gap-3 shadow-sm shadow-neutral-200">{children}</div>
    )
}

export default PageHeaderWrapper