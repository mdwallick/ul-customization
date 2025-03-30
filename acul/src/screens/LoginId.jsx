import { useState } from "react";
import { cn, getFieldErrors } from "@/lib/utils";
import { LoginId as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components
import { FieldError } from "@/components/ui/field-error";
import { ScreenErrors } from "@/components/ui/screen-errors";
import { Button } from "@/components/ui/button";
import {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import AuthInput from "../components/ui/AuthInput";
import { APP_URL } from "@/lib/constants";

export default function LoginId() {
    const [userInput, setUserInput] = useState("");
    const [isPhone, setIsPhone] = useState(false);

    // Initialize the SDK for this screen
    const screenProvider = new ScreenProvider();

    // Grab the any errors, if any
    const errors = screenProvider.transaction.errors;
    const identifierErrors = getFieldErrors("username", errors);

    // Handle the submit action
    const formSubmitHandler = (event) => {
        event.preventDefault();

        // disable the submit button
        const submitBtn = event.target.querySelector("button#submit-btn");
        if (submitBtn) submitBtn.setAttribute("disabled", "true");

        // grab the value from the form
        const identifierInput = event.target.querySelector("input#identifier");

        // Call the SDK
        const username = encodeURIComponent(identifierInput?.value);
        console.log("Username:", username);
        console.log("transaction", screenProvider.transaction);

        const connection = isPhone ? "sms" : "email";
        const url = `${APP_URL}/api/auth/login?connection=${connection}&login_hint=${username}`;
        console.log("URL:", url);
        window.location.href = url;
    };

    // Render the form
    return (
        <form noValidate onSubmit={formSubmitHandler}>
            <CardHeader>
                <CardTitle className="mb-2 text-3xl font-medium text-center">
                    {screenProvider.screen.texts?.title ?? "Welcome"}
                </CardTitle>
                <CardDescription className="mb-8 text-center">
                    {screenProvider.screen.texts?.description ?? "Login to continue"}
                </CardDescription>
                <ScreenErrors className="mb-4" errors={errors} />
            </CardHeader>
            <CardContent>
                <div className="mb-4 space-y-2 w-full">
                    <AuthInput
                        setUserInput={setUserInput}
                        setIsPhone={setIsPhone}
                        defaultValue={
                            screenProvider.screen.data?.username ??
                            screenProvider.untrustedData.submittedFormData?.username
                        }
                    />
                    {identifierErrors?.map((error, index) => (
                        <FieldError key={index} error={error} />
                    ))}
                </div>
                <Button type="submit" id="submit-btn" className="w-full">
                    {screenProvider.screen.texts?.buttonText ?? "Continue"}
                </Button>
            </CardContent>
        </form>
    );
}
