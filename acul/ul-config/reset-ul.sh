#!/bin/sh
auth0 ul switch -r standard -p "login-id" -s "login-id"
auth0 ul switch -r standard -p "login-password" -s "login-password"
auth0 ul switch -r standard -p "login-passwordless" -s "login-passwordless-email-code"
auth0 ul switch -r standard -p "login-passwordless" -s "login-passwordless-sms-otp"
