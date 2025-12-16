import { motion, useScroll, useTransform, useMotionValue, useVelocity, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 'bingochat',
    number: '01',
    title: 'BingoChat',
    description: 'A full-stack, real-time chat application with modern design and seamless messaging.',
    tech: ['React', 'Socket.IO', 'Node.js', '+4'],
    github: 'https://github.com/Rishabh028/BingoChat.git',
    live: 'https://bingochat.onrender.com',
    longDescription: 'BingoChat is a full-stack, real-time chat application designed with a modern web development stack. It enables seamless messaging, secure user authentication, profile customization with avatars, and image sharing through a clean, responsive, and themeable user interface.',
    features: [
      { name: 'Real-time Messaging', desc: 'Instant bi-directional communication powered by Socket.io.' },
      { name: 'Secure User Authentication', desc: 'Robust signup, login, and session management using JSON Web Tokens (JWT).' },
      { name: 'Profile Management', desc: 'Users can customize their profile by updating their avatar and personal information.' },
      { name: 'Image Sharing', desc: 'Easily send and preview images directly within the chat, with cloud-based storage via Cloudinary.' },
      { name: 'Online Status Indicators', desc: 'See which users are currently online for real-time presence awareness.' },
      { name: 'Theme Customization', desc: 'A built-in theme switcher allows users to choose from over 30 DaisyUI themes.' },
      { name: 'Modern UX/UI', desc: 'Features a fully responsive design, animated loading skeletons, and non-intrusive toast notifications.' },
    ],
    techStack: {
      frontend: ['React', 'Vite', 'Tailwind CSS', 'DaisyUI', 'Zustand', 'Socket.io-client'],
      backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Socket.io', 'Cloudinary', 'JWT', 'bcryptjs'],
    },
  },
  {
    id: 'finflow',
    number: '02',
    title: 'FinFlow',
    description: 'IoT-enabled smart pond monitoring system for real-time water quality tracking.',
    tech: ['Arduino', 'NodeMCU', 'IoT', '+2'],
    github: 'https://github.com/Rishabh028/Finflow',
    longDescription: 'Finflow is an IoT-enabled smart pond monitoring system that automatically tracks multiple water quality parameters and alerts farmers when values exceed safe thresholds. Built with advanced sensor technology and cloud connectivity.',
    features: [
      { name: 'Multi-Parameter Sensing', desc: 'Monitors pH, TDS, turbidity, temperature, and dissolved oxygen levels in real-time.' },
      { name: 'Advanced Sensor Suite', desc: 'Integrates AS7265x Spectrometer for spectral analysis and water quality assessment.' },
      { name: 'Real-time Cloud Logging', desc: 'NodeMCU enables seamless data transmission to cloud platforms for monitoring.' },
      { name: 'Automated Alert System', desc: 'Instant notifications when water parameters exceed safe thresholds.' },
      { name: 'Wi-Fi Connectivity', desc: 'Remote monitoring capabilities through wireless network integration.' },
    ],
    techStack: {
      hardware: ['Arduino Mega', 'NodeMCU ESP8266', 'AS7265x Spectrometer', 'pH Sensor', 'TDS Sensor'],
      software: ['C++', 'Arduino IDE', 'ThingSpeak API', 'Serial Communication'],
    },
  },
  {
    id: 'stayfinder',
    number: '03',
    title: 'StayFinder Pro',
    description: 'Modern hotel booking platform with interactive maps and seamless reservation system.',
    tech: ['React', 'Supabase', 'Tailwind', '+3'],
    github: 'https://github.com/Rishabh028/StayFinder',
    live: 'https://stay-finder-75qt.vercel.app/',
    longDescription: 'StayFinder Pro is a modern, full-stack online hotel booking platform designed to help users discover, book, and manage unique stays. Features include interactive map views, advanced search filters, and a complete host dashboard.',
    features: [
      { name: 'Secure Authentication', desc: 'JWT and Bcrypt.js powered signup/login with session persistence.' },
      { name: 'Advanced Property Search', desc: 'Filter by location, price range, amenities, and availability dates.' },
      { name: 'Interactive Map View', desc: 'Leaflet.js powered map for visual property exploration.' },
      { name: 'Image Uploads', desc: 'Cloudinary integration for high-quality property image management.' },
      { name: 'Host Dashboard', desc: 'Complete property management interface for hosts to add/edit listings.' },
      { name: 'Complete Reservation System', desc: 'End-to-end booking flow with confirmation and cancellation support.' },
    ],
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'Zustand', 'Leaflet.js', 'React Router'],
      backend: ['Supabase', 'PostgreSQL', 'Cloudinary', 'JWT'],
    },
  },
  {
    id: 'codeverse',
    number: '04',
    title: 'CodeVerse',
    description: 'Real-time collaborative code editor for seamless pair programming sessions.',
    tech: ['React', 'Socket.IO', 'CodeMirror', '+2'],
    github: 'https://github.com/Rishabh028/CodeVerse',
    live: 'https://code-verse-6ji0ghvlk-rishabh028s-projects.vercel.app/',
    longDescription: 'CodeVerse is a feature-rich, real-time collaborative code editor designed to streamline pair programming and technical interviews. Multiple users can code together with instant synchronization.',
    features: [
      { name: 'Real-Time Collaboration', desc: 'Socket.io powered instant code synchronization across all connected users.' },
      { name: 'Rich Code Editor', desc: 'CodeMirror integration with syntax highlighting for multiple languages.' },
      { name: 'Room-Based Sessions', desc: 'UUID-based unique room generation for private coding sessions.' },
      { name: 'User Presence Avatars', desc: 'Visual indicators showing all active participants in a session.' },
      { name: 'Copy Room ID', desc: 'One-click room ID sharing for easy session invites.' },
      { name: 'Responsive Design', desc: 'Works seamlessly across desktop and tablet devices.' },
    ],
    techStack: {
      frontend: ['React', 'CodeMirror', 'Socket.io-client', 'UUID'],
      backend: ['Node.js', 'Express', 'Socket.io'],
    },
  },
  {
    id: 'dsa-visualizer',
    number: '05',
    title: 'DSA Visualizer',
    description: 'Interactive tool for visualizing data structures and algorithms step-by-step.',
    tech: ['React', 'JavaScript', 'Canvas', '+1'],
    github: 'https://github.com/Rishabh028/Data-Structure--Visualization',
    live: 'https://data-structure-visualization-alpha.vercel.app/',
    longDescription: 'An interactive web-based tool designed to help users visualize the functionality of various data structures and algorithms through step-by-step animations and controls.',
    features: [
      { name: 'Multiple Visualizers', desc: 'Interactive visualizations for Stacks, Queues, Binary Search Trees, and more.' },
      { name: 'Interactive Controls', desc: 'Add, remove, and manipulate data with intuitive UI controls.' },
      { name: 'Step-by-step Animations', desc: 'Clear animations showing how each operation affects the data structure.' },
      { name: 'Pathfinding Algorithms', desc: 'Visual representations of BFS, DFS, and other graph algorithms.' },
      { name: 'Educational Focus', desc: 'Designed to help students understand complex CS concepts visually.' },
    ],
    techStack: {
      frontend: ['React', 'JavaScript', 'HTML5 Canvas', 'CSS3'],
      tools: ['GitHub Pages', 'Webpack'],
    },
  },
  {
    id: 'full-duplex-radio',
    number: '06',
    title: 'Full Duplex Radio',
    description: 'Signal processing simulation for full-duplex radio communication systems.',
    tech: ['MATLAB', 'Signal Processing', 'DSP'],
    github: 'https://github.com/Rishabh028/Full-Duplex-Radio',
    longDescription: 'A comprehensive simulation project exploring full-duplex radio communication, focusing on self-interference cancellation techniques and signal processing algorithms.',
    features: [
      { name: 'Self-Interference Cancellation', desc: 'Implementation of digital and analog SI cancellation algorithms.' },
      { name: 'Signal Processing Simulation', desc: 'MATLAB-based simulation of radio frequency signals.' },
      { name: 'Performance Analysis', desc: 'Detailed metrics and visualizations of system performance.' },
      { name: 'Modulation Schemes', desc: 'Support for various modulation techniques including OFDM.' },
    ],
    techStack: {
      software: ['MATLAB', 'Simulink', 'Signal Processing Toolbox'],
      concepts: ['DSP', 'Wireless Communication', 'RF Engineering'],
    },
  },
  {
    id: 'smart-home',
    number: '07',
    title: 'Smart Home',
    description: 'IoT-based home automation system with mobile app control and voice integration.',
    tech: ['Arduino', 'ESP8266', 'IoT', '+2'],
    github: 'https://github.com/Rishabh028/Smart-Home',
    longDescription: 'A comprehensive smart home automation system that enables users to control appliances, monitor sensors, and automate routines through a mobile interface or voice commands.',
    features: [
      { name: 'Appliance Control', desc: 'Remote on/off control for lights, fans, and other home appliances.' },
      { name: 'Sensor Monitoring', desc: 'Real-time temperature, humidity, and motion detection.' },
      { name: 'Mobile App Interface', desc: 'User-friendly mobile application for remote control.' },
      { name: 'Voice Integration', desc: 'Compatible with voice assistants for hands-free control.' },
      { name: 'Automation Routines', desc: 'Schedule-based and trigger-based automation rules.' },
    ],
    techStack: {
      hardware: ['Arduino', 'ESP8266', 'Relay Modules', 'DHT11 Sensor', 'PIR Sensor'],
      software: ['C++', 'Blynk App', 'MQTT Protocol'],
    },
  },
  {
    id: 'our-voice',
    number: '08',
    title: 'Our Voice Our Rights',
    description: 'Social impact platform for information accessibility and civic engagement.',
    tech: ['React', 'Node.js', 'MongoDB', '+2'],
    github: 'https://github.com/Rishabh028/our-voice-our-rights',
    live: 'https://our-voice-our-rights-kyrgtd2ew-rishabh028s-projects.vercel.app/',
    longDescription: 'A platform designed to promote social awareness and civic engagement by providing accessible information about rights, resources, and community initiatives.',
    features: [
      { name: 'Information Hub', desc: 'Centralized repository of rights, laws, and civic resources.' },
      { name: 'Community Features', desc: 'Forum and discussion boards for community engagement.' },
      { name: 'Accessibility Focus', desc: 'Designed with accessibility standards for all users.' },
      { name: 'Resource Directory', desc: 'Searchable directory of legal aid and support organizations.' },
    ],
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'React Router'],
      backend: ['Node.js', 'Express', 'MongoDB'],
    },
  },
];

