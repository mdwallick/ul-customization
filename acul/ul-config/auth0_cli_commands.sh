# Connect Auth0 CLI to your tenant
auth0 login

# Open the Universal Login Customize Utility
# This is useful for customizing the Page Template, Partials, Themes, Texts, etc.
auth0 ul customize -r standard

# Manage the ACUL Rendering Mode
# {PROMPT} - the prompt name e.g. `login-passwordless`
# {SCREEN} - the specific screen e.g. `login-passwordless-email-code`
# {CONFIG_FILE} - the path to the configuration file for this screen e.g. ./screen_configs/login-passwordless-email-code.json

# Use ACUL as the rendering mode
auth0 ul customize -r advanced -p {PROMPT} -s {SCREEN} -f {CONFIG_FILE}

# screens that have been implemented
auth0 ul customize -r advanced -p "login-id" -s "login-id" -f ./screen_configs/login-id.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-passwordless-email-code" -f ./screen_configs/login-passwordless-email-code.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-passwordless-sms-otp" -f ./screen_configs/login-passwordless-sms-otp.json

# Use the default Universal Login UI
# auth0 ul customize -r standard -p {PROMPT} -s {SCREEN} -f ./screen_configs/reset-to-standard.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-id" -f ./screen_configs/reset-to-standard.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-passwordless-email-code" -f ./screen_configs/reset-to-standard.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-passwordless-sms-otp" -f ./screen_configs/reset-to-standard.json
