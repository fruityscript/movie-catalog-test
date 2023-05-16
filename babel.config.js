const babel = require("@babel/core");

babel.transformSync("code", {
  presets: ["@babel/preset-typescript"],
  filename: 'script.ts',
});
