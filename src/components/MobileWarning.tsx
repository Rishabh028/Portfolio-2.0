import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, X } from 'lucide-react';

export const MobileWarning = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        const dismissed = sessionStorage.getItem('mobileWarningDismissed');
        if (!dismissed) {
          setShow(true);
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem('mobileWarningDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <div className="bg-black border border-white/20 rounded-xl p-4 flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Desktop Experience Recommended</p>
              <p className="text-white/60 text-xs">This site is best experienced on a larger screen</p>
            </div>
            <button
              onClick={handleDismiss}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};