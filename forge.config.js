/* eslint-disable @typescript-eslint/no-var-requires */

var path = require('path');
var fs = require('fs');

module.exports = {
  packagerConfig: {},
  electronRebuildConfig: {},
  makers: [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "erp_integration_client"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ]
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ],
  publishers: [],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        "mainConfig": "./webpack.main.config.js",
        "renderer": {
          "config": "./webpack.renderer.config.js",
          "entryPoints": [
            {
              "html": "./src/view-layer/index.html",
              "js": "./src/renderer.ts",
              "name": "main_window"
            }
          ]
        }
      }
    ]
  ],
  hooks: {
    postMake: async (forgeConfig, options) => {
      const appName = "erp-integration-client";
      const outputFolder = path.join('out', 'downloads');
      const extensionToOsMap = {
        'deb': 'linux',
        'rpm': 'linux',
        'dmg': 'macos',
        'zip': 'macos',
        'msi': 'windows',
        'exe': 'windows',
      }
      if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });
      for (const option of options) {
        const currentArch = option.arch;
        for (const artifact of option["artifacts"]) {
          for (const [extension, os] of Object.entries(extensionToOsMap)) {
            if (artifact.endsWith(`.${extension}`)) {
              const newArtifactName = `${appName}_${os}_${currentArch}.${extension}`;
              const newArtifactPath = path.join(outputFolder, newArtifactName);
              fs.rename(artifact, newArtifactPath, (err) => {
                console.error(`Error renaming artifact ${artifact} to ${newArtifactPath}: ${err}`);
              });
            }
          }
        }
      }
    }
  }
}
