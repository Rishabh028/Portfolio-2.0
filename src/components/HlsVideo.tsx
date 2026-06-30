import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export const HlsVideo = ({ src, ...props }: HlsVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: false // Sometimes workers fail in dev envs
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (props.autoPlay) {
          video.play().catch(e => console.log('Autoplay blocked', e));
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari where HLS is natively supported
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        if (props.autoPlay) {
          video.play().catch(e => console.log('Autoplay blocked', e));
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, props.autoPlay]);

  return <video ref={videoRef} {...props} />;
};
