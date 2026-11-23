'use client';

import { useSyncExternalStore } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { getBuildUrl } from '@/lib/build-link';
import type { ScenarioPresentation } from '@/lib/presentation';

const subscribe = () => () => {};

/** Build action: opens Agora sign-up in a new tab and carries the promotion source. */
export function BuildLink({
  scenario,
  size,
  className,
}: {
  scenario: ScenarioPresentation;
  size: 'sm' | 'lg';
  className?: string;
}) {
  const d = scenario.developer;
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => '',
  );
  return (
    <Button variant="outline" size={size} className={className} asChild>
      <a
        href={getBuildUrl(d.signupUrl, search, d.buildAttribution)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {d.buildLabel}
        <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
        <span className="sr-only"> (opens Agora sign-up in a new tab)</span>
      </a>
    </Button>
  );
}
