import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Cpu,
  Search,
  Sparkles,
  Github,
  CircuitBoard,
  Layers,
  CheckCircle2,
  TrendingUp,
  Server,
  Zap,
  Gauge,
  Network,
  Wrench,
  BatteryCharging,
  Radio
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

interface CoreProject {
  id: string
  title: string
  subtitle: string
  category: 'VLSI & Chip Design' | 'Embedded Systems' | 'IoT & Automation' | 'Robotics & Control' | 'Electrical & Power' | 'Mechanical & CAD'
  branch: string
  description: string
  keyDeliverables: string[]
  metrics: string
  technologies: string[]
  githubUrl?: string
  imageUrl: string
  featured?: boolean
}

const CORE_PROJECTS: CoreProject[] = [
  {
    id: 'riscv-pipelined-core',
    title: '32-Bit Pipelined RISC-V Processor Core (RV32I)',
    subtitle: '5-Stage Pipelined Architecture with Forwarding & Hazard Unit in Verilog',
    category: 'VLSI & Chip Design',
    branch: 'Electronics & Communication / ECE',
    description:
      'Engineered and synthesized an RV32I compliant 32-bit RISC-V microcontroller core. Implemented branch prediction, ALU arithmetic units, data/instruction cache memory controllers, and structural hazard detection units with 100% testbench verification.',
    keyDeliverables: [
      'Full 5-stage pipeline: Fetch, Decode, Execute, Memory, Writeback',
      'Data forwarding logic to eliminate stall cycles in load/store ops',
      'Synthesized on Xilinx Vivado and verified on Artix-7 FPGA board',
      'Timing closure achieved at 120 MHz clock frequency'
    ],
    metrics: '120 MHz Clock • Zero Timing Violations • 99.4% Test Coverage',
    technologies: ['Verilog HDL', 'SystemVerilog', 'Xilinx Vivado', 'ModelSim', 'FPGA Artix-7', 'GTKWave'],
    githubUrl: 'https://github.com/geekintern-internships/riscv-rv32i-core',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'stm32-rtos-telemetry',
    title: 'Automotive CAN Bus ECU & FreeRTOS Telemetry Gateway',
    subtitle: 'Real-Time Sensor Ingestion over CAN 2.0B with DMA and FreeRTOS Queues',
    category: 'Embedded Systems',
    branch: 'ECE / Electrical / Mechatronics',
    description:
      'Firmware architecture built on STM32 ARM Cortex-M4 microcontroller running FreeRTOS. Integrates OBD-II CAN bus communication, IMU accelerometer gyro filters, and flash logging with sub-millisecond task preemption.',
    keyDeliverables: [
      'Multi-task preemptive FreeRTOS scheduling with mutexes and event flags',
      'CAN 2.0B protocol transceiver driver configured with interrupt-driven DMA',
      'Extended Kalman Filter (EKF) sensor fusion for vehicle attitude estimation',
      'Low-power sleep state transitions reducing quiescent draw to 1.8 mA'
    ],
    metrics: '< 1ms Preemption Latency • 500 kbps CAN Rate • 0 dropped frames',
    technologies: ['Embedded C', 'STM32 CubeIDE', 'FreeRTOS', 'CAN Bus', 'ARM Cortex-M4', 'Saleae Logic'],
    githubUrl: 'https://github.com/geekintern-internships/stm32-freertos-can',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=900&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'industrial-iot-edge-node',
    title: 'Industrial IoT Edge Node with LoRaWAN & MQTT Telemetry',
    subtitle: 'Ultra-Low-Power Environmental & Vibration Telemetry for Industry 4.0',
    category: 'IoT & Automation',
    branch: 'ECE / Electrical / IoT',
    description:
      'Designed an edge-computing gateway utilizing ESP32 and SX1276 LoRa transceivers. Monitors 3-axis vibration FFT profiles on industrial machinery, detects bearing fatigue anomalies, and transmits telemetry to AWS IoT Core.',
    keyDeliverables: [
      'Edge FFT algorithm computing spectral peak frequencies directly on-chip',
      'LoRaWAN Class A node implementation with 8-channel gateway uplink',
      'Deep sleep optimization delivering 18+ month battery operational lifespan',
      'Encrypted TLS 1.3 payload dispatch to AWS IoT Core & Grafana dashboard'
    ],
    metrics: '8.4 km Non-Line-of-Sight Range • 18-Month Battery Lifespan',
    technologies: ['ESP-IDF', 'C++', 'LoRaWAN', 'AWS IoT Core', 'MQTT', 'KiCAD PCB', 'Grafana'],
    githubUrl: 'https://github.com/geekintern-internships/iiot-edge-gateway',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'bldc-motor-foc-drive',
    title: 'Field Oriented Control (FOC) Driver for BLDC & PMSM Motors',
    subtitle: 'Space Vector PWM (SVPWM) Inverter Drive for Electric Mobility',
    category: 'Electrical & Power',
    branch: 'Electrical Engineering / EEE',
    description:
      'Designed and simulated a 3-phase Field Oriented Control (FOC) motor inverter drive for light electric vehicle powertrains. Implemented Clark/Park transformations, current PI controllers, and sensorless back-EMF observer.',
    keyDeliverables: [
      'Space Vector Pulse Width Modulation (SVPWM) reducing total harmonic distortion',
      'Dual-shunt current sensing with fast ADC hardware trigger synchronization',
      'Regenerative braking algorithms restoring up to 14% kinetic battery charge',
      'Comprehensive MATLAB Simulink and hardware prototype thermal models'
    ],
    metrics: '96.2% Inverter Efficiency • < 3.2% Current THD',
    technologies: ['MATLAB / Simulink', 'Embedded C', 'TI C2000 DSP', 'Power Electronics', 'Altium Designer'],
    githubUrl: 'https://github.com/geekintern-internships/bldc-foc-drive',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'autonomous-ros2-rover',
    title: 'Autonomous Mobile Robot (AMR) Navigation with ROS 2 & LiDAR',
    subtitle: 'SLAM Mapping, Costmap Navigation2, and Obstacle Avoidance',
    category: 'Robotics & Control',
    branch: 'Robotics / Mechanical / Mechatronics',
    description:
      'Engineered an autonomous ground vehicle utilizing ROS 2 Humble, 2D LiDAR SLAM, and differential drive kinematics. Implemented Nav2 costmap path planners for dynamic warehouse obstacle avoidance.',
    keyDeliverables: [
      'Cartographer 2D LiDAR SLAM producing centimeter-accurate occupancy maps',
      'Nav2 behavior tree integration with recovery and path replanning nodes',
      'URDF robot model simulation in Gazebo physics engine with sensor noise',
      'PID velocity wheel feedback using optical encoder pulse decoders'
    ],
    metrics: '± 2cm Localization Precision • 1.2 m/s Autonomous Cruise',
    technologies: ['ROS 2 Humble', 'Python', 'C++', 'Gazebo', 'LiDAR', 'Differential Drive Kinematics'],
    githubUrl: 'https://github.com/geekintern-internships/ros2-autonomous-rover',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'drone-frame-fea-cad',
    title: 'Lightweight Carbon-Fiber Quadcopter Frame CAD & FEA Analysis',
    subtitle: 'Topology Optimization & Modal Vibration Analysis in SolidWorks & ANSYS',
    category: 'Mechanical & CAD',
    branch: 'Mechanical Engineering / Aero',
    description:
      'Architected a 450mm drone chassis optimized for high-payload aerial surveys. Conducted finite element analysis (FEA) for stress concentration, harmonic modal resonance, and aerodynamic CFD propeller wash.',
    keyDeliverables: [
      'Parametric 3D solid model designed in SolidWorks with CNC routing tolerances',
      'ANSYS static structural FEA confirming safety factor > 2.8 at 4G impact',
      'Modal resonance simulation ensuring natural frequency exceeds motor RPM excitation',
      'Weight reduced by 28% while maintaining structural arm torsional stiffness'
    ],
    metrics: '28% Weight Reduction • Safety Factor 2.85 • Modal Resonance Free',
    technologies: ['SolidWorks', 'ANSYS Mechanical', 'CFD Fluent', 'Topology Optimization', 'DFM / CNC'],
    githubUrl: 'https://github.com/geekintern-internships/drone-cad-fea',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=900&auto=format&fit=crop',
  }
]

