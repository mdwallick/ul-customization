import { useState, useRef } from "react";

export default function OtpInput({ length = 6, onChange, onComplete, error, name = "otp", id = "otp" }) {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        onChange?.(newOtp.join(""));

        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every((digit) => digit !== "")) {
            onComplete?.(newOtp.join(""));
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        const newOtp = [...otp];

        for (let i = 0; i < paste.length; i++) {
            newOtp[i] = paste[i];
            if (inputRefs.current[i]) {
                inputRefs.current[i].value = paste[i];
            }
        }

        setOtp(newOtp);
        onChange?.(newOtp.join(""));

        if (paste.length === length) {
            onComplete?.(paste);
        }

        const nextIndex = paste.length < length ? paste.length : length - 1;
        inputRefs.current[nextIndex].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength="1"
                    name={`otp-${index}`}
                    id={`otp-${index}`}
                    className={`w-12 h-12 text-center border rounded-md text-xl outline-none ${error ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-blue-500`}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                />
            ))}
            <input type="hidden" id={id} name={name} value={inputRefs.current.map(i => i?.value || "").join("")} />
        </div>
    );
}
