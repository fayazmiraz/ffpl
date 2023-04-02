#!/usr/bin/env node

// select_profile.mjs

import inquirer from 'inquirer';
import os from 'os';
import getFirefoxProfiles from './firefox-profile.mjs';

const main = async () => {
  // Detect the operating system
  const platform = os.platform();

  // Get the profiles based on the detected operating system
  const profiles = getFirefoxProfiles(platform);

  // Extract profile names
  const profileNames = profiles.map((profile) => profile.Name);

  const { selectedProfile } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedProfile',
      message: 'Select a Firefox profile:',
      choices: profileNames,
      loop: false,
    },
  ]);

  console.log(`Selected: ${selectedProfile}`);
};

main();
