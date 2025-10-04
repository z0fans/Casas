import { useState, useEffect } from "react";
import { ClashService } from "../services/clash";
import type { ClashStatus } from "../types/clash";

export function useClashDetect(autoRefresh = false, interval = 5000) {
  const [status, setStatus] = useState<ClashStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detect = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ClashService.detectPorts();
      setStatus(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "检测失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    detect();

    if (autoRefresh) {
      const timer = setInterval(detect, interval);
      return () => clearInterval(timer);
    }
  }, [autoRefresh, interval]);

  return { status, loading, error, refresh: detect };
}
