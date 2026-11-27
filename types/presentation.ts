export interface ScenarioPresentation {
  id: string;
  name: string;
  purpose: string;
  summary: string;
  /** One hero sentence: what the visitor does. */
  lead: string;
  /** What a visitor needs before starting, a few words each. */
  expectations: string[];
  /** Static sample exchange for the entry page. A tagged Agent line names one key feature. */
  sample: { role: 'agent' | 'user'; text: string; feature?: string }[];
  startLabel: string;
  boundaryShort: string;
  outcomes: { id: string; label: string }[];
  developer: {
    buildLabel: string;
    /** Label of the underlined action that opens the local setup dialog. */
    runLabel: string;
    /** Agora sign-up page opened by the Build action. */
    signupUrl: string;
    /** Default source for the Build link when the visitor arrived without UTM. */
    buildAttribution: import('@/lib/build-link').BuildAttribution;
    sourceUrl: string;
    runCommand: string;
    assistantPrompt: string;
    createCommand: string;
    testRequest: string;
    configurationNote?: string;
    docsUrl: string;
    sdkUrl: string;
    consoleUrl: string;
    cliUrl: string;
    extensionPoints: { title: string; path: string }[];
  };
}
