export function SystemVisual() {
  return (
    <div className="system-visual" aria-hidden="true">
      <div className="orbit orbit-one"><span /></div>
      <div className="orbit orbit-two"><span /></div>
      <div className="core"><div className="core-ring" /><b>AI</b><small>PLATFORM</small></div>
      <div className="node node-a"><i />INFERENCE</div>
      <div className="node node-b"><i />DATA</div>
      <div className="node node-c"><i />OBSERVE</div>
      <div className="node node-d"><i />SHIP</div>
      <svg className="connections" viewBox="0 0 600 600">
        <path d="M300 300 C220 250 190 165 115 125" />
        <path d="M300 300 C380 250 430 175 505 145" />
        <path d="M300 300 C215 350 185 430 115 475" />
        <path d="M300 300 C390 345 430 425 515 470" />
      </svg>
    </div>
  );
}
