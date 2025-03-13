import { useState, useEffect, CSSProperties } from "react";

export type AlertCode = "200" | "400"; // Extend as needed

export default function Alerts({
  msg,
  code,
  random,
}: {
  msg: string;
  code: AlertCode;
  random: number;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg, code, random]);

  if (!visible) return null;

  const alertStyle: CSSProperties = {
    width: "300px",
    position: "absolute",
    right: "20px",
    top: "100px",
    padding: "16px",
    borderRadius: "8px",
    zIndex: 1000,
  };

  const successStyle: CSSProperties = {
    ...alertStyle,
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  };

  const errorStyle: CSSProperties = {
    ...alertStyle,
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  };

  const alertTypes: Record<AlertCode, { style: CSSProperties; label: string }> =
    {
      "200": { style: successStyle, label: "Success" },
      "400": { style: errorStyle, label: "Error" },
    };

  const currentAlert = alertTypes[code] || {
    style: errorStyle,
    label: "Unknown",
  };

  return (
    <div style={currentAlert.style}>
      <strong>{currentAlert.label}:</strong> <b>{msg}</b>
    </div>
  );
}
