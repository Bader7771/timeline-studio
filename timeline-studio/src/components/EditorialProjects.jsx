import { useEffect, useRef } from "react";
import frame01 from "../assets/editorial/frame-01.jpg";
import frame02 from "../assets/editorial/frame-02.jpg";
import frame03 from "../assets/editorial/frame-03.jpg";

const clamp = (value) => Math.max(0, Math.min(1, value));

export default function EditorialProjects() {
  const wrapper = useRef(null);
  const poster = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = wrapper.current;
      const page = poster.current;
      if (!node || !page) return;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(1, node.offsetHeight - innerHeight);
      const progress = clamp(-rect.top / distance);
      const title = clamp(progress / 0.2);
      const one = clamp((progress - 0.1) / 0.24);
      const two = clamp((progress - 0.28) / 0.25);
      const three = clamp((progress - 0.46) / 0.28);
      const details = clamp((progress - 0.68) / 0.2);
      page.style.setProperty("--title-y", `${(1 - title) * 50}px`);
      page.style.setProperty("--title-o", title);
      page.style.setProperty("--one-y", `${(1 - one) * 78 - progress * 36}px`);
      page.style.setProperty("--one-clip", `${(1 - one) * 100}%`);
      page.style.setProperty("--one-o", one);
      page.style.setProperty("--two-y", `${(1 - two) * 92 - progress * 18}px`);
      page.style.setProperty("--two-clip", `${(1 - two) * 100}%`);
      page.style.setProperty("--two-o", two);
      page.style.setProperty(
        "--three-x",
        `${(1 - three) * 34 + progress * 12}px`,
      );
      page.style.setProperty(
        "--three-y",
        `${(1 - three) * 70 - progress * 28}px`,
      );
      page.style.setProperty("--three-scale", 0.94 + three * 0.06);
      page.style.setProperty("--three-o", three);
      page.style.setProperty("--detail-o", details);
      page.style.setProperty("--marker-scale", details);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <div ref={wrapper} className="editorial-scroll">
      <section ref={poster} className="editorial" aria-labelledby="cuts-title">
        <div className="poster-title">
          <p>SELECTED FRAMES FROM THE TIMELINE</p>
          <h2 id="cuts-title">
            <span>CUTS</span>
            <span>SO FAR</span>
          </h2>
        </div>
        <figure className="diary-photo photo-one">
          <span>(01)</span>
          <img
            src={frame01}
            alt="Abstract monochrome printed frame from the studio timeline"
            loading="lazy"
            width="1200"
            height="1500"
          />
        </figure>
        <figure className="diary-photo photo-two">
          <span>(02)</span>
          <img
            src={frame02}
            alt="Motion-blurred figure with experimental typographic treatment"
            loading="lazy"
            width="736"
            height="899"
          />
        </figure>
        <figure className="diary-photo photo-three">
          <span>(03)</span>
          <img
            src={frame03}
            alt="Diffused portrait selected from the studio visual diary"
            loading="lazy"
            width="790"
            height="1053"
          />
        </figure>
        <span className="poster-square square-a" aria-hidden="true" />
        <span className="poster-square square-b" aria-hidden="true" />
        <span className="poster-square square-c" aria-hidden="true" />
        <span className="poster-square square-d" aria-hidden="true" />
        <span className="poster-square square-e" aria-hidden="true" />
        <p className="diary-copy">
          Three frames.
          <br />
          One timeline.
          <br />
          Stories still moving.
        </p>
        <p className="poster-signoff">
          TIMELINE/STUDIO
          <br />
          SELECTED WORK / 2026
        </p>
        <p className="poster-bottom bottom-left">
          A visual diary by TIMELINE/STUDIO
        </p>
        <p className="poster-bottom bottom-right">SELECTED CUTS / 2026</p>
      </section>
    </div>
  );
}
