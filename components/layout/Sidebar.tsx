import React, { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-strings">
        <div className="string"></div>
        <div className="string"></div>
        <div className="string"></div>
        <div className="string"></div>
      </div>
      <div className="sidebar-content">{children}</div>
    </div>
  );
}
