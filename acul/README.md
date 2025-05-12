# Advanced Customization for Universal Login (ACUL)

## Overview

This demo is focused solely on email and SMS passwordless, so these are the only screens I've implemented:

- LoginId
- LoginPasswordlessEmailOtp
- LoginPasswordlessSmsOtp

## Prerequisites

This project requires the [Auth0 CLI](https://github.com/auth0/auth0-cli). Ensure
that you have logged the CLI in to your desired tenant.

```bash
auth0 login
```

## Setup

Install the dependencies.

```bash
npm install
```

If you're going to run your ACUL code locally, there are two tasks you need to start.

First, you need to start the build process. This not only builds the assets needed, but it also rebuilds them when you make changes.

```bash
npm run build
```

Second, you need to serve the built files locally.

```bash
npm run serve
```

This starts a local server on port 4000.

The last step is to set the rendering mode for the screens you wish to customize. I've created a helper shell
scripts to make this easier. It requires that you have the auth0 CLI installed and logged in to your tenant.

Change into the ul-config directory and run

```bash
enable-acul.sh
```

To enable advanced rendering for those screens. To reset UL to its default behavior, run

```bash
reset-ul.sh
```
