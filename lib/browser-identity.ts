export const BROWSER_IDENTITY_STORAGE_KEY = "onochu-browser-identity";
export const BROWSER_IDENTITY_STORAGE_VERSION = 1;

type StoredBrowserIdentity = {
  version: number;
  browserIdentityId: string;
  createdAt: string;
  updatedAt: string;
};

type BrowserIdentityState = {
  browserIdentityId: string;
  storageMessage: string;
};

function createBrowserIdentityId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `obi_${crypto.randomUUID()}`;
  }

  return `obi_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function persistBrowserIdentityRecord(record: StoredBrowserIdentity) {
  window.localStorage.setItem(
    BROWSER_IDENTITY_STORAGE_KEY,
    JSON.stringify(record satisfies StoredBrowserIdentity),
  );
}

function createBrowserIdentityRecord() {
  const now = new Date().toISOString();

  return {
    version: BROWSER_IDENTITY_STORAGE_VERSION,
    browserIdentityId: createBrowserIdentityId(),
    createdAt: now,
    updatedAt: now,
  } satisfies StoredBrowserIdentity;
}

export function ensureBrowserIdentity(): BrowserIdentityState {
  try {
    const storedValue = window.localStorage.getItem(BROWSER_IDENTITY_STORAGE_KEY);

    if (!storedValue) {
      const nextRecord = createBrowserIdentityRecord();
      persistBrowserIdentityRecord(nextRecord);

      return {
        browserIdentityId: nextRecord.browserIdentityId,
        storageMessage: "created anonymous browser identity",
      };
    }

    const parsedValue = JSON.parse(storedValue) as StoredBrowserIdentity | null;

    if (
      !parsedValue ||
      parsedValue.version !== BROWSER_IDENTITY_STORAGE_VERSION ||
      typeof parsedValue.browserIdentityId !== "string" ||
      parsedValue.browserIdentityId.trim().length === 0
    ) {
      const nextRecord = createBrowserIdentityRecord();
      persistBrowserIdentityRecord(nextRecord);

      return {
        browserIdentityId: nextRecord.browserIdentityId,
        storageMessage: "reset anonymous browser identity",
      };
    }

    const nextRecord = {
      ...parsedValue,
      updatedAt: new Date().toISOString(),
    } satisfies StoredBrowserIdentity;

    persistBrowserIdentityRecord(nextRecord);

    return {
      browserIdentityId: nextRecord.browserIdentityId,
      storageMessage: "hydrated anonymous browser identity",
    };
  } catch {
    const nextRecord = createBrowserIdentityRecord();
    persistBrowserIdentityRecord(nextRecord);

    return {
      browserIdentityId: nextRecord.browserIdentityId,
      storageMessage: "recovered anonymous browser identity after parse failure",
    };
  }
}
