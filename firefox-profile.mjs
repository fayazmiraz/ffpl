// firefox-profile.mjs

import path from 'path';
import fs from 'fs';
import ini from 'ini';
import _ from 'lodash';
import firefoxUserDirectory from './firefox-directory.mjs';

export default function (platform) {
  const userDirectory = firefoxUserDirectory(platform);
  const data = fs.readFileSync(path.join(userDirectory, 'profiles.ini'), { encoding: 'utf8' });
  return _.filter(ini.parse(data), function (value, key) {
    return _.isString(key) && key.match(/^Profile/);
  });
}
