import type { ReactNode } from "react";
import SidebarNotes from "./filter/@sidebar/SidebarNotes";

type Props = {
  children: ReactNode;
};

export default function NotesLayout({ children }: Props) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <aside style={{ width: 260, background: "#1f2933", color: "white", padding: 16 }}>
        <SidebarNotes />
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
