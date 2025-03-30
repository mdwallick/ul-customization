import { cn, getFieldErrors } from "@/lib/utils";
import { LoginPasswordlessEmailCode as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components
import { FieldError } from "@/components/ui/field-error";
import { ScreenErrors } from "@/components/ui/screen-errors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

export default function LoginPasswordlessEmailCode() {
    // Initialize the SDK for this screen
    const screenProvider = new ScreenProvider();

    // Grab the any errors, if any
    const errors = screenProvider.transaction.errors;
    const otpErrors = getFieldErrors("otp", errors);

    // Handle the submit action
    const formSubmitHandler = (event) => {
        event.preventDefault();

        // disable the submit button
        const submitBtn = event.target.querySelector("button#submit-btn");
        if (submitBtn) submitBtn.setAttribute("disabled", "true");

        // grab the value from the form
        const identifierInput = event.target.querySelector("input#identifier");
        const otpInput = event.target.querySelector("input#otp");

        // Call the SDK
        console.log("OTP entered:", otpInput?.value);
        screenProvider.submitCode({
            email: identifierInput?.value,
            code: otpInput?.value
        })
    };

    // Render the form
    return (
        <form noValidate onSubmit={formSubmitHandler}>
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
                    {/* <Label
                        htmlFor="otp"
                        className={cn(
                            "block mb-2 font-semibold",
                            otpErrors?.length ? "text-red-600" : "text-inherit"
                        )}
                    >
                        {screenProvider.screen.texts?.placeholder ??
                            "Enter the code"}
                    </Label> */}
                    <Text className="mb-4 text-large">
                        <span className="inline-block">
                            <span className="inline-block ml-1 font-bold">
                                {screenProvider.screen.data?.username}
                            </span>
                        </span>
                        <Link
                            href={screenProvider.screen.editIdentifierLink ?? "#"}
                            className="ml-2"
                        >
                            {screenProvider.screen.texts?.editText ?? "Edit"}
                        </Link>
                    </Text>
                    <Input
                        type="hidden"
                        name="identifier"
                        id="identifier"
                        value={screenProvider.screen.data?.username}
                    />
                    <Input
                        type="text"
                        id="otp"
                        name="otp"
                    />

                    {otpErrors?.map((error, index) => (
                        <FieldError key={index} error={error} />
                    ))}
                </div>
                <Button type="submit" id="submit-btn" className="w-full">
                    {screenProvider.screen.texts?.buttonText ?? "Continue"}
                </Button>
                <Text className="mb-2">
                    {screenProvider.screen.texts?.resendText ??
                        "Didn't receive an email?"}
                    <Link className="ml-1" href={screenProvider.screen.resendLink ?? "#"}>
                        {screenProvider.screen.texts?.resendActionText ??
                            "Resend"}
                    </Link>
                </Text>
            </CardContent>
        </form>
    );
}
