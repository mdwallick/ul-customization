import { cn, getFieldErrors } from "@/lib/utils";
import { LoginPasswordlessEmailCode as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components
import { FieldError } from "@/components/ui/field-error";
import { ScreenErrors } from "@/components/ui/screen-errors";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { useRef, useState } from "react";
import OtpInput from "@/components/ui/OtpInput";

export default function LoginPasswordlessEmailCode() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [error, setError] = useState(false);
    const identifierRef = useRef(null);

    // Initialize the SDK for this screen
    const screenProvider = new ScreenProvider();

    // Grab the any errors, if any
    const errors = screenProvider.transaction.errors;
    const otpErrors = getFieldErrors("otp", errors);

    const handleChange = (value) => {
        setOtpValue(value);
        setError(false); // Clear error on change
    };

    const handleComplete = (otpValue) => {
        console.log("Auto-submitting OTP:", otpValue);
        setIsSubmitting(true);

        screenProvider.submitCode({
            email: identifierRef?.value,
            code: otpValue
        })

        if (otpValue.length !== 6) {
            setError(true);
        }
    };

    // Render the form
    return (
        <form>
            <CardHeader>
                <CardTitle className="mb-2 text-3xl font-medium text-center">
                    {screenProvider.screen.texts?.title ?? "Verify Your Identity"}
                </CardTitle>
                <CardDescription className="mb-8 text-center">
                    {screenProvider.screen.texts?.description ?? "Email sent"}
                </CardDescription>
                <ScreenErrors className="mb-4" errors={errors} />
            </CardHeader>
            <CardContent>
                <div className="mb-4 space-y-2">
                    <Text className="mb-4 text-large">
                        <span className="inline-block">
                            <span className="inline-block ml-1 font-bold">
                                {screenProvider.screen.data?.username}
                            </span>
                        </span>
                        <Link
                            href={screenProvider.screen.links?.edit_identifier ?? "#"}
                            className="ml-2"
                        >
                            {screenProvider.screen.texts?.editText ?? "Edit"}
                        </Link>
                    </Text>
                    <Input
                        type="hidden"
                        name="identifier"
                        id="identifier"
                        ref={identifierRef}
                        value={screenProvider.screen.data?.username}
                    />
                    <OtpInput
                        length={6}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        error={error}
                        disabled={isSubmitting}
                    />
                    {otpErrors?.map((error, index) => (
                        <FieldError key={index} error={error} />
                    ))}
                </div>
                <Text className="mb-2">
                    {screenProvider.screen.texts?.resendText ??
                        "Didn't receive an email?"}
                    <Link className="ml-1" href={screenProvider.screen?.links.resend_link ?? "#"}>
                        {screenProvider.screen.texts?.resendActionText ??
                            "Resend"}
                    </Link>
                </Text>
            </CardContent>
        </form>
    );
}
