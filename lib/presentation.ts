import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "08-recruitment-screening",
  "name": "Recruitment Screening Assistant",
  "purpose": "Support Engineer interview practice",
  "summary": "Practice a structured screening conversation with follow-up questions and a verbal recap.",
  "featuresHeading": "In this conversation",
  "features": [
    {
      "emoji": "💬",
      "title": "Structured interview questions"
    },
    {
      "emoji": "🎙️",
      "title": "Relevant follow-ups"
    },
    {
      "emoji": "📝",
      "title": "Verbal evidence recap"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Start screening interview",
  "boundaryShort": "Conversation only. No candidate records, submitted results, hiring scores or decisions.",
  "outcomes": [
    {
      "id": "helpful",
      "label": "The conversation helped"
    },
    {
      "id": "needs-guidance",
      "label": "I need more guidance"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/AgoraIO-Community/agora-recruitment-screening-assistant-demo",
    "runCommand": "pnpm install --frozen-lockfile\npnpm run doctor\npnpm run dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Work in this existing Recruitment Screening Assistant voice demo. Preserve Agora RTC/RTM lifecycle and the conversation-only first-version boundary. Adapt the assistant instructions and static public background without adding business tools, records, data APIs or persistence.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change the conversation",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Choose models and voice",
        "path": "lib/runtime-profile.ts"
      },
      {
        "title": "Adapt scenario UI copy",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