const ProjectCard = ({ 
  project, 
  index, 
  skewY,
  onClick 
}: { 
  project: typeof projectsData[0]; 
  index: number;
  skewY: number;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border-b border-foreground/10 py-8 md:py-12 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ 
        transform: `skewY(${skewY}deg)`,
        transition: 'transform 0.3s ease-out'
      }}
      data-cursor="pointer"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        {/* Number */}
        <motion.span 
          className="text-muted-foreground text-sm font-mono w-10"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          {project.number}
        </motion.span>

        {/* Title */}
        <motion.h3 
          className="text-3xl md:text-5xl font-bold flex-1"
          animate={{ x: isHovered ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {project.title}
        </motion.h3>

        {/* Tech Stack */}
        <div className="flex gap-2 flex-wrap md:justify-end">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-mono bg-foreground/5 text-muted-foreground rounded-full border border-foreground/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              data-cursor="pointer"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              data-cursor="pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Description on hover */}
      <motion.p
        className="text-muted-foreground mt-4 max-w-2xl"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        {project.description}
      </motion.p>
    </motion.div>
  );
};

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const timeRef = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Velocity-based skew effect
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const skewY = useTransform(smoothVelocity, [-0.5, 0.5], [-2, 2]);
  const velocityScale = useTransform(smoothVelocity, [-0.5, 0, 0.5], [0.98, 1, 1.02]);
  const velocityX = useTransform(smoothVelocity, [-0.5, 0.5], [-15, 15]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Continuous floating animation values
  const floatY1 = useMotionValue(0);
  const floatY2 = useMotionValue(0);
  const floatRotate = useMotionValue(0);
  
  const springY1 = useSpring(floatY1, { stiffness: 30, damping: 10 });
  const springY2 = useSpring(floatY2, { stiffness: 25, damping: 12 });
  const springRotate = useSpring(floatRotate, { stiffness: 15, damping: 8 });

  const [currentSkew, setCurrentSkew] = useState(0);

  useEffect(() => {
    let animationId: number;
    
    // Continuous animation loop
    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      
      floatY1.set(Math.sin(t * 0.5) * 12);
      floatY2.set(Math.sin(t * 0.4 + 1) * 18);
      floatRotate.set(Math.sin(t * 0.3) * 5);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    const unsubscribe = skewY.on('change', (v) => {
      setCurrentSkew(v);
    });
    
    return () => {
      cancelAnimationFrame(animationId);
      unsubscribe();
    };
  }, [skewY]);

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Continuous floating background elements */}
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ 
          background: 'hsl(var(--foreground) / 0.1)',
          y: springY1,
          rotate: springRotate
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-48 h-48 rounded-full blur-2xl opacity-10"
        style={{ 
          background: 'hsl(var(--foreground) / 0.08)',
          y: springY2,
          x: velocityX
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full blur-xl opacity-8"
        style={{ 
          background: 'hsl(var(--foreground) / 0.05)',
          y: springY1,
          scale: velocityScale
        }}
      />
      
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with float */}
        <motion.div className="mb-16" style={{ y: springY2 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4"
          >
            Featured Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold"
            style={{ x: velocityX }}
          >
            Recent Stuff
          </motion.h2>
        </motion.div>

        {/* Projects List */}
        <div className="border-t border-foreground/10">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              skewY={currentSkew}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </motion.div>

      {/* Project Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border border-foreground/20 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            {/* Overview */}
            <div>
              <h4 className="font-semibold mb-2 text-lg">Overview</h4>
              <p className="text-muted-foreground leading-relaxed">{selectedProject?.longDescription}</p>
            </div>
            
            {/* Features */}
            {selectedProject?.features && (
              <div>
                <h4 className="font-semibold mb-3 text-lg">Key Features</h4>
                <ul className="space-y-3">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-foreground font-semibold">{feature.name}:</span>
                      <span className="text-muted-foreground">{feature.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {selectedProject?.techStack && (
              <div>
                <h4 className="font-semibold mb-3 text-lg">Technologies Used</h4>
                <div className="space-y-3">
                  {Object.entries(selectedProject.techStack).map(([category, techs]) => (
                    <div key={category}>
                      <span className="text-sm text-muted-foreground capitalize">{category}:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono bg-foreground/10 text-foreground rounded-full border border-foreground/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3 pt-4 border-t border-foreground/10">
              {selectedProject?.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {selectedProject?.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/10 transition-colors flex items-center gap-2"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
