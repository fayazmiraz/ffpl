import os from 'os';

export function getFirefoxCommand() {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      return '/Applications/Firefox.app/Contents/MacOS/firefox-bin';
    case 'linux':
      return 'firefox';
    case 'win32':
      return 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
    default:
      throw new Error('Unsupported platform');
  }
}
