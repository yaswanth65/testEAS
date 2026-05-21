const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

try {
  const nativewindMetro = require(path.join(
    __dirname,
    "node_modules",
    "nativewind",
    "dist",
    "metro",
    "index.js"
  ));
  module.exports = nativewindMetro.withNativeWind(config, {
    input: "./global.css",
  });
} catch (e) {
  module.exports = config;
}
