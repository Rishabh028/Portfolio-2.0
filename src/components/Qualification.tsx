import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    institute: 'Indian Institute of Technology, Guwahati',
    degree: 'B.Tech in Electronics and Communication Engineering',
    years: '2022 - 2026',
    location: 'Guwahati, Assam',
    achievements: ['Focus: Full-Stack Development & IoT Systems', 'Active member of coding clubs'],
    icon: '🎓',
  },
  {
    institute: 'Kendriya Vidyalaya No-1 Ishapore',
    degree: 'Class XII (CBSE)',
    years: '2020 - 2022',
    location: 'West Bengal, India',
    achievements: ['Science Stream with Computer Science'],
    icon: '📚',
  },
  {
    institute: 'Kendriya Vidyalaya No-1 Ishapore',
    degree: 'Class X (CBSE)',
    years: '2010 - 2020',
    location: 'West Bengal, India',
    achievements: ['Foundation in Mathematics & Science'],
    icon: '📖',
  },
];

export const Qualification = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Velocity-based effects
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityRotate = useTransform(smoothVelocity, [-0.5, 0.5], [-3, 3]);
  const velocityX = useTransform(smoothVelocity, [-0.5, 0.5], [-20, 20]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Continuous floating animation values
  const floatY1 = useMotionValue(0);
  const floatY2 = useMotionValue(0);
  const floatX1 = useMotionValue(0);
  const floatRotate1 = useMotionValue(0);
  const floatRotate2 = useMotionValue(0);
  
  const springY1 = useSpring(floatY1, { stiffness: 30, damping: 10 });
  const springY2 = useSpring(floatY2, { stiffness: 25, damping: 12 });
  const springX1 = useSpring(floatX1, { stiffness: 20, damping: 10 });
  const springRotate1 = useSpring(floatRotate1, { stiffness: 15, damping: 8 });
  const springRotate2 = useSpring(floatRotate2, { stiffness: 12, damping: 6 });

  useEffect(() => {
    let animationId: number;

    // Continuous animation loop
    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      
      floatY1.set(Math.sin(t * 0.7) * 18);
      floatY2.set(Math.sin(t * 0.5 + 1.5) * 22);
      floatX1.set(Math.sin(t * 0.4) * 25);
      floatRotate1.set(Math.sin(t * 0.3) * 10);
      floatRotate2.set(Math.cos(t * 0.25) * 15);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    // Timeline line reveal animation
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center 50%',
            scrub: 0.5,
          }
        }
      );
    }

    return () => {
      cancelAnimationFrame(animationId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="qualification" 
      className="py-32 relative overflow-hidden"
    >
      {/* Continuous floating background elements */}
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ 
          background: 'var(--gradient-primary)', 
          y: springY1, 
          x: springX1,
          rotate: springRotate1
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-20 w-32 h-32 rounded-full blur-2xl opacity-15"
        style={{ 
          background: 'hsl(var(--foreground) / 0.1)', 
          y: springY2,
          rotate: springRotate2
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ 
          background: 'var(--gradient-accent)',
          y: springY2,
          x: velocityX,
          rotate: velocityRotate
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full blur-xl opacity-10"
        style={{ 
          background: 'hsl(var(--foreground) / 0.1)',
          y: springY1,
          rotate: springRotate2
        }}
      />

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-14 h-14 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center"
            >
              <GraduationCap className="w-7 h-7" />
            </motion.div>
            <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
              Qualification
            </span>
          </div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Education
            <motion.span 
              className="block text-muted-foreground"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              & Journey
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div 
            ref={timelineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent origin-top"
          />

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Timeline Node */}
              <motion.div 
                className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-2 border-foreground/30 z-10"
                animate={{
                  scale: hoveredIndex === index ? 1.5 : 1,
                  borderColor: hoveredIndex === index ? 'hsl(var(--foreground))' : 'hsl(var(--foreground) / 0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="absolute inset-1 rounded-full bg-foreground"
                  animate={{ scale: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Content Card */}
              <motion.div 
                className={`ml-8 md:ml-0 md:w-[45%] ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
                style={{ y: useTransform(scrollYProgress, [0, 1], [50 - index * 20, -50 + index * 20]) }}
              >
                <motion.div
                  className="group relative p-6 md:p-8 rounded-2xl bg-foreground/[0.02] border border-foreground/10 backdrop-blur-sm overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  data-cursor="pointer"
                >
                  {/* Hover Gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--foreground) / 0.05) 0%, transparent 50%)'
                    }}
                  />

                  {/* Icon */}
                  <motion.span 
                    className="text-5xl mb-4 block"
                    animate={{ 
                      rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                      y: hoveredIndex === index ? -5 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {edu.icon}
                  </motion.span>

                  {/* Institute */}
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-foreground transition-colors">
                    {edu.institute}
                  </h3>

                  {/* Degree */}
                  <p className="text-muted-foreground mb-4">{edu.degree}</p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {edu.years}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Award className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span>{achievement}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 border-foreground/10 rounded-br-3xl"
                    animate={{
                      borderColor: hoveredIndex === index ? 'hsl(var(--foreground) / 0.3)' : 'hsl(var(--foreground) / 0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
