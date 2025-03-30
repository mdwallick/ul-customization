import { useState, useEffect, useRef } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js"; // Import phone number parsing

const countryCodes = [
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

export default function AuthInput({ setUserInput, setIsPhone }) {
    const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
    const [inputValue, setInputValue] = useState("");
    const [isPhone, setIsPhoneState] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Detect and set the country code dynamically as the user types
    const handleInputChange = (e) => {
        let value = e.target.value;
        setInputValue(value);

        // +44 (799) 555-6666
        let phoneNumber;

        // Detect if it's a phone number (only digits, spaces, or "+")
        const phoneRegex = /^[\d+\s]+$/;
        const isPhoneNumber = phoneRegex.test(value) && value.length > 3;
        console.log("isPhoneNumber?", isPhoneNumber);
        setIsPhoneState(isPhoneNumber);

        // Update parent component with the new isPhone state
        if (setIsPhone) {
            setIsPhone(isPhoneNumber); // Pass the value up to the parent
        }

        try {
            // Parse the phone number from the input value
            //console.log("selected code:", selectedCode);
            // phoneNumber = parsePhoneNumberFromString(value, selectedCode.language.split("-")[1]);
            phoneNumber = parsePhoneNumberFromString(value, "US");
            //console.log("Parsed phone number", phoneNumber); // Log the parsed phone number

            // If phone number is valid, set the country code dynamically
            if (phoneNumber && phoneNumber.isValid()) {
                const country = countryCodes.find(
                    (country) => phoneNumber.country === country.language.split("-")[1]
                );
                if (country) {
                    console.log("Selected Country Code:", country);
                    setSelectedCode(country); // Set the country code
                    //setInputValue(country.code + " " + value.replace(/\D/g, "")); // Format input with country code
                    // if (country.code == "+1") {
                    //     // for US, add the +1
                    //     setInputValue("+1" + value.replace(/\D/g, ""));
                    // } else {
                    //     // for international, the country code is already there, so just add the plus
                    //     setInputValue("+" + value.replace(/\D/g, ""));
                    // }
                    setInputValue(phoneNumber.number);
                } else {
                    console.log("Country not found for:", phoneNumber.country);
                }
            } else {
                //console.log("Not a phone number, assuming email");
                setInputValue(value); // If it's not a valid phone number, treat it as regular input
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
        <div className="relative flex items-center border border-gray-300 rounded-lg p-2 w-full max-w-sm">
            {/* Show country selector only if input is a phone number */}
            {isPhone && (
                <div
                    ref={dropdownRef}
                    className="relative cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <div className="flex items-center p-2 border-r border-gray-300 bg-white">
                        <span className="mr-2">{selectedCode.flag}</span>
                        {/* <span>{selectedCode.code}</span> */}
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
            )}

            {/* Email or Phone Number Input */}
            <input
                type="text"
                id="identifier"
                name="identifier"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter email or phone number"
                className="flex-1 p-2 outline-none"
            />
        </div>
    );
}
