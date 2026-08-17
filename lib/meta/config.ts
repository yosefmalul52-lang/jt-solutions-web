export type MetaConfig = {
  verifyToken: string;
  appSecret: string;
  pageId: string;
  pageAccessToken: string;
};

export function getMetaConfig(): MetaConfig | null {
  const verifyToken = process.env.META_VERIFY_TOKEN?.trim();
  const appSecret = process.env.META_APP_SECRET?.trim();
  const pageId = process.env.META_PAGE_ID?.trim();
  const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN?.trim();

  if (!verifyToken || !appSecret || !pageId || !pageAccessToken) {
    return null;
  }

  return { verifyToken, appSecret, pageId, pageAccessToken };
}

export function isMetaWebhookConfigured(): boolean {
  return getMetaConfig() !== null;
}
