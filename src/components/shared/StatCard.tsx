import React from "react";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  isActive?: boolean;
  variant?: "success" | "warning" | "error" | "info";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  isActive = false,
  variant = "info",
  className = "",
}) => {
  const getVariantClass = () => {
    if (!isActive) return "bg-tertiary";

    switch (variant) {
      case "success":
        return "border-tertiary bg-success";
      case "warning":
        return "border-tertiary bg-warning";
      case "error":
        return "border-tertiary bg-error";
      case "info":
        return "border-tertiary bg-info";
      default:
        return "bg-tertiary";
    }
  };

  return (
    <div
      className={`flex items-center gap-md p-lg rounded border transition ${getVariantClass()} ${className}`}
    >
      <div className="text-3xl opacity-80">{icon}</div>
      <div className="flex-1 text-left">
        <div className="text-sm text-secondary mb-xs">{label}</div>
        <div className="text-xl font-semibold font-mono">{value}</div>
      </div>
    </div>
  );
};
