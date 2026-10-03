import React, { useState, useEffect } from 'react';
import { CpuIcon, TerminalIcon, SparklesIcon, CheckIcon, ArrowUpRightIcon } from './Icons';

const INITIAL_HEAP = [
  { id: 1, address: '0x0050A000', size: 32, tag: 'Node* head', type: 'struct' },
  { id: 2, address: '0x0050A020', size: 64, tag: 'CacheBuffer', type: 'buffer' },
  { id: 3, address: '0x0050A060', size: 32, tag: 'QueueEntry', type: 'data' }
];

const INSTRUCTIONS = [
  { op: 'MOV', args: 'QWORD PTR [RSP-8], RAX', desc: 'Preserve accumulator' },
  { op: 'LEA', args: 'RDI, [HEAP_BASE + 0x80]', desc: 'Load effective address' },
  { op: 'CALL', args: 'malloc(size=32)', desc: 'Request dynamic heap memory' },
  { op: 'TEST', args: 'RAX, RAX', desc: 'Check NULL pointer return' },
  { op: 'MOV', args: '[RAX + 16], RDX', desc: 'Store struct member offset' },
  { op: 'RET', args: '', desc: 'Return to caller pipeline' }
];

export default function SystemsVisualizer() {
  const [heapBlocks, setHeapBlocks] = useState(INITIAL_HEAP);
  const [stepIndex, setStepIndex] = useState(0);
  const [ripOffset, setRipOffset] = useState(4012);
  const [raxValue, setRaxValue] = useState('0x0050A060');
  const [statusMessage, setStatusMessage] = useState('Process running • Memory segments initialized');
  const [allocating, setAllocating] = useState(false);

  // Allocate memory block (malloc)
  const handleMalloc = () => {
    if (heapBlocks.length >= 6) {
      setStatusMessage('Heap allocation threshold reached (max 6 blocks)');
      return;
    }

    setAllocating(true);
    const lastBlock = heapBlocks[heapBlocks.length - 1];
    const newAddressNum = lastBlock 
      ? parseInt(lastBlock.address, 16) + lastBlock.size 
      : 0x0050A000;
    
    const hexAddress = '0x' + newAddressNum.toString(16).toUpperCase().padStart(8, '0');
    const newId = Date.now();
    const tags = ['Vector2D', 'StateStack', 'AdjList*', 'CharToken', 'SysEvent'];
    const randomTag = tags[heapBlocks.length % tags.length];

    setTimeout(() => {
      const newBlock = {
        id: newId,
        address: hexAddress,
        size: 32,
        tag: randomTag,
        type: 'dynamic'
      };

      setHeapBlocks((prev) => [...prev, newBlock]);
      setRaxValue(hexAddress);
      setStepIndex(2); // Jump to CALL malloc instruction
      setRipOffset((prev) => prev + 4);
      setStatusMessage(`malloc(32B) -> Allocated chunk at ${hexAddress}`);
      setAllocating(false);
    }, 200);
  };

  // Free latest memory block (free)
  const handleFree = () => {
    if (heapBlocks.length === 0) {
      setStatusMessage('Heap is empty • Nothing to free');
      return;
    }

    const freedBlock = heapBlocks[heapBlocks.length - 1];
    setHeapBlocks((prev) => prev.slice(0, -1));
    setRaxValue('0x00000000');
    setRipOffset((prev) => prev + 4);
    setStatusMessage(`free(${freedBlock.address}) -> Coalesced ${freedBlock.size} bytes`);
  };

  // Step instruction
  const handleStep = () => {
    setStepIndex((prev) => (prev + 1) % INSTRUCTIONS.length);
    setRipOffset((prev) => prev + 4);
    setStatusMessage(`Executed instruction: ${INSTRUCTIONS[(stepIndex + 1) % INSTRUCTIONS.length].op}`);
  };

  // Reset memory layout
  const handleReset = () => {
    setHeapBlocks(INITIAL_HEAP);
    setStepIndex(0);
    setRipOffset(4012);
    setRaxValue('0x0050A060');
    setStatusMessage('Memory state reset to initial execution stack');
  };

  const totalAllocatedBytes = heapBlocks.reduce((acc, b) => acc + b.size, 0);

  return (
    <div className="systems-visualizer-card" id="systems-visualizer">
      {/* Visualizer Titlebar */}
      <div className="visualizer-header">
        <div className="visualizer-window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        
        <div className="visualizer-title-badge">
          <CpuIcon size={14} className="text-terracotta" />
          <span className="visualizer-title-text">systems_runtime_x86_64.elf</span>
        </div>

        <div className="visualizer-pid-badge">
          <span className="status-live-dot" />
          <span>PID: 2048</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="visualizer-body">
        {/* CPU Register Bank */}
        <div className="registers-container">
          <span className="micro-label">CPU Registers (x86_64)</span>
          <div className="registers-grid">
            <div className="register-box">
              <span className="reg-name">RAX</span>
              <span className="reg-value text-terracotta">{raxValue}</span>
            </div>
            <div className="register-box">
              <span className="reg-name">RSP</span>
              <span className="reg-value">0x7FFEB9C0</span>
            </div>
            <div className="register-box">
              <span className="reg-name">RBP</span>
              <span className="reg-value">0x7FFEB9E0</span>
            </div>
            <div className="register-box">
              <span className="reg-name">RIP</span>
              <span className="reg-value text-amber">0x0040{ripOffset.toString(16).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Current Machine Instruction Banner */}
        <div className="current-instruction-box">
          <div className="instruction-indicator">
            <span className="inst-badge">IP</span>
            <code className="inst-code">
              <span className="inst-op">{INSTRUCTIONS[stepIndex].op}</span>{' '}
              <span className="inst-args">{INSTRUCTIONS[stepIndex].args}</span>
            </code>
          </div>
          <span className="inst-comment">// {INSTRUCTIONS[stepIndex].desc}</span>
        </div>

        {/* Memory Architecture Visual Map */}
        <div className="memory-map-section">
          <div className="memory-map-header">
            <span className="micro-label">Virtual Memory Address Space</span>
            <span className="memory-usage-stat">
              Heap: <strong className="text-terracotta">{totalAllocatedBytes}B</strong> / 512B
            </span>
          </div>

          <div className="memory-segments-track">
            {/* Fixed Stack Frame */}
            <div className="mem-segment segment-stack" title="Stack Frame: local pointers & variables">
              <span className="segment-label">STACK (main)</span>
              <span className="segment-sub">0x7FFE_B9C0</span>
            </div>

            {/* Dynamic Heap Blocks */}
            <div className="heap-blocks-container">
              {heapBlocks.map((block) => (
                <div 
                  key={block.id} 
                  className={`mem-segment segment-heap ${block.type === 'dynamic' ? 'heap-new-pulse' : ''}`}
                  title={`${block.tag} @ ${block.address} (${block.size}B)`}
                >
                  <span className="segment-label">{block.tag}</span>
                  <span className="segment-sub">{block.size}B</span>
                </div>
              ))}
            </div>

            {/* Unallocated / Free Memory */}
            <div className="mem-segment segment-free" title="Available unmapped memory">
              <span className="segment-label">FREE HEAP</span>
              <span className="segment-sub">{512 - totalAllocatedBytes}B</span>
            </div>
          </div>
        </div>

        {/* Interactive Control Panel */}
        <div className="visualizer-controls-bar">
          <div className="controls-group">
            <button
              type="button"
              className="btn-viz-action btn-viz-malloc"
              onClick={handleMalloc}
              disabled={allocating || heapBlocks.length >= 6}
              title="Allocate a 32-byte chunk on the heap"
            >
              <span className="action-symbol">+</span>
              <span>malloc(32B)</span>
            </button>

            <button
              type="button"
              className="btn-viz-action btn-viz-free"
              onClick={handleFree}
              disabled={heapBlocks.length === 0}
              title="Free the top heap chunk"
            >
              <span className="action-symbol">−</span>
              <span>free()</span>
            </button>

            <button
              type="button"
              className="btn-viz-action btn-viz-step"
              onClick={handleStep}
              title="Execute next CPU instruction"
            >
              <span>Step Cycle</span>
              <span className="action-arrow-inline">→</span>
            </button>
          </div>

          <button
            type="button"
            className="btn-viz-reset"
            onClick={handleReset}
            title="Reset memory state"
          >
            Reset
          </button>
        </div>

        {/* Status Line */}
        <div className="visualizer-status-line">
          <TerminalIcon size={12} className="status-terminal-icon" />
          <span className="status-message-text">{statusMessage}</span>
        </div>
      </div>

      {/* Visualizer Footer Telemetry */}
      <div className="visualizer-footer-telemetry">
        <div className="telemetry-item">
          <span className="telemetry-key">Arch:</span>
          <span className="telemetry-val">x86_64 SysV ABI</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-key">L1 Cache:</span>
          <span className="telemetry-val text-green">98.8% Hit</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-key">Pages:</span>
          <span className="telemetry-val">4KB Active</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-key">Env:</span>
          <span className="telemetry-val">POSIX / C99</span>
        </div>
      </div>
    </div>
  );
}
