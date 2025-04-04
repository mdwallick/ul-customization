import { BASE_URL } from "@/lib/constants";
import { getCurrentScreen } from "@auth0/auth0-acul-js";
import { getScreenComponent } from "@/screens";
import { Card } from "@/components/ui/card";

export default function Widget() {
    const screen = getCurrentScreen() || "";

    return (
        <div className="flex-1 w-full mx-auto max-w-7x">
            <Card className="w-[512px] p-4 shadow-lg my-12 mx-auto">
                <img
                    src={`${BASE_URL}/images/WOF_s42_onion_logo_rev.png`}
                    className="block w-12 mb-6 ml-auto mr-auto"
                />
                {getScreenComponent(screen)}
            </Card>
        </div>
    );
}
