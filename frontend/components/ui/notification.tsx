'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Notification = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(true);
  }, []);

  if (!showNotification) return null;

  return (
    <div className="top-14 left-0 right-0">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-1 w-full relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-yellow-700 hover:bg-yellow-200"
          onClick={() => setShowNotification(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <p className="font-bold">{title}</p>
        <p>{body}</p>
      </div>
    </div>
  );
};
