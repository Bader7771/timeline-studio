import { useCallback, useState } from "react";
import Header from "./components/Header";
import EditingHalo from "./components/EditingHalo";
import InteractionLabel from "./components/InteractionLabel";
import EditorialProjects from "./components/EditorialProjects";
import { siteContent } from "./data/siteContent";
import "./styles/global.css";

export default function App() {
  const [interacted, setInteracted] = useState(false);
  const markInteracted = useCallback(() => setInteracted(true), []);
  return (
    <div className="experience">
      <div className="hero-layer">
        <div className="site-shell">
          <Header
            name={siteContent.name}
            descriptor={siteContent.descriptor}
            email={siteContent.contact.email}
          />
          <main>
            <EditingHalo onInteract={markInteracted} />
            <span className="guide-ring" aria-hidden="true" />
            <span className="detail detail-a">LOOP / 001</span>
            <span className="detail detail-b">24 FPS</span>
            <InteractionLabel interacted={interacted} />
          </main>
        </div>
      </div>
      <EditorialProjects />
    </div>
  );
}
