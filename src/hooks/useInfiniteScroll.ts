import { useRef, useEffect, DependencyList, useCallback } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  deps: DependencyList
) => {
  const ref = useRef(null);

  const cb = useCallback(callback, deps);

  useEffect(() => {
    if (!!ref.current) {
      const element = ref.current;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cb();
          }
        });
      });
      observer.observe(element);
      return () => {
        observer.unobserve(element);
      };
    }
  }, [cb]);

  return { ref };
};
