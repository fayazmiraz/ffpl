# FFPL (FireFox Profile Launcher)

A CLI tool to launch Firefox with a selected profile name.

## Installation

For now, clone this repository and from within the directory of the repository run the following command:

```sh
sudo npm i -g .
``` 

```sh
# Once ffpl is added to npm
sudo npm i -g ffpl
```

## Usage

Run the following command to launch Firefox with a selected profile:

```sh
ffpl
```

## TODO

- [ ] Add argument. e.g. `ffpl profile` should fuzzy search for "profile" - launch if 1 is found & provide options if none or multiple are found.
- [ ] Pinned profiles, configurable using a .conf file
- [ ] Make it cross platform
- [ ] Publish as an npm package named `ffpl`
