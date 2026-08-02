import { useEffect, useRef } from "react";
import frame01 from "../assets/editorial/frame-01.jpg";
import frame02 from "../assets/editorial/frame-02.jpg";
import frame03 from "../assets/editorial/frame-03.jpg";
import { transitionEditorialTracks } from "../data/transitionEditorial";

const clamp = (value) => Math.max(0, Math.min(1, value));
const trackNames = ["one", "two", "three", "four"];

export default function EditorialProjects() {
  const wrapper = useRef(null);
  const poster = useRef(null);
  const tracks = useRef([]);
  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = wrapper.current;
      const page = poster.current;
      if (!node || !page) return;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(1, node.offsetHeight - innerHeight);
      const progress = clamp(-rect.top / distance);
      const transition = clamp(1 - rect.top / innerHeight);
      const ease = (value) => value * value * (3 - 2 * value);
      const stageExit = ease(
        reducedMotion
          ? clamp((transition - 0.72) / 0.2)
          : clamp((progress - 0.02) / 0.16),
      );
      page.style.setProperty("--type-stage-o", 1 - stageExit);
      page.style.setProperty(
        "--type-stage-y",
        `${reducedMotion ? 0 : stageExit * -120}px`,
      );
      page.style.setProperty("--type-stage-scale", 1 - stageExit * 0.015);
      page.style.setProperty("--type-stage-clip", `${stageExit * 100}%`);
      page.style.setProperty(
        "--type-stage-visibility",
        stageExit >= 0.999 ? "hidden" : "visible",
      );
      const rowSpecs = innerWidth <= 700
        ? [
            { enter: 0.04, startX: 5, endX: -7, pinnedX: -2 },
            { enter: 0.1, startX: -6, endX: 5, pinnedX: 2 },
            { enter: 0.16, startX: 4, endX: -6, pinnedX: -2 },
            { enter: 0.22, startX: -5, endX: 4, pinnedX: 2 },
          ]
        : [
            { enter: 0.04, startX: 8, endX: -6, pinnedX: -6 },
            { enter: 0.1, startX: -12, endX: 4, pinnedX: 6 },
            { enter: 0.16, startX: 5, endX: -4, pinnedX: -4 },
            { enter: 0.22, startX: -6, endX: 3, pinnedX: 4 },
          ];
      rowSpecs.forEach((spec, index) => {
        const incoming = ease(clamp((transition - spec.enter) / 0.2));
        const horizontalProgress = ease(transition);
        const handoffProgress = ease(clamp(progress / 0.2));
        const x = reducedMotion
          ? 0
          : spec.startX +
            (spec.endX - spec.startX) * horizontalProgress +
            spec.pinnedX * handoffProgress;
        page.style.setProperty(`--track-${index + 1}-x`, `${x}vw`);
        page.style.setProperty(
          `--track-${index + 1}-y`,
          `${reducedMotion ? 0 : (1 - incoming) * 50}px`,
        );
        page.style.setProperty(`--track-${index + 1}-o`, incoming);
        page.style.setProperty(
          `--track-${index + 1}-clip`,
          `${reducedMotion ? 0 : (1 - incoming) * 100}%`,
        );
        tracks.current[index]?.querySelectorAll(".inline-editorial-media").forEach((media, mediaIndex) => {
          const reveal = reducedMotion
            ? 1
            : ease(clamp((incoming - mediaIndex * 0.1) / 0.7));
          const drift = reducedMotion
            ? 0
            : (horizontalProgress - 0.5) * (mediaIndex % 2 ? -18 : 18);
          media.style.setProperty("--inline-reveal", reveal);
          media.style.setProperty("--inline-clip", `${(1 - reveal) * 100}%`);
          media.style.setProperty("--inline-scale", 0.88 + reveal * 0.12);
          media.style.setProperty("--inline-drift", `${drift}px`);
        });
      });
      if (reducedMotion) {
        const collage = ease(clamp((transition - 0.92) / 0.08));
        page.style.setProperty("--title-y", `${(1 - collage) * 24}px`);
        page.style.setProperty("--title-o", collage);
        page.style.setProperty("--one-y", `${(1 - collage) * 24}px`);
        page.style.setProperty("--one-clip", `${(1 - collage) * 100}%`);
        page.style.setProperty("--one-o", collage);
        page.style.setProperty("--two-y", `${(1 - collage) * 24}px`);
        page.style.setProperty("--two-clip", `${(1 - collage) * 100}%`);
        page.style.setProperty("--two-o", collage);
        page.style.setProperty("--three-x", "0px");
        page.style.setProperty("--three-y", `${(1 - collage) * 24}px`);
        page.style.setProperty("--three-scale", 1);
        page.style.setProperty("--three-o", collage);
        page.style.setProperty("--detail-o", collage);
        page.style.setProperty("--marker-scale", collage);
        return;
      }
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
        <div className="editorial-type-stage" aria-hidden="true">
          {transitionEditorialTracks.map((track, trackIndex) => (
            <div
              className={`editorial-track track-${trackIndex + 1} track-${trackNames[trackIndex]}`}
              key={trackIndex}
              ref={(node) => { tracks.current[trackIndex] = node; }}
            >
              <div className="type-track-inner">
                {track.map((item, itemIndex) => item.type === "text" ? (
                  <span key={`${item.value}-${itemIndex}`}>{item.value}</span>
                ) : (
                  <span
                    className={`inline-editorial-media${item.mobile ? "" : " mobile-hide"}`}
                    key={item.id}
                    style={{
                      "--inline-ratio": item.ratio,
                      "--inline-position": item.position,
                      "--inline-height": `${item.displayHeight}em`,
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading={item.eager ? "eager" : "lazy"}
                      fetchPriority={item.eager ? "high" : "auto"}
                      width={item.width}
                      height={item.height}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
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
