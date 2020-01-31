// @flow
export const config = {
  frontendUrl: process.env['E2E_FRONTEND_URL'] || 'http://127.0.0.1:3000',
  backendUrl: process.env['E2E_BACKEND_URL'] || 'http://127.0.0.1:4000',
  interconnectToken: process.env['E2E_INTERCONNECT_TOKEN'] || '',
  hub: process.env['E2E_HUB'] || 'local',
  defaultCapabilitiesId: process.env['E2E_DEFAULT_CAPABILITIES_ID'] || 'chrome',
  webdriverTimeout: parseInt(process.env['E2E_WEBDRIVER_TIMEOUT']) || 20000,
  testTimeout: parseInt(process.env['E2E_TEST_TIMEOUT']) || 60000,
  localShowWindow: Boolean(process.env['E2E_LOCAL_SHOW_WINDOW']) || false,
  pauseOnFail: Boolean(process.env['E2E_PAUSE_ON_FAIL'] || process.env['E2E_LOCAL_SHOW_WINDOW']) || false,
  crossBrowserTestingUsername: process.env['E2E_CBT_USERNAME'],
  crossBrowserTestingAuthKey: process.env['E2E_CBT_AUTH_KEY'],
};
