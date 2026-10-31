# javit

A CLI tool that fetches metadata for JAV videos, **renames your local files** to match online titles, and **downloads high-quality images** to make your collection look polished. While this is especially useful for [Plex](https://www.plex.tv/), which requires local artwork to properly display in the _Other Videos_ library type, the output is compatible with any media manager that supports local metadata.

## Quick Start

Run with **npm (using npx)**:

```bash
npx javit /path/to/file-or-directory
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
javit /path/to/file-or-directory
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
node bin/cli.js /path/to/file-or-directory
```

## Configuration

You can configure the CLI with options when running through npm or from source.

| CLI           | Default | Description                                    |
| ------------- | ------- | ---------------------------------------------- |
| **`--force`** | `false` | Process videos even when images already exist. |

For example:

```bash
javit --force /path/to/file-or-directory
```

## Contributions

Pull requests are welcome! Please open an issue first to discuss major changes.
