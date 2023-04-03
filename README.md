# javit

Matches _JAV_ videos and normalizes metadata. Extracts _JAV_-identifiers from file names, looks up associated metadata on a popular _JAV_-metadata website, then renames your file(s) and downloads a _poster_ and _fanart_ preview image. Compatible with _Plex Media Server_.

# Prerequisites

- NodeJS >= 18 (http://nodejs.org/)
- NPM >= 8 (https://www.npmjs.org/)

# Install

1. Install _nodejs_ following the instructions at http://nodejs.org/
2. Run in _Terminal_: `npm install -g javit`

# Usage

```
Usage: javit [options] [command]

Matches JAV videos and normalizes metadata.

Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  parse [options] <path...>  Parse metadata
  search <name>              Search metadata
  help [command]             display help for command
```

## Search

Searches metadata and outputs metadata in `JSON` format.

### Examples

A) Search for `MIRD-163`:

    javit search MIRD-163

B) Search for `SW-600`:

    javit search SW-600

## Parse

Parse renames your file(s) and downloads preview images.

### Examples

A) Rename a `mkv` video and download metadata:

    javit parse /path/to/your/SW-600.HD.mkv

B) Recursively scans for video files, then renames and downloads metadata:

    javit parse /path/to/your/library/directory

# Contributions

While software contributions are welcome, you can also help with:

- Documentation
- Helping other people
- Feature requests
- Bug reports

# Questions?

Please make an issue if you have questions, wish to request a feature, etc.
