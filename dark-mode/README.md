# Dark Mode Support for Universal Login

## Overview

This is a simple implementation of dark mode support for Auth0 Universal Login. It detects and uses the user's dark mode browser/OS preference (if present) and adds a toggle button so the user can switch between light and dark modes. If the user opts to use the toggle, the last mode used will be saved as a preference in the browser’s local storage.

## Prerequisites

- You must have a [custom domain](https://auth0.com/docs/customize/custom-domains) configured on your tenant.
- This project requires the [Auth0 CLI](https://github.com/auth0/auth0-cli). Ensure
  that you have logged the CLI into your desired tenant.

```bash
auth0 login
```

## Setup

1. Open the Universal Login Branding Customization Editor

   ```bash
   auth0 ul customize -r standard
   ```

2. Copy the contents of `dark-mode-page-template.html` into the page template.

   ![Page template content](./images/page-template-content.png)

3. Click `Deploy Changes!`

Or, update the page template non-interactively.

```bash
cat dark-mode-page-template.html | auth0 ul templates update
```

## Screenshots

### Dark Mode

![Dark Mode](./images/dark-mode.png)

### Light Mode

![Light Mode](./images/light-mode.png)

## Caveats

- There may be a flicker during screen transitions where the page is changed from light to dark.
