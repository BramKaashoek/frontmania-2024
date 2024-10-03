'use client';

import { useEffect, useState } from 'react';

export const ClsElement = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return <div style={loaded ? { width: 100, height: 200 } : undefined} />;
};
