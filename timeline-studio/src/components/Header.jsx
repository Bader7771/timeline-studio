import GoldenRingCanvas from "./GoldenRingCanvas";

export default function Header({ name, descriptor, email }) {
  return (
    <header className="header">
      <div className="header-left">
        <GoldenRingCanvas />
        <div className="identity">
          <strong>{name}</strong>
          <span>{descriptor}</span>
        </div>
      </div>
      <a href={`mailto:${email}`}>
        WORK WITH US <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
