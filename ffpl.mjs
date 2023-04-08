#!/usr/bin/env node

import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import autocompletePrompt from 'inquirer-autocomplete-prompt';
import os from 'os';
import { spawn } from 'child_process';
import getFirefoxProfiles from './modules/firefox-profiles.mjs';
import { getFirefoxCommand } from './modules/firefox-command.mjs';

inquirer.registerPrompt( 'autocomplete', autocompletePrompt );

const main = async () => {
  // Detect the operating system
  const platform = os.platform();

  // Get the profiles based on the detected operating system
  const profiles = getFirefoxProfiles(platform);

  // Extract profile names
  const profileNames = profiles.map((profile) => profile.Name).sort();

  // Let the profiles be fuzzy searched
  const searchProfiles = async (input, profileNames) => {
    input = input || '';
    return fuzzy.filter(input, profileNames).map(el => el.string);
  };

  // get the profile from user input
  const { selectedProfile } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'selectedProfile',
      message: 'Select a Firefox Profile to Launch:',
      source: async (answersSoFar, input) => searchProfiles(input, profileNames),
      loop: false
    },
  ]);

  const command = getFirefoxCommand();
  const args = ['-P', selectedProfile];
  const options = {
    detached: true,
    stdio: 'ignore',
  };

  const child = spawn(command, args, options);
  child.unref();
};

main();
