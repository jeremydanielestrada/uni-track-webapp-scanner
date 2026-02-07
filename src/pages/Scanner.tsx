/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import QRScanner from "../components/QRScanner";
import { api } from "../api/axios";
import { useState, useEffect } from "react";

export default function Scanner() {
  const [id_num, setIdNum] = useState<string | null>(null);
  const event_code = localStorage.getItem("event_code");
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const logStudent = async () => {
        try {
          const response = await api.post("/students/scan", {
            id_num: id_num,
            event_code: event_code,
          });
          setTotalHours(response.data.totalHours);
          console.log(response.data);
        } catch (error: any) {
          console.error(
            "Error logging student:",
            error.response?.data?.message,
          );
        }
      };
      if (id_num) {
        logStudent();
        setIdNum(null);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <QRScanner onScan={(data: string) => setIdNum(data)} />
      <p>{id_num || "no data"}</p>
      <p>{totalHours}</p>
    </>
  );
}
