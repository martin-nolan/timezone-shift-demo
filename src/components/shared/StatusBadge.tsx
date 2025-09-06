import React from "react";

interface StatusBadgeProps {
  type: "dst" | "business" | "success" | "warning" | "error" | "inactive";
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  children,
  className = "",
}) => {
  const getBadgeClass = () => {
    switch (type) {
      case "dst":
        return "badge-dst-active";
      case "business":
        return "badge-success";
      case "success":
        return "badge-success";
      case "warning":
        return "badge-warning";
      case "error":
        return "badge-error";
      case "inactive":
        return "badge-inactive";
      default:
        return "badge-inactive";
    }
  };

  return (
    <span className={`badge ${getBadgeClass()} ${className}`}>{children}</span>
  );
};
