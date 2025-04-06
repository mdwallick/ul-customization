import { useState, useEffect, useRef } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js"; // Import phone number parsing

const countryCodes = [
    { country: "", code: "", flag: "", language: "" },
    { country: "United States", code: "+1", flag: "🇺🇸", language: "en-US" },
    { country: "Canada", code: "+1", flag: "🇨🇦", language: "en-CA" },
    { country: "United Kingdom", code: "+44", flag: "🇬🇧", language: "en-GB" },
    { country: "Australia", code: "+61", flag: "🇦🇺", language: "en-AU" },
    { country: "Germany", code: "+49", flag: "🇩🇪", language: "de-DE" },
    { country: "France", code: "+33", flag: "🇫🇷", language: "fr-FR" },
    { country: "Italy", code: "+39", flag: "🇮🇹", language: "it-IT" },
    { country: "Spain", code: "+34", flag: "🇪🇸", language: "es-ES" },
    { country: "India", code: "+91", flag: "🇮🇳", language: "en-IN" },
    { country: "China", code: "+86", flag: "🇨🇳", language: "zh-CN" }
];

export default function AuthInput({ setUserInput, setIsPhone, defaultValue = "" }) {
    const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
    const [inputValue, setInputValue] = useState(defaultValue);
    const [isPhone, setIsPhoneState] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleInputChange = (event) => {
        let value = event.target.value;
        setInputValue(value);


        // Detect if it's a phone number (only digits, spaces, or "+")
        const phoneRegex = /^[\d+\s]+$/;
        const isPhoneNumber = phoneRegex.test(value);// && value.length > 2;
        console.log("isPhoneNumber?", isPhoneNumber);
        setIsPhoneState(isPhoneNumber);

        // Update parent component with the new isPhone state
        if (setIsPhone) {
            setIsPhone(isPhoneNumber); // Pass the value up to the parent
        }

        try {
            // Parse the phone number from the input value
            let phoneNumber = parsePhoneNumberFromString(value, "US");

            if (!value.startsWith("+") && phoneRegex.test(value) && value.length > 0) {
                const usCountry = countryCodes.find(c => c.code === "+1");
                setSelectedCode(usCountry);
                value = `${usCountry.code} ${value}`; // Prepend +1 if missing
                setInputValue(value);
            } else {
                // If phone number is valid, set the country code dynamically
                if (phoneNumber && phoneNumber.isValid()) {
                    const country = countryCodes.find(
                        (country) => phoneNumber.country === country.language.split("-")[1]
                    );
                    if (country) {
                        console.log("Selected Country Code:", country);
                        setSelectedCode(country); // Set the country code
                        setInputValue(phoneNumber.number);
                    } else {
                        console.log("Country not found for:", phoneNumber.country);
                    }
                } else {
                    setInputValue(value); // If it's not a valid phone number, treat it as regular input
                }
            }
        } catch (error) {
            console.error("Error parsing phone number:", error);
            setInputValue(value); // Fallback: treat as regular input if parsing fails
        }
    };

    // Handle country code selection
    const selectCountry = (country) => {
        setSelectedCode(country);
        setInputValue(country.code + " "); // Reset phone number with new country code
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-sm">
            {/* Country code dropdown */}
            <div ref={dropdownRef} className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                <div className="flex items-center" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span className="mr-2">{selectedCode.flag}</span>
                </div>
                {isDropdownOpen && (
                    <div className="absolute left-0 top-10 w-32 bg-white border border-gray-300 shadow-md max-h-40 overflow-auto z-10">
                        {countryCodes.map((country) => (
                            <div
                                key={country.code}
                                className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
                                onClick={() => selectCountry(country)}
                            >
                                <span className="mr-2">{country.flag}</span>
                                {country.code}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input field with left padding for the flag */}
            <input
                type="text"
                id="identifier"
                name="identifier"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter email or phone number"
                className="w-full rounded-lg border border-gray-300 p-2 pl-12 outline-none"
            />
        </div>
    );
}
