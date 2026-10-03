import React, { useState, useEffect, useRef, useCallback } from 'react';

/* -----------------------------------------------------------------------
   ThinkingCanvas — "thinking_canvas.ai"
   Interactive SVG skill knowledge graph with:
   - Animated breathing node pulses (GPU: opacity + transform only)
   - Mouse-hover to highlight connected nodes
   - Mouse parallax tilt on parent card (JS inline transform)
   ----------------------------------------------------------------------- */

const NODES = [
  { id: 'c',       label: 'C',         x: 0.18, y: 0.25, color: '#d97757', size: 20, ring: true  },
  { id: 'java',    label: 'Java',      x: 0.78, y: 0.22, color: '#e8d5c4', size: 18, ring: false },
  { id: 'python',  label: 'Python',    x: 0.50, y: 0.12, color: '#38bdf8', size: 18, ring: false },
  { id: 'dsa',     label: 'DSA',       x: 0.82, y: 0.62, color: '#34d399', size: 22, ring: true  },
  { id: 'systems', label: 'Systems',   x: 0.15, y: 0.70, color: '#d97757', size: 22, ring: true  },
  { id: 'sql',     label: 'SQL',       x: 0.50, y: 0.88, color: '#a8a6a0', size: 16, ring: false },
  { id: 'git',     label: 'Git',       x: 0.30, y: 0.50, color: '#f59e0b', size: 16, ring: false },
  { id: 'agenty',  label: 'AI Agents', x: 0.70, y: 0.48, color: '#c792ea', size: 18, ring: true  },
];

const EDGES = [
  ['c',       'systems'],
  ['c',       'git'],
  ['java',    'dsa'],
  ['java',    'git'],
  ['python',  'agenty'],
  ['python',  'git'],
  ['dsa',     'systems'],
  ['dsa',     'agenty'],
  ['systems', 'git'],
  ['sql',     'java'],
  ['sql',     'git'],
  ['agenty',  'git'],
];

const CODE_LINES = [
  { tokens: [{ t: 'kw', v: 'fn ' }, { t: 'fn', v: 'build_skill_graph' }, { t: 'plain', v: '(nodes: &[Node]) -> Graph {' }] },
  { tokens: [{ t: 'plain', v: '  ' }, { t: 'kw', v: 'let mut ' }, { t: 'plain', v: 'g = Graph::' }, { t: 'fn', v: 'new' }, { t: 'plain', v: '();' }] },
  { tokens: [{ t: 'comment', v: '  // connect interdisciplinary nodes' }] },
  { tokens: [{ t: 'plain', v: '  g.' }, { t: 'fn', v: 'connect' }, { t: 'plain', v: '("c", "systems");' }] },
  { tokens: [{ t: 'plain', v: '  g.' }, { t: 'fn', v: 'connect' }, { t: 'plain', v: '("dsa", "agenty");' }] },
  { tokens: [{ t: 'kw', v: '  g' }] },
];

