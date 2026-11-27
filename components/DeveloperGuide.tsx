'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CopyField } from './CopyField';
import type { ScenarioPresentation } from '@/lib/presentation';

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Commands and the AI assistant prompt for running this scenario locally. */
export function DeveloperGuide({
  scenario,
  open,
  onOpenChange,
  onCloseAutoFocus,
}: {
  scenario: ScenarioPresentation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus: (event: Event) => void;
}) {
  const d = scenario.developer;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="demo-run-dialog" onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>{d.runLabel}</DialogTitle>
          <DialogDescription>
            Requires Node.js 24, pnpm 9.15.9 and an Agora project with
            Conversational AI.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="manual">
          <TabsList variant="line" aria-label="Ways to run this scenario">
            <TabsTrigger value="manual">Use the CLI</TabsTrigger>
            <TabsTrigger value="assistant">Use an AI assistant</TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="demo-run-content">
            <dl className="demo-run-steps">
              <div>
                <dt>Create</dt>
                <dd>
                  <CopyField value={d.createCommand} label="Copy create commands" />
                </dd>
              </div>
              <div>
                <dt>Configure</dt>
                <dd>
                  <CopyField
                    value="cp env.local.example .env.local"
                    label="Copy configuration command"
                  />
                  <p>
                    Set the App ID and Primary certificate from{' '}
                    <ExternalLink href={d.consoleUrl}>Agora Console</ExternalLink>.
                  </p>
                  {d.configurationNote && <p>{d.configurationNote}</p>}
                </dd>
              </div>
              <div>
                <dt>Run</dt>
                <dd>
                  <CopyField value={d.runCommand} label="Copy startup commands" />
                </dd>
              </div>
              <div>
                <dt>Customize</dt>
                <dd>
                  <ul className="demo-run-files">
                    {d.extensionPoints.map((point) => (
                      <li key={point.path}>
                        <code>{point.path}</code>
                        <span>{point.title}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </TabsContent>
          <TabsContent value="assistant" className="demo-run-content">
            <p>
              Paste this prompt into your AI coding assistant. It uses{' '}
              <ExternalLink href={d.cliUrl}>Agora CLI</ExternalLink>.
            </p>
            <CopyField value={d.assistantPrompt} label="Copy setup prompt" wrap />
          </TabsContent>
        </Tabs>
        <nav className="demo-run-links" aria-label="Agora developer resources">
          <ExternalLink href={d.sourceUrl}>Source</ExternalLink>
          <ExternalLink href={d.docsUrl}>Build guide</ExternalLink>
          <ExternalLink href={d.sdkUrl}>Agents SDK</ExternalLink>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
