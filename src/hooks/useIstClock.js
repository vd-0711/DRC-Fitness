import { useState, useEffect } from 'react';

export function useIstClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: false };
      setTime(d.toLocaleTimeString("en-IN", opts) + " IST");
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  return time;
}
