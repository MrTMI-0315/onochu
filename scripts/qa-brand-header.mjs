import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(cwd, relativePath), "utf8");
}

function ensureIncludes(filePath, expectedText) {
  const content = read(filePath);
  if (!content.includes(expectedText)) {
    throw new Error(`${filePath} must include: ${expectedText}`);
  }
}

function run() {
  const brandAppliedFiles = [
    "components/landing-mobile-variant.tsx",
    "components/recommendation-studio.tsx",
    "components/profile-edit-form.tsx",
    "components/member-directory-client.tsx",
    "components/archive-profile-view.tsx",
  ];

  for (const filePath of brandAppliedFiles) {
    ensureIncludes(filePath, "BrandMarkLink");
    ensureIncludes(filePath, "<BrandMarkLink");
  }

  ensureIncludes("components/brand-mark-link.tsx", 'href="/"');
  ensureIncludes("components/brand-mark-link.tsx", 'aria-label="Onochu home"');
  ensureIncludes("components/brand-mark-link.tsx", "text-[#F7F3E9]");
  ensureIncludes("components/site-navigation.tsx", "text-[var(--paper)]");
  ensureIncludes("docs/qa-v0.3.md", "Global Header Interaction");

  console.log("qa:brand-header PASS");
}

try {
  run();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`qa:brand-header FAIL\n${message}`);
  process.exit(1);
}
