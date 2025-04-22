#!/bin/sh
auth0 ul customize -r advanced -p "login-id" -s "login-id" -f ./screen_configs/prod.json
auth0 ul customize -r advanced -p "login-password" -s "login-password" -f ./screen_configs/prod.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-passwordless-email-code" -f ./screen_configs/prod.json
auth0 ul customize -r advanced -p "login-passwordless" -s "login-passwordless-sms-otp" -f ./screen_configs/prod.json
