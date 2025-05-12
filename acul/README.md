# Setup

Clone this repo, cd into it and install the dependencies.

`$ gh repo clone mdwallick/ul-customization && cd ul-customization && npm install`

If you're going to run your ACUL code locally, there are two tasks you need to start.

First, you need to start the build process. This not only builds the assets needed, but it also rebuilds them when you make changes.

Go into the acul directory

`cd acul`

and then run

`npm run build`

Second, you need to serve the built files locally. Also in the acul directory, run

`npm run serve`

to start a local server on port 4000.

The last step is to set the rendering mode for the screens you wish to customize. I've created a helper shell
scripts to make this easier. It requires that you have the auth0 CLI installed and logged in to your tenant.

This demo is focused solely on email and SMS passwordless, so these are the only screens I've implemented:

* LoginId
* LoginPasswordlessEmailOtp
* LoginPasswordlessSmsOtp

Change into the ul-config directory and run

`enable-acul.sh`

To enable advanced rendering for those screens. To reset UL to its default behavior, run

`reset-ul.sh`
