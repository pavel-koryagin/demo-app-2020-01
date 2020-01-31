require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: true,
      },
    }],
    ['react-app', {
      absoluteRuntime: false,
      useESModules: false, // Node.js does not support them
    }],
  ],
});

module.exports = {
  default: ` --format-options '{"snippetInterface": "synchronous"}'`
}
