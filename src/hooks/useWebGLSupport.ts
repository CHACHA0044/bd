import { useEffect, useState } from 'react';

export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let context: WebGL2RenderingContext | null = null;
    try {
      const canvas = document.createElement('canvas');
      context = canvas.getContext('webgl2');
      setSupported(Boolean(context));
    } catch {
      setSupported(false);
    }
    return () => {
      context?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return supported;
}

export function prefersSaveData() {
  if (typeof navigator === 'undefined') return false;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
}
