const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_content',
  'utm_term',
] as const;

export type BuildAttribution = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * Sign-up URL for the Build action.
 *
 * A visitor who arrived with a promotion source keeps that source: the page's
 * own UTM fields are forwarded as a complete set and missing fields stay empty.
 * Without a valid `utm_source`, the link carries this demo's default source.
 */
export function getBuildUrl(
  signupUrl: string,
  pageSearch: string,
  defaults: BuildAttribution,
): string {
  const page = new URLSearchParams(pageSearch);
  const forwarded = !!page.get('utm_source')?.trim();
  const url = new URL(signupUrl);
  for (const key of UTM_KEYS) {
    const value = (forwarded ? page.get(key) : defaults[key])?.trim();
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  return url.toString();
}
