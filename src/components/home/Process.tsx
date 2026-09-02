
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to translate the machine view
  // Delay the start so stages 1 & 2 stay visible longer
  const xTransform = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0, -3425]);
  
  // Individual stage progress for animations (7 stages now)
  // Extended timing for stages 1 & 2
  const stage1Progress = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const stage2Progress = useTransform(scrollYProgress, [0.15, 0.32], [0, 1]);
  const stage3Progress = useTransform(scrollYProgress, [0.3, 0.48], [0, 1]);
  const stage4Progress = useTransform(scrollYProgress, [0.45, 0.62], [0, 1]);
  const stage5Progress = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const stage6Progress = useTransform(scrollYProgress, [0.72, 0.87], [0, 1]);
  const stage7Progress = useTransform(scrollYProgress, [0.84, 1], [0, 1]);

  const stages = [
    { title: "1. Billet Casting", desc: "Molten aluminium poured into casting molds" },
    { title: "2. Billet Homogenisation", desc: "Heat treatment for uniform structure" },
    { title: "3. Extrusion", desc: "Material forced through shaped die" },
    { title: "4. 3 Mode Quenching", desc: "Three-stage cooling process" },
    { title: "5. Stretching & Cutting", desc: "Straightening and precision cutting" },
    { title: "6. Ageing", desc: "Heat treatment for strength enhancement" },
    { title: "7. Packing", desc: "Protection and preparation for delivery" }
  ];

  return (
    <div ref={containerRef} className="relative " style={{ height: '500vh' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden ">
        {/* Blueprint Background */}
        <div className="absolute inset-0 ">
          <div className="absolute inset-0" style={{
           backgroundImage: "url('/images/process-bg.png')",
            // backgroundSize: '30px 30px',
            backgroundPosition:"center",
          }}></div>
        </div>

        {/* Header Info */}
        <div className="absolute top-24 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
               <div className="inline-block px-4 py-1.5  mb-3 ">
                <span className="text-[#ffb600] text-md normal-case md:text-md">Technical Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-2">
                Aluminium Extrusion Process
              </h2>
              <p className="text-gray-400 text-sm">Scroll down to explore each stage</p>
            </motion.div>
          </div>
        </div>

        {/* Stage Labels - Bottom */}
        <div className="absolute bottom-20 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
          </div>
        </div>

        {/* Scrolling Machine Diagram */}
        <div className="absolute inset-0 flex items-center overflow-hidden z-10" style={{ justifyContent: 'flex-start', paddingLeft: 'calc(50vw - 250px)' }}>
          <motion.div 
            style={{ x: xTransform }}
            className="flex items-center gap-26 md:gap-0 mt-30 md:mt-22"
          >
            {/* Stage 1: Billet Casting */}
            <svg width="" height="" viewBox="0 0 500 400" className="flex-shrink-0 w-[450px] h-[350px] md:w-[500px] md:h-[400px] ">
              {/* Crucible/Ladle */}
              <path d="M 100 100 L 80 140 L 80 160 L 180 160 L 180 140 L 160 100 Z" fill="none" stroke="#FFFFFF" strokeWidth="3" />
              <motion.rect 
                x="85" 
                y="130" 
                width="90" 
                height="25" 
                fill="#EF4444" 
                style={{ 
                  opacity: useTransform(stage1Progress, [0, 0.5], [0.6, 1])
                }}
              />
              
              {/* Pouring animation */}
              <motion.path
                d="M 180 150 Q 220 180 240 220"
                fill="none"
                stroke="#FFB600"
                strokeWidth="8"
                style={{ 
                  pathLength: useTransform(stage1Progress, [0.3, 0.8], [0, 1]),
                  opacity: useTransform(stage1Progress, [0.3, 0.8], [0, 1])
                }}
              />
              
              {/* Mold */}
              <rect x="200" y="220" width="120" height="100" fill="none" stroke="#FFFFFF" strokeWidth="3" />
              <rect x="210" y="230" width="100" height="80" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Molten metal filling mold */}
              <motion.rect 
                x="215" 
                y="300" 
                width="90" 
                height="0" 
                fill="#FFB600"
                style={{ 
                  height: useTransform(stage1Progress, [0.5, 1], [0, 75]),
                  y: useTransform(stage1Progress, [0.5, 1], [300, 235])
                }}
              />
              
              {/* Heat waves from molten metal */}
              <motion.path
                d="M 220 210 Q 240 200 260 210"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                style={{ opacity: useTransform(stage1Progress, [0.6, 1], [0, 0.8]) }}
              />
              <motion.path
                d="M 230 200 Q 250 190 270 200"
                fill="none"
                stroke="#FFB600"
                strokeWidth="2"
                style={{ opacity: useTransform(stage1Progress, [0.6, 1], [0, 0.6]) }}
              />
              
              {/* Labels */}
              <text x="250" y="80" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">BILLET CASTING</text>
              <text x="130" y="190" fill="#9CA3AF" fontSize="14">Molten Metal</text>
              <text x="260" y="360" fill="#9CA3AF" fontSize="14" textAnchor="middle">Casting Mold</text>
              
              {/* Temperature indicator */}
              <text x="250" y="380" fill="#EF4444" fontSize="12" textAnchor="middle">~700°C</text>
            </svg>

            {/* Stage 2: Billet Homogenisation */}
            <svg width="600" height="400" viewBox="0 0 600 400" className="flex-shrink-0 w-[450px] h-[450px] md:w-[600px] md:h-[400px] ">
              {/* Homogenisation furnace */}
              <rect x="50" y="120" width="400" height="180" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 4" />
              <rect x="60" y="130" width="380" height="160" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Billets inside furnace */}
              <motion.rect 
                x="100" 
                y="170" 
                width="80" 
                height="80" 
                fill="#6B7280" 
                stroke="#FFFFFF" 
                strokeWidth="2"
                style={{ 
                  fill: useTransform(stage2Progress, [0, 1], ['#6B7280', '#FFB600'])
                }}
              />
              <motion.rect 
                x="200" 
                y="170" 
                width="80" 
                height="80" 
                fill="#6B7280" 
                stroke="#FFFFFF" 
                strokeWidth="2"
                style={{ 
                  fill: useTransform(stage2Progress, [0.1, 1], ['#6B7280', '#FFB600'])
                }}
              />
              <motion.rect 
                x="300" 
                y="170" 
                width="80" 
                height="80" 
                fill="#6B7280" 
                stroke="#FFFFFF" 
                strokeWidth="2"
                style={{ 
                  fill: useTransform(stage2Progress, [0.2, 1], ['#6B7280', '#FFB600'])
                }}
              />
              
              {/* Heat distribution lines */}
              <motion.circle 
                cx="140" 
                cy="210" 
                r="50" 
                fill="#EF4444" 
                fillOpacity="0.1"
                style={{ 
                  scale: useTransform(stage2Progress, [0, 1], [0, 1.5]),
                  opacity: useTransform(stage2Progress, [0, 0.5, 1], [0, 0.3, 0.2])
                }}
              />
              <motion.circle 
                cx="240" 
                cy="210" 
                r="50" 
                fill="#FFB600" 
                fillOpacity="0.1"
                style={{ 
                  scale: useTransform(stage2Progress, [0.1, 1], [0, 1.5]),
                  opacity: useTransform(stage2Progress, [0.1, 0.6, 1], [0, 0.3, 0.2])
                }}
              />
              <motion.circle 
                cx="340" 
                cy="210" 
                r="50" 
                fill="#EF4444" 
                fillOpacity="0.1"
                style={{ 
                  scale: useTransform(stage2Progress, [0.2, 1], [0, 1.5]),
                  opacity: useTransform(stage2Progress, [0.2, 0.7, 1], [0, 0.3, 0.2])
                }}
              />
              
              {/* Temperature zones indicator */}
              <motion.rect 
                x="470" 
                y="150" 
                width="40" 
                height="120" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="2"
              />
              <motion.rect 
                x="475" 
                y="260" 
                width="30" 
                height="0" 
                fill="#22C55E"
                style={{ 
                  height: useTransform(stage2Progress, [0, 1], [0, 100]),
                  y: useTransform(stage2Progress, [0, 1], [260, 160])
                }}
              />
              
              {/* Labels */}
              <text x="250" y="100" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">HOMOGENISATION FURNACE</text>
              <text x="240" y="330" fill="#9CA3AF" fontSize="14" textAnchor="middle">Uniform Heat Treatment</text>
              <text x="495" y="290" fill="#9CA3AF" fontSize="12" textAnchor="middle">550°C</text>
              
              {/* Control panel */}
              <rect x="60" y="310" width="60" height="50" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="80" cy="330" r="5" fill="#22C55E" />
              <circle cx="100" cy="330" r="5" fill="#FFB600" />
              <rect x="70" y="345" width="40" height="8" fill="#FFFFFF" fillOpacity="0.3" />
            </svg>

            {/* Stage 3: Die Extrusion */}
            <svg width="600" height="400" viewBox="0 0 600 400" className="flex-shrink-0 w-[450px] h-[450px] md:w-[600px] md:h-[400px] ">
              {/* Container continued */}
              <rect x="50" y="170" width="150" height="80" fill="none" stroke="#FFFFFF" strokeWidth="3" />
              
              {/* Die */}
              <rect x="200" y="150" width="40" height="120" fill="#1F2937" stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="220" cy="210" r="15" fill="none" stroke="#FFB600" strokeWidth="3" />
              <circle cx="220" cy="210" r="8" fill="none" stroke="#FFB600" strokeWidth="2" />
              
              {/* Material flow lines */}
              <motion.path
                d="M 120 195 L 200 195"
                stroke="#FFB600"
                strokeWidth="4"
                style={{ 
                  pathLength: useTransform(stage3Progress, [0, 0.5], [0, 1]),
                  opacity: useTransform(stage3Progress, [0, 0.3], [0, 1])
                }}
              />
              <motion.path
                d="M 120 205 L 200 205"
                stroke="#FFB600"
                strokeWidth="4"
                style={{ 
                  pathLength: useTransform(stage3Progress, [0.1, 0.6], [0, 1]),
                  opacity: useTransform(stage3Progress, [0, 0.3], [0, 1])
                }}
              />
              <motion.path
                d="M 120 215 L 200 215"
                stroke="#FFB600"
                strokeWidth="4"
                style={{ 
                  pathLength: useTransform(stage3Progress, [0.2, 0.7], [0, 1]),
                  opacity: useTransform(stage3Progress, [0, 0.3], [0, 1])
                }}
              />
              
              {/* Extruded profile */}
              <motion.rect
                x="240"
                y="200"
                width="200"
                height="20"
                fill="#FFB600"
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ 
                  scaleX: useTransform(stage3Progress, [0.3, 1], [0, 1]),
                  transformOrigin: 'left center'
                }}
              />
              
              {/* Profile detail */}
              <motion.rect
                x="250"
                y="205"
                width="10"
                height="10"
                fill="#EF4444"
                style={{ 
                  opacity: useTransform(stage3Progress, [0.5, 1], [0, 1])
                }}
              />
              
              {/* Labels */}
              <text x="220" y="140" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">DIE</text>
              <text x="170" y="90" fill="#FFB600" fontSize="18" fontWeight="bold">EXTRUSION</text>
              <text x="340" y="190" fill="#9CA3AF" fontSize="14">Extruded Profile</text>
              
              {/* Temperature lines */}
              <motion.circle cx="260" cy="190" r="3" fill="#EF4444" style={{ opacity: useTransform(stage3Progress, [0.4, 1], [0, 0.8]) }} />
              <motion.circle cx="280" cy="185" r="3" fill="#EF4444" style={{ opacity: useTransform(stage3Progress, [0.5, 1], [0, 0.8]) }} />
              <motion.circle cx="300" cy="190" r="3" fill="#EF4444" style={{ opacity: useTransform(stage3Progress, [0.6, 1], [0, 0.8]) }} />
            </svg>

            {/* Stage 4: 3 Mode Quenching */}
            <svg width="600" height="400" viewBox="0 0 600 400" className="flex-shrink-0 w-[450px] h-[450px] md:w-[600px] md:h-[400px] ">
              {/* Three cooling zones */}
              {/* Zone 1: Water Quench */}
              <rect x="50" y="120" width="140" height="200" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
              <text x="120" y="110" fill="#FFB600" fontSize="12" textAnchor="middle">Zone 1: Water</text>
              
              {/* Zone 2: Air Cooling */}
              <rect x="200" y="120" width="140" height="200" fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 2" />
              <text x="270" y="110" fill="#22C55E" fontSize="12" textAnchor="middle">Zone 2: Air</text>
              
              {/* Zone 3: Mist Cooling */}
              <rect x="350" y="120" width="140" height="200" fill="none" stroke="#FFB600" strokeWidth="2" strokeDasharray="4 2" />
              <text x="420" y="110" fill="#FFB600" fontSize="12" textAnchor="middle">Zone 3: Mist</text>
              
              {/* Conveyor table */}
              <rect x="50" y="280" width="440" height="40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="80" y1="320" x2="80" y2="340" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="180" y1="320" x2="180" y2="340" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="280" y1="320" x2="280" y2="340" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="380" y1="320" x2="380" y2="340" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="460" y1="320" x2="460" y2="340" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Profile moving through zones */}
              <motion.rect 
                x="70" 
                y="260" 
                width="400" 
                height="20" 
                fill="#FFB600" 
                stroke="#FFFFFF" 
                strokeWidth="2"
                style={{ 
                  fill: useTransform(stage4Progress, [0, 0.3, 0.6, 1], ['#EF4444', '#FFB600', '#FFB600', '#6B7280'])
                }}
              />
              
              {/* Zone 1: Water spray nozzles */}
              <rect x="80" y="180" width="20" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="140" y="180" width="20" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Water droplets Zone 1 */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`water-1-${i}`}
                  cx={90}
                  cy={240}
                  r="2"
                  fill="#FFFFFF"
                  animate={{
                    cy: [240, 260],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.25
                  }}
                  style={{
                    opacity: useTransform(stage4Progress, [0, 0.3], [0, 1])
                  }}
                />
              ))}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`water-2-${i}`}
                  cx={150}
                  cy={240}
                  r="2"
                  fill="#FFFFFF"
                  animate={{
                    cy: [240, 260],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.25 + 0.1
                  }}
                  style={{
                    opacity: useTransform(stage4Progress, [0, 0.3], [0, 1])
                  }}
                />
              ))}
              
              {/* Zone 2: Air flow indicators */}
              {[0, 1, 2, 3].map((i) => (
                <motion.path
                  key={`air-${i}`}
                  d={`M ${230 + i * 20} 200 L ${240 + i * 20} 260`}
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{
                    opacity: useTransform(stage4Progress, [0.3, 0.6], [0, 0.6])
                  }}
                />
              ))}
              
              {/* Zone 3: Mist particles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.circle
                  key={`mist-${i}`}
                  cx={370 + (i % 3) * 30}
                  cy={200 + Math.floor(i / 3) * 30}
                  r="1.5"
                  fill="#FFB600"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    opacity: useTransform(stage4Progress, [0.6, 1], [0, 1])
                  }}
                />
              ))}
              
              {/* Labels */}
              <text x="270" y="70" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">3 MODE QUENCHING</text>
              <text x="270" y="370" fill="#9CA3AF" fontSize="14" textAnchor="middle">Three-Stage Cooling Process</text>
            </svg>

            {/* Stage 5: Stretching & Cutting */}
            <svg width="600" height="400" viewBox="0 0 850 400" className="flex-shrink-0 w-[380px] h-[550px] md:w-[600px] md:h-[400px] ">
              {/* Stretcher grips */}
              <rect x="50" y="195" width="40" height="30" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="410" y="195" width="40" height="30" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Arrows showing stretch direction */}
              <motion.path
                d="M 40 210 L 20 210"
                stroke="#22C55E"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                style={{ opacity: useTransform(stage5Progress, [0, 1], [0, 1]) }}
              />
              <motion.path
                d="M 460 210 L 480 210"
                stroke="#22C55E"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                style={{ opacity: useTransform(stage5Progress, [0, 1], [0, 1]) }}
              />
              
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#22C55E" />
                </marker>
              </defs>
              
              {/* Profile being stretched */}
              <motion.rect
                x="90"
                y="200"
                width="320"
                height="20"
                fill="#FFB600"
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ 
                  scaleX: useTransform(stage5Progress, [0, 0.6], [1, 1.05])
                }}
              />
              
              {/* Saw */}
              <motion.g
              
                style={{ 
                  x: useTransform(stage5Progress, [0.6, 1], [500, 250]),
            
                }}
                
              >
                <circle cx="280" cy="140" r="40" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                 
                 <line
                   key={i}
                    x1={280 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
                    y1={140 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
                    x2={280 + 45 * Math.cos((i * 30 * Math.PI) / 180)}
                    y2={140 + 45 * Math.sin((i * 30 * Math.PI) / 180)}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                ))}
              </motion.g>
              
              {/* Cut line indicator */}
              <motion.line
                x1="250"
                y1="180"
                x2="250"
                y2="240"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4 4"
                style={{ 
                  opacity: useTransform(stage5Progress, [0.8, 1], [0, 1])
                }}
              />
              
              {/* Labels */}
              <text x="250" y="90" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">STRETCHING & CUTTING</text>
              <text x="150" y="320" fill="#9CA3AF" fontSize="14">Straightening</text>
              <text x="280" y="320" fill="#9CA3AF" fontSize="14">Precision Cutting</text>
            </svg>

            {/* Stage 6: Ageing/Heat Treatment */}
            <svg width="500" height="400" viewBox="0 0 500 400" className="flex-shrink-0 w-[450px] h-[550px] md:w-[600px] md:h-[400px]">
              {/* Aging oven */}
              <rect x="80" y="120" width="300" height="180" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 4" />
              <rect x="90" y="130" width="280" height="160" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Racks with profiles */}
              <rect x="120" y="160" width="200" height="15" fill="#FFB600" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="120" y="200" width="200" height="15" fill="#FFB600" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="120" y="240" width="200" height="15" fill="#FFB600" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Heat indicators */}
              <motion.circle 
                cx="200" 
                cy="190" 
                r="15" 
                fill="#EF4444" 
                fillOpacity="0.2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <motion.circle 
                cx="200" 
                cy="230" 
                r="15" 
                fill="#FFB600" 
                fillOpacity="0.2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              
              {/* Temperature gauge */}
              <circle cx="350" cy="200" r="40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <motion.path
                d="M 350 200 L 350 165"
                stroke="#EF4444"
                strokeWidth="3"
                style={{
                  rotate: useTransform(stage5Progress, [0, 1], [0, 90]),
                  transformOrigin: '350px 200px'
                }}
              />
              <circle cx="350" cy="200" r="5" fill="#FFFFFF" />
              
              {/* Labels */}
              <text x="230" y="100" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">AGING OVEN</text>
              <text x="200" y="330" fill="#9CA3AF" fontSize="14" textAnchor="middle">Heat Treatment</text>
              <text x="350" y="260" fill="#9CA3AF" fontSize="12" textAnchor="middle">165-190°C</text>
              
              {/* Checkmark for complete */}
              <motion.circle
                cx="430"
                cy="150"
                r="25"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                style={{ opacity: useTransform(stage5Progress, [0.7, 1], [0, 1]) }}
              />
              <motion.path
                d="M 418 150 L 425 157 L 442 140"
                stroke="#22C55E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ 
                  pathLength: useTransform(stage5Progress, [0.7, 1], [0, 1]),
                  opacity: useTransform(stage5Progress, [0.7, 1], [0, 1])
                }}
              />
            </svg>

            {/* Stage 7: Packing */}
            <svg width="550" height="400" viewBox="0 0 550 400" className="flex-shrink-0 h-[300px] w-[450px] md:w-[550px] md:h-[400px]">
              {/* Packaging station frame */}
              <rect x="50" y="90" width="450" height="200" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 4" />
              <rect x="60" y="100" width="430" height="180" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Conveyor belt */}
              <rect x="80" y="240" width="390" height="25" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
              {/* Conveyor rollers */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <circle key={`roller-${i}`} cx={110 + i * 55} cy="252" r="8" fill="#FFFFFF" fillOpacity="0.3" />
              ))}
              
              {/* Profile bundles */}
              <motion.g
                style={{ 
                  opacity: useTransform(stage7Progress, [0, 0.2], [0, 1])
                }}
              >
                <rect x="120" y="210" width="100" height="30" fill="#FFB600" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="145" y1="210" x2="145" y2="240" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="170" y1="210" x2="170" y2="240" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="195" y1="210" x2="195" y2="240" stroke="#FFFFFF" strokeWidth="1" />
              </motion.g>
              
              {/* Protective wrap being applied */}
              <motion.rect 
                x="120" 
                y="205" 
                width="0" 
                height="40" 
                fill="#FFB600" 
                fillOpacity="0.3"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeDasharray="3 2"
                style={{ 
                  width: useTransform(stage7Progress, [0.2, 0.5], [0, 100])
                }}
              />
              
              {/* Packaging box/crate */}
              <motion.g
                style={{ 
                  opacity: useTransform(stage7Progress, [0.4, 0.6], [0, 1])
                }}
              >
                <rect x="300" y="160" width="140" height="80" fill="none" stroke="#FFB600" strokeWidth="3" />
                <rect x="310" y="170" width="120" height="60" fill="#FFB600" fillOpacity="0.1" stroke="#FFB600" strokeWidth="2" />
                {/* Box strapping */}
                <line x1="300" y1="200" x2="440" y2="200" stroke="#22C55E" strokeWidth="3" />
                <line x1="370" y1="160" x2="370" y2="240" stroke="#22C55E" strokeWidth="3" />
              </motion.g>
              
              {/* Label being applied */}
              <motion.rect 
                x="320" 
                y="180" 
                width="80" 
                height="40" 
                fill="#FFFFFF" 
                stroke="#FFFFFF" 
                strokeWidth="2"
                style={{ 
                  opacity: useTransform(stage7Progress, [0.6, 0.8], [0, 1]),
                  scale: useTransform(stage7Progress, [0.6, 0.8], [0.5, 1])
                }}
              />
              <motion.text 
                x="360" 
                y="195" 
                fill="#1F2937" 
                fontSize="10" 
                textAnchor="middle"
                style={{ 
                  opacity: useTransform(stage7Progress, [0.7, 0.9], [0, 1])
                }}
              >
                ALUMINIUM
              </motion.text>
              <motion.text 
                x="360" 
                y="208" 
                fill="#1F2937" 
                fontSize="8" 
                textAnchor="middle"
                style={{ 
                  opacity: useTransform(stage7Progress, [0.7, 0.9], [0, 1])
                }}
              >
                Extrusion
              </motion.text>
              
              {/* Quality check mark */}
              <motion.circle
                cx="470"
                cy="130"
                r="20"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                style={{ opacity: useTransform(stage7Progress, [0.8, 1], [0, 1]) }}
              />
              <motion.path
                d="M 462 130 L 467 135 L 478 124"
                stroke="#22C55E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ 
                  pathLength: useTransform(stage7Progress, [0.85, 1], [0, 1]),
                  opacity: useTransform(stage7Progress, [0.85, 1], [0, 1])
                }}
              />
              
              {/* Forklift/Ready indicator */}
              <motion.g
                style={{ 
                  opacity: useTransform(stage7Progress, [0.9, 1], [0, 1])
                }}
              >
                <rect x="460" y="240" width="40" height="25" fill="#FFB600" stroke="#FFFFFF" strokeWidth="2" />
                <text x="480" y="257" fill="#1F2937" fontSize="10" textAnchor="middle">SHIP</text>
              </motion.g>
              
              {/* Labels */}
              <text x="275" y="70" fill="#FFB600" fontSize="18" fontWeight="bold" textAnchor="middle">PACKING & PROTECTION</text>
              <text x="170" y="310" fill="#9CA3AF" fontSize="14">Protective Wrapping</text>
              <text x="350" y="310" fill="#9CA3AF" fontSize="14">Quality Check & Label</text>
              
              {/* Process complete indicator */}
              <motion.text 
                x="275" 
                y="340" 
                fill="#22C55E" 
                fontSize="14" 
                textAnchor="middle"
                style={{ 
                  opacity: useTransform(stage7Progress, [0.95, 1], [0, 1])
                }}
              >
                Ready for Delivery
              </motion.text>
            </svg>
          </motion.div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-77 h-2 bg-[#ffffff1a] rounded-full overflow-hidden z-40 shadow-lg ">
          <motion.div 
            className="h-full bg-[#ffb600] rounded-full "
            style={{ 
              scaleX: scrollYProgress,
              transformOrigin: 'left'
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Process;