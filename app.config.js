export default {
  expo: {
    name: "bg-location",
    slug: "bg-location",
    platforms: [
      "ios",
      "android",
      "web"
    ],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
        bundleIdentifier: "com.natanaelvich.bglocation",
        buildNumber: "1.0.0",
        supportsTablet: true
      },
      android: {
        package: "com.natanaelvich.bglocation",
        versionCode: 1,
        "enableDangerousExperimentalLeanBuilds" : true
      },
    hooks: {
        postPublish: [
          {
            file: "sentry-expo/upload-sourcemaps",
            config: {
              organization: "natanaelvich",
              project: "location-background",
              authToken: process.env.RN_AUTHTOKEN_SENTRY
            }
          }
        ]
      }
  }
}
