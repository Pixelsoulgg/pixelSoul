export const Animate = {
  whileHover: {scale: 1.01, boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)" },
  whileTap: {scale: 1.01, boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)" },
  tableHover: {         
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",     
    cursor: "pointer",
  }
}

export * from './variants';
export { default as MotionLazyContainer } from './MotionLazyContainer';
