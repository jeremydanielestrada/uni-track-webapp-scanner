import QRScanner from "../components/system/QRscanner";

import { useState } from "react";

export default function Scanner() {
  const [data, setData] = useState<string | null>(null);
  return (
    <>
      <QRScanner onScan={(data) => setData(data)} />
      <p>{data || "no data"}</p>
    </>
  );
}
