import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import ReimaginePanel from "../components/dashboard/ReimaginePanel";

const IMMERSIVE_PATHS = new Set(["/dashboard/chat", "/dashboard/reimagine"]);

export default function Dashboard() {
  const location = useLocation();
  const immersive = IMMERSIVE_PATHS.has(location.pathname);
  const [reimagineOpen, setReimagineOpen] = useState(false);
  const [reimaginePrompt, setReimaginePrompt] = useState<string | undefined>();

  const openReimagine = (prompt?: string) => {
    setReimaginePrompt(prompt);
    setReimagineOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      {!immersive && <Sidebar />}
      <div className="flex min-w-0 flex-1 flex-col bg-paper">
        {!immersive && <Header onReimagine={() => openReimagine()} />}
        <main className={immersive ? "flex-1" : "flex-1 overflow-y-auto"}>
          <div className={immersive ? "h-full" : "mx-auto w-full max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10"}>
            <Outlet context={{ openReimagine }} />
          </div>
        </main>
      </div>
      <ReimaginePanel
        open={reimagineOpen}
        initialPrompt={reimaginePrompt}
        onClose={() => {
          setReimagineOpen(false);
          setReimaginePrompt(undefined);
        }}
      />
    </div>
  );
}
