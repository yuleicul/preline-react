/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  singleQuote: true,
  semi: false,
  // https://github.com/IanVS/prettier-plugin-sort-imports
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^@/assets/(.*)$',
    '^@/components/(.*)$',
    '^@/features/(.*)$',
    '^@/routes/(.*)$',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
}
