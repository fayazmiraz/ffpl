import path from 'path';
import fs from 'fs';
import ini from 'ini';
import firefoxDataDirectory from './firefox-data-directory.mjs';

export default function (platform) {
  const dataDirectory = firefoxDataDirectory(platform);
  const data = fs.readFileSync(path.join(dataDirectory, 'profiles.ini'), { encoding: 'utf8' });
  const parsedData = ini.parse(data);

  return Object.entries(parsedData).filter(([key, value]) => {
    return typeof key === 'string' && key.match(/^Profile/);
  }).map(([key, value]) => value);
}
