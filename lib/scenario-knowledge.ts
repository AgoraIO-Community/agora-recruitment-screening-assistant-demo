// Public reference only. Keep private records, live inventory and business actions out of this module.
export const SCENARIO_KNOWLEDGE = {
  "version": "2026-10-16",
  "jobId": "support-engineer-01",
  "title": "Support Engineer",
  "requirements": {
    "minimumYearsExperience": 2,
    "requiredSkills": [
      "customer support",
      "troubleshooting",
      "written English"
    ],
    "availability": "weekday business hours"
  },
  "interviewQuestions": [
    {
      "topic": "Incident ownership",
      "question": "Walk me through a difficult customer support incident you personally handled.",
      "followUps": [
        "What evidence helped you narrow down the cause?",
        "What did you personally change, and how did you verify recovery?"
      ]
    },
    {
      "topic": "API troubleshooting",
      "question": "A customer reports intermittent HTTP 500 errors after a release. How would you begin investigating?",
      "followUps": [
        "Which request details, timestamps, or logs would you collect first?",
        "How would you distinguish a client configuration problem from a server regression?"
      ]
    },
    {
      "topic": "Network diagnosis",
      "question": "An integration works on your network but times out on the customer's network. How would you isolate the problem?",
      "followUps": [
        "What would you check to separate DNS, TLS, proxy, and application failures?",
        "What comparison or test would support your leading hypothesis?"
      ]
    },
    {
      "topic": "Production incident response",
      "question": "Several customers report an outage while another has a minor configuration issue. How would you prioritize the work?",
      "followUps": [
        "What impact and severity information would you collect?",
        "When would you escalate, and what evidence would you include in the handoff?"
      ]
    },
    {
      "topic": "Customer communication",
      "question": "A frustrated customer asks for a recovery time you cannot confirm. What would you tell them?",
      "followUps": [
        "Give me the short customer update you would write in English.",
        "How would you set the next update time without promising a resolution?"
      ]
    },
    {
      "topic": "Resolution and prevention",
      "question": "A workaround restores service, but the root cause is still unknown. What would you do before closing the support case?",
      "followUps": [
        "How would you verify the workaround with the customer?",
        "What would you document or share with engineering to prevent a repeat?"
      ]
    }
  ],
  "source": {
    "kind": "Fictional job and interview reference",
    "revision": "2026-11-05",
    "scope": "Role requirements and interview guidance only; no candidate record or employment decision."
  },
  "timeZone": "America/New_York",
  "evidenceFramework": [
    "Situation and customer impact",
    "Candidate's personal responsibility",
    "Observations, logs or tests that distinguish hypotheses",
    "Action and why it was chosen",
    "Verification of recovery",
    "Prevention, documentation and communication"
  ],
  "recapStructure": [
    "Examples actually described by the candidate",
    "Evidence and personal actions reported",
    "Missing or unverified details to ask a human interviewer about"
  ],
  "unknownRoleFacts": [
    "Compensation",
    "Work location and remote-work terms",
    "Benefits",
    "Live vacancies",
    "Interview availability or hiring outcome"
  ]
} as const;
