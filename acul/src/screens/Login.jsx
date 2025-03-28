import { cn, getFieldErrors } from "@/lib/utils";
import { Login as ScreenProvider } from "@auth0/auth0-acul-js";

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

export default function Login() {
  // Initialize the SDK for this screen
  const screenProvider = new ScreenProvider();

  // Grab the any errors, if any
  const errors = screenProvider.transaction.errors;
  const identifierErrors = getFieldErrors("username", errors);
  const passwordErrors = getFieldErrors("password", errors);

  // Handle the submit action
  const formSubmitHandler = (event) => {
    event.preventDefault();

    // disable the submit button
    const submitBtn = event?.target.querySelector("button#submit-btn");
    if (submitBtn) submitBtn.setAttribute("disabled", "true");

    // grab the values from the form
    const identifierInput = event.target.querySelector("input#identifier");
    const passwordInput = event.target.querySelector("input#password");

    // Call the SDK
    screenProvider.login({
      username: identifierInput?.value,
      password: passwordInput?.value,
    });
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
        <div className="mb-4 space-y-2">
          <Label
            htmlFor="identifier"
            className={cn(
              "block mb-2 font-semibold",
              identifierErrors?.length ? "text-red-600" : "text-inherit"
            )}
          >
            {screenProvider.screen.texts?.emailPlaceholder ??
              "Enter your email"}
          </Label>
          <Input
            type="text"
            id="identifier"
            name="identifier"
            defaultValue={
              screenProvider.screen.data?.username ??
              screenProvider.untrustedData.submittedFormData?.username
            }
          />
          {identifierErrors?.map((error, index) => (
            <FieldError key={index} error={error} />
          ))}
        </div>
        <div className="mb-4 space-y-2">
          <Label
            htmlFor="password"
            className={cn(
              "block mb-2 font-semibold",
              identifierErrors?.length ? "text-red-600" : "text-inherit"
            )}
          >
            {screenProvider.screen.texts?.passwordPlaceholder ?? "Password"}
          </Label>
          <Input type="password" id="password" name="password" />
          {passwordErrors?.map((error, index) => (
            <FieldError key={index} error={error} />
          ))}
        </div>
        <Button type="submit" id="submit-btn" className="w-full">
          {screenProvider.screen.texts?.buttonText ?? "Continue"}
        </Button>
        <Text className="mb-2">
          {screenProvider.screen.texts?.footerText ??
            "Don't have an account yet?"}
          <Link className="ml-1" href={screenProvider.screen.signupLink ?? "#"}>
            {screenProvider.screen.texts?.footerLinkText ??
              "Create your account"}
          </Link>
        </Text>
        <Text>
          Need Help?
          <Link
            className="ml-1"
            href={screenProvider.screen.resetPasswordLink ?? "#"}
          >
            {screenProvider.screen.texts?.forgottenPasswordText ??
              "Forgot your Password?"}
          </Link>
        </Text>
      </CardContent>
    </form>
  );
}