export default function ThinkingCanvas() {
  const [activeNode, setActiveNode] = useState(null);
  //const [tick, setTick]             = useState(0);
  const [svgSize, setSvgSize]       = useState({ w: 360, h: 180 });
  const svgRef   = useRef(null);
  const cardRef  = useRef(null);
  const rafRef   = useRef(null);
  const tiltRef  = useRef({ x: 0, y: 0 });

  /* ── Slow breathing tick — GPU will-change handles it ── */
  //useEffect(() => {
  //  let t = 0;
  //  const id = setInterval(() => { t++; setTick(t); }, 100);
  //  return () => clearInterval(id);
  //}, []);

  /* ── SVG size measurement ── */
  useEffect(() => {
    const measure = () => {
      if (svgRef.current) {
        const r = svgRef.current.getBoundingClientRect();
        setSvgSize({ w: r.width || 360, h: r.height || 180 });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (svgRef.current) ro.observe(svgRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Mouse parallax tilt (rAF-throttled, GPU transform only) ── */
  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);  // −1 … 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // −1 … 1
    tiltRef.current = { x: dx, y: dy };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        if (cardRef.current) {
          const rx =  tiltRef.current.y * -6;   // rotate around X axis
          const ry =  tiltRef.current.x *  7;   // rotate around Y axis
          cardRef.current.style.transform =
            `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
        }
        rafRef.current = null;
      });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    tiltRef.current = { x: 0, y: 0 };
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 500ms cubic-bezier(0.16,1,0.3,1)';
      cardRef.current.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = 'transform 120ms cubic-bezier(0.16,1,0.3,1)';
      }, 500);
    }
  }, []);

  const { w, h } = svgSize;

  const nodePos   = (n) => ({ x: n.x * w, y: n.y * h });
  const getNode   = (id) => NODES.find((n) => n.id === id);
  const edgeHit   = (pair) => activeNode && pair.includes(activeNode);
  const isDimmed  = (id) => activeNode && activeNode !== id;

  return (
    <div
      ref={cardRef}
      className="thinking-canvas"
      id="thinking-canvas"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 120ms cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform',
      }}
    >
      {/* ── Header ── */}
      <div className="tc-header">
        <div className="tc-traffic-lights">
          <span className="tc-dot tc-dot-red"    />
          <span className="tc-dot tc-dot-yellow" />
          <span className="tc-dot tc-dot-green"  />
        </div>

        <div className="tc-title-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="m16 12-4-4-4 4m4-4v8"/>
          </svg>
          thinking_canvas.ai
        </div>

        <div className="tc-live-pill">
          <span className="live-dot" />
          LIVE
        </div>
      </div>

      {/* ── Body ── */}
      <div className="tc-body">

        {/* SVG Knowledge Graph */}
        <div className="tc-graph">
          <svg ref={svgRef} className="tc-svg" aria-label="Skill knowledge graph">

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const pa = nodePos(getNode(a));
              const pb = nodePos(getNode(b));
              const hit   = edgeHit([a, b]);
              const faded = activeNode && !hit;
              return (
                <line
                  key={i}
                  x1={pa.x} y1={pa.y}
                  x2={pb.x} y2={pb.y}
                  stroke={hit ? getNode(a).color : 'rgba(255,252,245,0.09)'}
                  strokeWidth={hit ? 1.6 : 0.8}
                  opacity={faded ? 0.15 : 1}
                  style={{ transition: 'stroke 0.22s ease, opacity 0.22s ease, stroke-width 0.22s ease' }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => {
              const p       = nodePos(node);
              const isActive = activeNode === node.id;
              const faded    = isDimmed(node.id);
              // Breathing: subtle sin wave per node, GPU opacity only
              const breatheOpacity = 0.14;

              return (
                <g
                  key={node.id}
                  style={{ cursor: 'pointer', willChange: 'opacity', transition: 'opacity 0.22s ease' }}
                  opacity={faded ? 0.25 : 1}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  {/* Ring — opacity animation only, no transform */}
                  {node.ring && (
                    <circle
                      cx={p.x} cy={p.y}
                      r={node.size + 7}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.8"
                      opacity={isActive ? 0.55 : breatheOpacity}
                      style={{ transition: 'opacity 0.35s ease' }}
                    />
                  )}

                  {/* Body */}
                  <circle
                    cx={p.x} cy={p.y}
                    r={node.size}
                    fill={isActive ? node.color : `${node.color}1e`}
                    stroke={node.color}
                    strokeWidth={isActive ? 1.8 : 1}
                    style={{ transition: 'fill 0.22s ease, r 0.22s cubic-bezier(0.34,1.56,0.64,1)', transformOrigin: `${p.x}px ${p.y}px` }}
                  />

                  {/* Label */}
                  <text
                    x={p.x} y={p.y + node.size + 12}
                    textAnchor="middle"
                    fontSize="9"
                    fill={isActive ? node.color : 'rgba(255,252,245,0.38)'}
                    fontFamily="'JetBrains Mono', monospace"
                    style={{ transition: 'fill 0.2s ease', userSelect: 'none', pointerEvents: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {activeNode && (() => {
            const n = getNode(activeNode);
            const cnt = EDGES.filter((e) => e.includes(activeNode)).length;
            return (
              <div style={{
                position: 'absolute', bottom: 4, right: 8,
                background: 'rgba(20,20,18,0.95)',
                border: `1px solid ${n.color}33`,
                borderRadius: 8,
                padding: '5px 10px',
                fontSize: 10, color: n.color,
                fontFamily: 'JetBrains Mono, monospace',
                pointerEvents: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.15s ease',
              }}>
                {n.label} · {cnt} connections
              </div>
            );
          })()}
        </div>

        {/* Code snippet */}
        <div className="tc-code-block">
          {CODE_LINES.map((line, li) => (
            <div key={li} className="tc-code-line">
              <span className="tc-line-num">{li + 1}</span>
              <span>
                {line.tokens.map((tok, ti) => (
                  <span key={ti} className={`tc-${tok.t}`}>{tok.v}</span>
                ))}
                {li === CODE_LINES.length - 1 && <span className="tc-cursor" />}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="tc-metrics">
          {[
            { val: '4',   key: 'Languages'   },
            { val: '12',  key: 'Connections' },
            { val: '2nd', key: 'Year CSE'    },
          ].map(({ val, key }) => (
            <div key={key} className="tc-metric">
              <span className="tc-metric-val">{val}</span>
              <span className="tc-metric-key">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer telemetry ── */}
      <div className="tc-footer">
        {[
          ['Model',  'Graph v2.0'],
          ['Nodes',  `${NODES.length} active`],
          ['Stack',  'Vite · React'],
          ['Status', 'learning →'],
        ].map(([k, v]) => (
          <div key={k} className="tc-footer-item">
            <span>{k}:</span>
            <span style={k === 'Status' ? { color: 'var(--emerald)' } : {}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
