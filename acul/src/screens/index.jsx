// Import all the screens here
import Signup from "./Signup";
import SignupId from "./SignupId";
import SignupPassword from "./SignupPassword";
import Login from "./Login";
import LoginId from "./LoginId";
import LoginPassword from "./LoginPassword";
import LoginPasswordlessEmailCode from "./LoginPasswordlessEmailOtp";
import LoginPasswordlessSmsOtp from "./LoginPasswordlessSmsOtp";

// Reference all the screens in this map
const screenMap = {
    "login": Login,
    "login-id": LoginId,
    "login-password": LoginPassword,
    "login-passwordless-email-code": LoginPasswordlessEmailCode,
    "login-passwordless-sms-otp": LoginPasswordlessSmsOtp,
    "signup": Signup,
    "signup-id": SignupId,
    "signup-password": SignupPassword
};

/**
 * Finds the right screen component or returns an empty one
 * @param screen - the name of the current screen
 * @returns - the React screen component
 */
export function getScreenComponent(screen) {
    const screenComponent = screenMap[screen];

    return screenComponent ? (
        screenComponent()
    ) : (
        <div>
            <h1 className="mb-4 text-2xl font-medium">Not yet implemented!</h1>
            <p>Screen: {screen}</p>
        </div>
    );
}
