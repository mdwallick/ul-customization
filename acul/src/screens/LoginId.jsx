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

import AuthInput from "@/components/ui/AuthInput";
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
        if (submitBtn) {
            submitBtn.setAttribute("disabled", "true");
        }

        // grab the value from the form
        const identifierInput = event.target.querySelector("input#identifier");

        const username = encodeURIComponent(identifierInput?.value);
        const connection = isPhone ? "sms" : "email";

        console.log("Username:", username);
        console.log("transaction", screenProvider.transaction);

        const url = `${APP_URL}/api/auth/login?connection=${connection}&login_hint=${username}`;
        console.log("URL:", url);
        window.location.href = url;
    };

    // Render the form
    return (
        <form noValidate onSubmit={formSubmitHandler}>
            <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <CardHeader>
                    <CardTitle className="mb-2 text-3xl font-medium text-center">
                        {screenProvider.screen.texts?.title ?? "Welcome"}
                    </CardTitle>
                    <CardDescription className="mb-8 text-center">
                        {screenProvider.screen.texts?.description ?? "Login to continue"}
                    </CardDescription>
                    <ScreenErrors className="mb-4" errors={errors} />
                </CardHeader>
                {/* <h2 class="mb-6 text-center text-xl font-semibold text-gray-800">{screenProvider.screen.texts?.description ?? "Login to continue"}</h2> */}
                <CardContent>
                    <div className="mb-4 space-y-2 w-full">
                        <AuthInput
                            setUserInput={setUserInput}
                            setIsPhone={setIsPhone}
                            className="w-full rounded-md border border-gray-300 px-5 py-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
                            defaultValue={
                                screenProvider.screen.data?.username ??
                                screenProvider.untrustedData.submittedFormData?.username
                            }
                        />
                        {identifierErrors?.map((error, index) => (
                            <FieldError key={index} error={error} />
                        ))}
                    </div>
                    <Button type="submit" id="submit-btn" className="primary mt-4 w-full rounded-md bg-[#1a73e8] px-4 py-2 text-white shadow-md transition hover:bg-blue-600">
                        {screenProvider.screen.texts?.buttonText ?? "Continue"}
                    </Button>
                </CardContent>
            </div>
        </form>
    );
}
