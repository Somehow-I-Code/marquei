import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, ComponentProps } from "react";

type PasswordInputProps = ComponentProps<typeof Input>;

export default function PasswordInput(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex justify-between items-center">
            <Input {...props} type={showPassword ? "text" : "password"} />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
}
