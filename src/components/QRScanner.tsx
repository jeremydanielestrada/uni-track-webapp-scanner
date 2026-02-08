import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

type QRScannerProps = {
  onScan: (data: string) => void;
};

export default function QRScanner({ onScan }: QRScannerProps) {
  const qrRef = useRef<Html5Qrcode | null>(null);
  const isRunning = useRef(false);
  const isInitialized = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Initializing...");

  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initScanner = async () => {
      try {
        setStatus("Requesting camera access...");
        const qr = new Html5Qrcode("qr-reader");
        qrRef.current = qr;

        await qr.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText: string) => {
            console.log("QR Code detected:", decodedText);
            setStatus("QR Code scanned!");
            onScan(decodedText);
          },
          (errorMessage: string) => {
            // Log scanning errors for debugging
            console.log("Scan error:", errorMessage);
          },
        );
        isRunning.current = true;
        setStatus("Scanning... Point camera at QR code");
      } catch (err) {
        console.error("Camera initialization error:", err);
        setError(`Failed to access camera: ${err}`);
        setStatus("Error - see details below");
        isInitialized.current = false;
      }
    };

    initScanner();

    return () => {
      if (qrRef.current && isRunning.current) {
        qrRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            isRunning.current = false;
            isInitialized.current = false;
          });
      }
    };
  }, [onScan]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        id="qr-reader"
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      />
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <p>
          <strong>Status:</strong> {status}
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
