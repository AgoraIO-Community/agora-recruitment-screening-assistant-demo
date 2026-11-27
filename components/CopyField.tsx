'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

/** Code with one copy action, following the Basic CopyField pattern. */
export function CopyField({
  value,
  label,
  wrap = false,
}: {
  value: string;
  /** Accessible name of the copy action, for example "Copy create commands". */
  label: string;
  /** Wrap long prose such as a prompt. Commands keep their line breaks. */
  wrap?: boolean;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus('idle'), 2200);
    return () => window.clearTimeout(timer);
  }, [status]);
  return (
    <div className="demo-copy-wrap">
      <div
        className="demo-copy"
        data-copied={status === 'copied'}
        data-wrap={wrap}
      >
        <code tabIndex={0}>{value}</code>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={status === 'copied' ? 'Copied' : label}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              setStatus('copied');
            } catch {
              setStatus('error');
            }
          }}
        >
          {status === 'copied' ? <Check /> : <Copy />}
        </Button>
      </div>
      <span className="demo-copy-feedback" role="status">
        {status === 'copied'
          ? 'Copied to clipboard'
          : status === 'error'
            ? 'Copy unavailable. Select and copy the code.'
            : ''}
      </span>
    </div>
  );
}
