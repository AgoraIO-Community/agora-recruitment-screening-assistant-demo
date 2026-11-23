'use client';

import { Loader2, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { BuildLink } from './BuildLink';
import { Alert, AlertDescription } from './ui/alert';
import type { ScenarioPresentation } from '@/lib/presentation';

export function QuickstartPreCallCard({
  scenario,
  isLoading,
  disabled = false,
  error,
  onStart,
  onRun,
}: {
  scenario: ScenarioPresentation;
  isLoading: boolean;
  disabled?: boolean;
  error: string | null;
  onStart: () => void;
  onRun: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <section className="demo-welcome">
      <h2>{scenario.name}</h2>
      <p className="demo-lead">{scenario.lead}</p>
      <div className="demo-welcome-actions">
        <Button
          size="lg"
          disabled={isLoading || disabled}
          aria-busy={isLoading}
          aria-describedby="demo-expectations"
          onClick={onStart}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" data-icon="inline-start" />
          ) : (
            <Mic data-icon="inline-start" />
          )}
          {isLoading ? 'Connecting…' : scenario.startLabel}
        </Button>
        <BuildLink scenario={scenario} size="lg" />
        <button type="button" className="demo-run-link" onClick={onRun}>
          {scenario.developer.runLabel}
        </button>
      </div>
      <ul id="demo-expectations" className="demo-expectations">
        {scenario.expectations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </section>
  );
}
