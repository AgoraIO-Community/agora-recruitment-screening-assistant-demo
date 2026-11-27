import type { ScenarioPresentation } from '@/lib/presentation';

/** Static sample exchange. Each tagged Agent line shows one key feature. */
export function ScenarioSample({
  scenario,
}: {
  scenario: ScenarioPresentation;
}) {
  return (
    <figure className="demo-sample">
      <figcaption>Sample conversation</figcaption>
      <ol>
        {scenario.sample.map((line) => (
          <li key={line.text} data-role={line.role}>
            {line.feature ? (
              <span className="demo-sample-tag">{line.feature}</span>
            ) : null}
            <p>
              <span className="sr-only">
                {line.role === 'agent' ? 'Assistant: ' : 'You: '}
              </span>
              {line.text}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
