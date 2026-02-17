/* eslint-disable @typescript-eslint/no-explicit-any */
import QRScanner from "../components/QRScanner";
import { api } from "../api/axios";
import { useState } from "react";
export default function Scanner() {
  const [id_num, setIdNum] = useState<string | null>(null);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const event_code = localStorage.getItem("event_code");

  const handleScan = async (scannedId: string) => {
    if (isLoading) return; // Prevent duplicate scans

    setIdNum(scannedId);
    setIsLoading(true);
    setMessage("");

    try {
      const response = await api.post("/students/scan", {
        id_num: scannedId,
        event_code: event_code,
      });
      setTotalHours(response.data.totalHours);
      setMessage("✓ Student logged successfully");
      console.log(response.data);
    } catch (error: any) {
      setMessage(
        `✗ Error: ${error.response?.data?.message || "Failed to log student"}`,
      );
      console.error("Error logging student:", error.response?.data?.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIdNum(null), 3000);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <QRScanner onScan={handleScan} />
      {isLoading && <p>Processing...</p>}
      {message && (
        <p style={{ color: message.startsWith("✓") ? "green" : "red" }}>
          {message}m
        </p>
      )}
      <p>Last scanned ID: {id_num || "None"}</p>
      <p>Total Hours: {totalHours}</p>
    </div>
  );
}
