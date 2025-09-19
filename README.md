# javit

A CLI tool that fetches metadata for JAV videos, **renames your local files** to match online titles, and **downloads high-quality images** to make your collection look polished and professional. While this is especially useful for [Plex](https://www.plex.tv/), which requires local artwork for proper display in "Other Videos" library types, the output is compatible with any media manager that supports local metadata.

## Quick Start

Run with **npm (using npx)**:

```bash
npx javit parse /path/to/file-or-directory
```

## Installation

The _Quick Start_ command is for one-off runs to quickly try the tool, while the options below are intended for regular use. You can install the CLI globally with **npm**, or clone **from source** if you want full control or plan to contribute.

### npm

Install globally with **npm**:

```bash
npm install -g javit
```

Then run:

```bash
javit parse /path/to/file-or-directory
```

### From Source

Install from source with **git** and **npm**:

```bash
git clone https://github.com/XRadius/javit
cd javit
npm install
```

Then run with **node**:

```bash
node bin/cli.js parse /path/to/file-or-directory
```

## Examples

```
Usage: javit [options] [command]

Options:
  -h, --help                  display help for command

Commands:
  parse [options] <paths...>  Parses metadata
  search <name>               Search metadata
  help [command]              display help for command
```

### Parse

Fetches metadata, **renames your local files** and **downloads high-quality images**:

```bash
javit parse /path/to/file-or-directory
```

### Search

Searches metadata and outputs metadata in `JSON`:

```bash
javit search MIRD-163
```

## Contributions

Pull requests are welcome! Please open an issue first to discuss major changes.
