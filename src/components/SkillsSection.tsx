import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2 } from 'lucide-react';

const skillsData = [
  { name: 'HTML5', icon: '🌐', level: 75, category: 'Frontend' },
  { name: 'CSS3', icon: '🎨', level: 75, category: 'Frontend' },
  { name: 'JavaScript', icon: '⚡', level: 70, category: 'Frontend' },
  { name: 'React', icon: '⚛️', level: 55, category: 'Frontend' },
  { name: 'TypeScript', icon: '📘', level: 70, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '💨', level: 50, category: 'Frontend' },
  { name: 'Next.js', icon: '▲', level: 55, category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', level: 70, category: 'Backend' },
  { name: 'Python', icon: '🐍', level: 70, category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', level: 70, category: 'Backend' },
  { name: 'MySQL', icon: '🗄️', level: 55, category: 'Backend' },
  { name: 'C++', icon: '⚙️', level: 75, category: 'Languages' },
  { name: 'C', icon: '💻', level: 70, category: 'Languages' },
  { name: 'Git', icon: '🔧', level: 75, category: 'Tools' },
  { name: 'MATLAB', icon: '📊', level: 60, category: 'Tools' },
  { name: 'Arduino', icon: '🤖', level: 75, category: 'IoT' },
];

const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Tools', 'IoT'];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Simple background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--foreground)/0.03)_0%,transparent_70%)]" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pointer-events-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isInView ? 1 : 0, rotate: isInView ? 0 : -180 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-14 h-14 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center"
            >
              <Code2 className="w-7 h-7" />
            </motion.div>
            <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
              Technologies
            </span>
          </div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Skills &
            <motion.span 
              className="block text-muted-foreground"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Expertise
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-12 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 pointer-events-auto cursor-pointer ${
                activeCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 border border-foreground/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              data-cursor="pointer"
              type="button"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pointer-events-auto"
          layout
          transition={{ duration: 0.3 }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index}
              isHovered={hoveredSkill === skill.name}
              onHover={setHoveredSkill}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: 'Technologies', value: '15+' },
            { label: 'Projects Built', value: '10+' },
            { label: 'Years Coding', value: '2+' },
            { label: 'Certifications', value: '5+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/10"
              whileHover={{ scale: 1.05, borderColor: 'hsl(var(--foreground) / 0.3)' }}
              transition={{ duration: 0.3 }}
              data-cursor="pointer"
            >
              <motion.span 
                className="text-4xl md:text-5xl font-bold block mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

interface SkillCardProps {
  skill: typeof skillsData[0];
  index: number;
  isHovered: boolean;
  onHover: (name: string | null) => void;
  isInView: boolean;
}

const SkillCard = ({ skill, index, isHovered, onHover, isInView }: SkillCardProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50, scale: isInView ? 1 : 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      layout
    >
      <motion.div
        className="group relative p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/10 backdrop-blur-sm overflow-hidden h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        data-cursor="pointer"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, hsl(var(--foreground) / 0.1) 0%, transparent 70%)'
          }}
        />

        {/* Icon */}
        <motion.div 
          className="text-5xl mb-4"
          animate={{ 
            rotate: isHovered ? [0, -15, 15, -15, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.6 }}
        >
          {skill.icon}
        </motion.div>

        {/* Name */}
        <h3 className="text-lg font-semibold mb-3 group-hover:text-foreground transition-colors">
          {skill.name}
        </h3>

        {/* Progress Bar */}
        <div className="relative h-2 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-foreground/50 to-foreground rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${skill.level}%` : 0 }}
            transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
          />
        </div>

        {/* Level */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">{skill.category}</span>
          <motion.span 
            className="text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            {skill.level}%
          </motion.span>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rotate-45 bg-foreground/5"
            animate={{ 
              backgroundColor: isHovered ? 'hsl(var(--foreground) / 0.1)' : 'hsl(var(--foreground) / 0.05)'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
