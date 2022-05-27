import { useRef, useEffect } from "react";

export const useInfiniteScroll = (callback: () => void, deps: boolean) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!!ref.current) {
      const element = ref.current;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      });
      observer.observe(element);
      return () => {
        observer.unobserve(element);
      };
    }
  }, deps);

  return { ref };
};
