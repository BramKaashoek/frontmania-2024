import { Apple, Banana, Cherry, Citrus, Grape } from 'lucide-react';

export const Icon = ({
  name,
  className,
}: {
  name: string;
  className: string;
}) => {
  switch (name) {
    case 'Apple':
      return <Apple className={className} />;
    case 'Banana':
      return <Banana className={className} />;
    case 'Cherry':
      return <Cherry className={className} />;
    case 'Grape':
      return <Grape className={className} />;
    case 'Lemon':
      return <Citrus className={className} />;
    case 'Orange':
      return <Citrus className={className} />;
    default:
      return <Citrus className={className} />;
  }
};
