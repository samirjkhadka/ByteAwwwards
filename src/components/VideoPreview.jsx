import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();
    const xOffset = clientX - (rect.left + rect.right / 2);
    const yOffset = clientY - (rect.top + rect.bottom / 2);

    if (isHovering) {
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2,
        rotateX: -yOffset / 2,
        duration: 1,
        ease: "power1.inOut",
      });

      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.inOut",
      });
    }
  };

  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.inOut",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: "500px" }}
    >
      <div
        className="origin-center rounded-lg"
        ref={contentRef}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
