#!/usr/bin/env node

// select_profile.mjs

import inquirer from 'inquirer';
import os from 'os';
import { spawn } from 'child_process';
import getFirefoxProfiles from './firefox-profiles.mjs';

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

  /*
  const command = `/Applications/Firefox.app/Contents/MacOS/firefox-bin -P "${selectedProfile}" > /dev/null 2>&1`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error in command output: ${stderr}`);
      return;
    }

    console.log( `Firefox profile [${selectedProfile}] launched successfully.` );
  });
  */

  const command = '/Applications/Firefox.app/Contents/MacOS/firefox-bin';
  const args = ['-P', selectedProfile];
  const options = {
    detached: true,
    stdio: 'ignore',
  };

  const child = spawn(command, args, options);
  child.unref();

  console.log( `Firefox profile [${selectedProfile}] launched successfully.` );
};

main();
