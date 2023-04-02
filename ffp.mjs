#!/usr/bin/env node

// select_profile.mjs

import { profile } from './profiles.js';

const main = async () => {
    const { default: inquirer } = await import('inquirer');

    const profiles = profile();

    const { selectedProfile } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedProfile',
            message: 'Select a profile:',
            choices: profiles,
            loop: false,
        },
    ]);

    console.log(`Selected: ${selectedProfile}`);
};

main();
