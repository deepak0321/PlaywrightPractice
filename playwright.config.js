import { chromium, defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout : 30 * 1000,
  expect : {
    timeout : 4000
  },
  reporter : 'html',
  use: {
   browserName : 'chromium',
   headless : false,
   slowMo : 500,
  },
});

module.exports = config

