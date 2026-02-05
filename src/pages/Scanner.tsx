import QRScanner from "../components/QRScanner";

import { useState } from "react";

export default function Scanner() {
  const [data, setData] = useState<string | null>(null);
  return (
    <>
      <QRScanner onScan={(data: string) => setData(data)} />
      <p>{data || "no data"}</p>
    </>
  );
}
