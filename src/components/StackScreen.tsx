import {
  CSSProperties,
  useState,
  useEffect,
  forwardRef,
  useRef,
  useLayoutEffect,
  MouseEvent,
  TouchEvent,
} from "react";
import { StackItem } from "../types";
import { getSearchParams } from "../utils/get-search-params";

const stackScreenStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100svh",
  background: "#fff",
  boxSizing: "border-box",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  willChange: "transform, opacity",
  overflow: "hidden",
  transition: `transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), filter 0.5s cubic-bezier(0.32, 0.72, 0, 1)`,
};

export const StackScreen = forwardRef<
  HTMLDivElement,
  {
    item: StackItem;
    index: number;
    totalCount: number;
    onExitComplete: (id: string) => void;
    onDragStart: (e: TouchEvent | MouseEvent, index: number) => void;
    [key: string]: any;
  }
>(({ item, index, totalCount, onExitComplete, onDragStart, ...rest }, ref) => {
  const [isMounted, setIsMounted] = useState(false);
  const [dynamicPadding, setDynamicPadding] = useState({
    paddingTop: 0,
    paddingBottom: 0,
  });
  const isExiting = item.transition === "pop";
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const elList =
      containerRef.current?.querySelectorAll<HTMLElement>(".stack-view");
    if (!elList) return;
    elList.forEach((el) => {
      el.style.paddingTop = `${dynamicPadding.paddingTop}px`;
      el.style.paddingBottom = `${dynamicPadding.paddingBottom}px`;
    });
  }, [dynamicPadding.paddingTop, dynamicPadding.paddingBottom]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onExitComplete(item.id);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isExiting, item.id, onExitComplete]);

  useEffect(() => {
    const searchParams = getSearchParams();
    setDynamicPadding({
      paddingTop: Number(searchParams["top"] || 0),
      paddingBottom: Number(searchParams["bottom"] || 0),
    });
  }, []);

  const isTop = index === totalCount - 1;

  const style: CSSProperties = {
    ...stackScreenStyle,
    display: "block",
    zIndex: index,
    pointerEvents: isTop ? "auto" : "none",
  };

  if (isExiting) {
    style.transform = `translateX(100%)`;
  } else if (isTop) {
    style.transform = isMounted ? "translateX(0)" : "translateX(100%)";
  } else {
    style.transform = `translateX(0)`;
    style.filter = `none`;
  }

  return (
    <div
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        containerRef.current = node;
      }}
      style={style}
      onTouchStart={(e) => onDragStart(e, index)}
      onMouseDown={(e) => onDragStart(e, index)}
      {...rest}>
      <item.Component {...item.props} isTop={isTop} />
    </div>
  );
});
