const hasAppleSigningIdentity = Boolean(process.env.APPLE_SIGN_IDENTITY);
const hasAppleNotarizationConfig = Boolean(
  process.env.APPLE_ID && process.env.APPLE_APP_SPECIFIC_PASSWORD && process.env.APPLE_TEAM_ID
);

module.exports = {
  packagerConfig: {
    asar: true,
    executableName: "LingoLearn",
    appBundleId: "com.riyan.lingolearn",
    appCategoryType: "public.app-category.education",
    extraResource: ["app-config.json"],
    ignore: [/^\/dist($|\/)/, /^\/out($|\/)/, /^\/\.env$/],
    osxSign: hasAppleSigningIdentity
      ? {
          identity: process.env.APPLE_SIGN_IDENTITY,
          hardenedRuntime: true,
          entitlements: "build/entitlements.plist",
          "entitlements-inherit": "build/entitlements.plist",
        }
      : undefined,
    osxNotarize: hasAppleNotarizationConfig
      ? {
          appleId: process.env.APPLE_ID,
          appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
          teamId: process.env.APPLE_TEAM_ID,
        }
      : undefined,
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "win32"],
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "lingolearn",
        setupExe: "LingoLearnSetup.exe",
        authors: "Riyan Popat",
        exe: "LingoLearn.exe",
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