const CATEGORIES = [
  'All Tracks',
  'VLSI & Chip Design',
  'Embedded Systems',
  'IoT & Automation',
  'Robotics & Control',
  'Electrical & Power',
  'Mechanical & CAD'
]

const CORE_ADVANTAGES = [
  {
    title: 'Hardware Simulation & Real Runtimes',
    desc: 'Work on actual FPGA RTL code, FreeRTOS kernel tasks, ROS 2 nodes, and ANSYS/MATLAB models rather than pure textbook theory.',
    icon: CircuitBoard
  },
  {
    title: 'College Lab & NOC Compliant',
    desc: 'Capstone projects directly fulfill 3rd & 4th year university lab requirements, major project vivas, and departmental credits.',
    icon: CheckCircle2
  },
  {
    title: 'Git Versioning for Hardware',
    desc: 'Document synthesizable Verilog, firmware drivers, KiCAD schematics, and CAD STEP models directly in reproducible GitHub repositories.',
    icon: Github
  },
  {
    title: 'Core Industry Alignment',
    desc: 'Curriculum designed for Texas Instruments, Qualcomm, Bosch, Intel, Tata Motors, and robotics startups recruiting engineers.',
    icon: Cpu
  }
]

export function CorePortfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All Tracks')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = CORE_PROJECTS.filter((proj) => {
    const matchesCat = selectedCategory === 'All Tracks' || proj.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesSearch
  })

  return (
    <PublicLayout>
      <PageTitle title="Core Engineering & Hardware Portfolio | Geek Intern" />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Hardware, Firmware & Systems
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950">
            Core Engineering <span className="text-blue-600">Portfolio</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Showcase of synthesizable Verilog RISC-V cores, FreeRTOS CAN telemetry firmware, Industrial IoT edge nodes, ROS 2 autonomous rovers, and FEA mechanical assemblies built by our core engineering interns.
          </p>

          {/* Key Stats Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">VLSI & FPGA</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">Synthesizable RTL</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">FreeRTOS</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">Real-Time Kernels</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">ROS 2 & SLAM</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">Autonomous Robotics</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">NOC Lab Verified</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto mt-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by track, tool, or branch (e.g. Verilog, STM32, ROS 2, FEA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-2xl shadow-sm text-sm focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Category Pills & Project Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-medium">
            <span>Showing <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> core engineering capstones</span>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-blue-600 hover:underline">
                Clear search
              </button>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group rounded-3xl bg-white border border-slate-200 hover:border-blue-300 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
              >
                <div>
                  {/* Image with overlay badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-900 border border-slate-200 shadow-xs">
                      {project.category}
                    </div>
                    {project.featured && (
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                        Flagship
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-medium">
                      <span>Target Branch: <strong className="text-slate-800">{project.branch}</strong></span>
                    </div>

                    <h2 className="text-lg font-extrabold text-slate-950 mb-1.5 group-hover:text-blue-600 transition-colors leading-snug">
                      {project.title}
                    </h2>

                    <p className="text-xs font-semibold text-blue-600 mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Key Engineering Deliverables */}
                    <div className="mb-5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical Deliverables</div>
                      {project.keyDeliverables.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Performance / Benchmark Metric */}
                    <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold text-slate-700 bg-blue-50/70 border border-blue-100 rounded-lg px-3 py-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{project.metrics}</span>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2 pt-4">
                    <Link
                      to={`/apply?domain=${encodeURIComponent(project.category)}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Apply For Core Track</span>
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors"
                        title="View Hardware Specs & Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Engineering Pillars Section */}
          <div className="mt-24 pt-16 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-3 px-3 py-1 font-semibold">
                Core Engineering Standard
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                Designed for Non-CS & Hardware Disciplines
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Gain verified practical experience in electronics, semiconductors, embedded systems, automotive firmware, and mechanical simulation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_ADVANTAGES.map((p, idx) => {
                const Icon = p.icon
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-8 md:p-14 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white tracking-tight">
                Accelerate Your Core Engineering Career
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Join our specialized core internships. Build hardware models, flash real microcontrollers, and obtain your verified certificate for university credits.
              </p>
              <Link to="/apply">
                <Button className="h-12 px-8 rounded-full bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs shadow-md">
                  Apply for Core Internships Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default CorePortfolio
