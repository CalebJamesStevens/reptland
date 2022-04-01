function Conditional({ children, condition }) {
    if (!condition) return <></>;
    return <>{children}</>;
  }
  
export default Conditional;
  