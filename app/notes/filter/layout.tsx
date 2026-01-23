import type { ReactNode } from "react";
import css from "@/styles/Home.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: 260,
          background: "#1f2933",
          color: "white",
          padding: 16,
        }}
      >
              {sidebar}
      </aside>

      <main className={css.main}>{children}</main>
    </div>
  );
}
