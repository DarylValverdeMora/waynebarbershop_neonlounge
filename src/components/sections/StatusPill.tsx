import { describeStatus, openStatus } from '../../lib/hours';
import { useNow } from '../../hooks/useNow';
import { cn } from '../ui/cn';

export const StatusPill = ({ className }: { className?: string }) => {
  const status = openStatus(useNow());
  const isOpen = status.kind === 'open';
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface/60 px-4 py-2 text-sm font-semibold backdrop-blur',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2.5 rounded-full',
          isOpen ? 'bg-highlight shadow-[0_0_10px_var(--wb-highlight)] motion-safe:animate-pulse' : 'bg-muted',
        )}
      />
      {describeStatus(status)}
    </p>
  );
};
