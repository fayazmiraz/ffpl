#!/usr/bin/env node

import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import autocompletePrompt from 'inquirer-autocomplete-prompt';
import os from 'os';
import { spawn } from 'child_process';
import getFirefoxProfiles from './modules/firefox-profiles.mjs';

inquirer.registerPrompt( 'autocomplete', autocompletePrompt );

const main = async () => {
  // Detect the operating system
  const platform = os.platform();

  // Get the profiles based on the detected operating system
  const profiles = getFirefoxProfiles(platform);

  // Extract profile names
  const profileNames = profiles.map((profile) => profile.Name);

  /* Implementation with search
  const searchProfiles = async (input, profiles) => {
    input = input || '';
    return profiles.filter((profile) => profile.name.toLowerCase().includes(input.toLowerCase()));
  };

  const { selectedProfile } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'selectedProfile',
      message: 'Select a Firefox profile to launch:',
      source: async (answersSoFar, input) => searchProfiles(input, profileChoices),
    },
  ]);
  // Implementation without search
  /*/  
  const { selectedProfile } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedProfile',
      message: 'Select a Firefox profile:',
      choices: profileNames,
      loop: false,
    },
  ]);
  //*/
  
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
