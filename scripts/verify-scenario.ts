import { getConversationContext } from '../lib/prompt-context';
import assert from 'node:assert/strict';
import { getScenarioConfig, getScenarioPrompt } from '../lib/agent-config';
import { getScenarioPresentation } from '../lib/presentation';
import { getBuildUrl } from '../lib/build-link';
import { SCENARIO_KNOWLEDGE } from '../lib/scenario-knowledge';
const config = getScenarioConfig();
assert.equal(config.id, "08-recruitment-screening");
assert.equal(getScenarioPresentation().id, config.id);
for (const key of ['role', 'workflow', 'guardrails', 'greeting'] as const) assert.ok(config[key]);
assert.match(getScenarioPrompt(), /# Goal and conversation flow/);
assert.match(getScenarioPrompt(), /# First-version boundary/);
assert.match(getScenarioPrompt(), /No business data lookup/);
assert.doesNotMatch(getScenarioPrompt(), /AG-100[123]|patient-alex|AST-R3001|travelerKey|participantId/);
// The entry sample is static copy; its Agent questions must come from the question bank.
const { lead, expectations, developer, sample } = getScenarioPresentation();
assert.ok(lead && expectations.length > 0 && developer.buildLabel);
const bank: string[] = SCENARIO_KNOWLEDGE.interviewQuestions.flatMap((item) => [item.question, ...item.followUps]);
for (const line of sample.filter((item) => item.role === 'agent' && item.text.endsWith('?') || item.feature === 'Role-specific questions'))
  assert.ok(bank.includes(line.text), 'Sample question is not in the question bank: ' + line.text);
// Build link: forward a visitor's own promotion source as a complete set; otherwise use the demo default.
const signup = developer.signupUrl;
assert.equal(new URL(signup).origin, 'https://sso2.agora.io');
const defaultUrl = new URL(getBuildUrl(signup, '', developer.buildAttribution));
assert.equal(defaultUrl.searchParams.get('utm_source'), developer.buildAttribution.utm_source);
assert.equal(defaultUrl.searchParams.get('utm_content'), developer.buildAttribution.utm_content);
const forwardedUrl = new URL(getBuildUrl(signup, '?utm_source=x&utm_campaign=recipes_top10&topic=a', developer.buildAttribution));
assert.equal(forwardedUrl.searchParams.get('utm_source'), 'x');
assert.equal(forwardedUrl.searchParams.get('utm_campaign'), 'recipes_top10');
assert.equal(forwardedUrl.searchParams.get('utm_medium'), null, 'Do not fill missing fields from defaults.');
assert.equal(forwardedUrl.searchParams.get('utm_content'), null);
assert.equal(forwardedUrl.searchParams.get('topic'), null, 'Forward UTM fields only.');
assert.equal(new URL(getBuildUrl(signup, '?utm_medium=email', developer.buildAttribution)).searchParams.get('utm_medium'), 'referral', 'UTM without a source is not a source.');
console.log('Scenario conversation contract passed: ' + config.id);

// Calendar regressions: U.S. dates can differ from UTC and offsets change with DST.
const localNight = getConversationContext('America/New_York', new Date('2026-11-05T02:30:00Z'));
assert.match(localNight, /Current local date: 2026-11-04/);
assert.match(localNight, /UTC-05:00/);
assert.match(getConversationContext('America/New_York', new Date('2026-03-08T06:30:00Z')), /UTC-05:00/);
assert.match(getConversationContext('America/New_York', new Date('2026-03-08T07:30:00Z')), /UTC-04:00/);
assert.match(getConversationContext('America/Chicago', new Date('2026-07-01T03:30:00Z')), /Current local date: 2026-06-30/);
assert.match(getConversationContext('America/New_York', new Date('2026-12-31T17:00:00Z')), /2027-01-01 Friday/);
assert.match(getConversationContext('America/New_York', new Date('2028-02-28T17:00:00Z')), /2028-02-29 Tuesday; 2028-03-01 Wednesday/);
console.log('Prompt local-date, DST and calendar regressions passed.');
