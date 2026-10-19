import baseConfig from '@hono/eslint-config'
import drizzle from 'eslint-plugin-drizzle'

export default [
  {
    ignores: [
      '.wrangler/',
      'drizzle/',
      'worker-configuration.d.ts',
      'eslint.config.mjs',
    ],
  },
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { drizzle },
    rules: {
      'drizzle/enforce-delete-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
    },
  },
]
