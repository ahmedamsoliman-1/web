export function SystemVisual() {
  const paths = [
    "M300 300 C220 250 190 165 115 125",
    "M300 300 C380 250 430 175 505 145",
    "M300 300 C215 350 185 430 115 475",
    "M300 300 C390 345 430 425 515 470",
  ];

  return (
    <div className="system-visual" aria-hidden="true">
      <div className="orbit orbit-one"><span /></div>
      <div className="orbit orbit-two"><span /></div>
      <div className="orbit orbit-three"><span /></div>
      <div className="core"><div className="core-ring" /><div className="core-ring core-ring-2" /><b>AI</b><small>PLATFORM</small></div>
      <div className="node node-a"><i />INFERENCE</div>
      <div className="node node-b"><i />DATA</div>
      <div className="node node-c"><i />OBSERVE</div>
      <div className="node node-d"><i />SHIP</div>
      <svg className="connections" viewBox="0 0 600 600">
        <defs>
          <radialGradient id="pulse-grad">
            <stop offset="0%" stopColor="#a9fff0" />
            <stop offset="100%" stopColor="#66f3d1" stopOpacity="0" />
          </radialGradient>
        </defs>
        {paths.map((d, i) => (
          <g key={d}>
            <path d={d} />
            <circle r="3.5" fill="url(#pulse-grad)">
              <animateMotion dur={`${3.2 + i * 0.5}s`} repeatCount="indefinite" path={d} begin={`${i * 0.7}s`} />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
