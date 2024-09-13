# Claude Multi-Delete Extension

## Overview

The Claude Multi-Delete Extension is a Chrome browser extension designed to enhance the user experience when managing project artifacts in Claude, Anthropic's AI assistant interface. This extension adds batch selection and deletion capabilities to Claude's project knowledge section, allowing users to efficiently manage multiple items at once.

## Features

- **Batch Selection**: Add checkboxes to each project artifact for easy selection.
- **Bulk Selection**: Use shift-click to select multiple items at once.
- **Delete Selected**: Remove all selected items with a single button press.
- **Deselect All**: Quickly uncheck all selected items.
- **Dynamic UI**: The delete and deselect buttons only appear when items are selected.

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to Claude's interface (https://www.anthropic.com or related domains).
2. In the project knowledge section, you'll see checkboxes next to each artifact.
3. Select items individually or use shift-click for bulk selection.
4. Once items are selected, "Delete Selected" and "Deselect All" buttons will appear at the bottom of the list.
5. Click "Delete Selected" to remove all checked items, or "Deselect All" to clear your selection.

## Development

This extension is built using vanilla JavaScript and follows Chrome's Manifest V3 specifications. The main components are:

- `manifest.json`: Extension configuration file
- `content.js`: Core functionality for adding checkboxes and handling deletions
- `styles.css`: Styling for the added UI elements

To modify the extension:

1. Edit the relevant files.
2. Save your changes.
3. Go to `chrome://extensions/` in Chrome.
4. Find the Claude Multi-Delete extension and click the refresh icon.
5. Reload the Claude webpage to see your changes.

## Contributing

Contributions to improve the Claude Multi-Delete Extension are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Disclaimer

This extension is not officially affiliated with or endorsed by Anthropic. It is a community-created tool designed to enhance the Claude user experience. Use at your own discretion.

## License

[MIT License](LICENSE)

---

Remember to respect Anthropic's terms of service and use this extension responsibly.