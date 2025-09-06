import React from "react";

interface APIExampleProps {
  functionName: string;
  code: string;
  result: React.ReactNode;
  className?: string;
}

export const APIExample: React.FC<APIExampleProps> = ({
  functionName,
  code,
  result,
  className = "",
}) => {
  return (
    <div className={`api-example ${className}`}>
      <div className="function-name">{functionName}</div>
      <div className="code-block">
        <pre>{code}</pre>
      </div>
      <div className="result">Result: {result}</div>
    </div>
  );
};
