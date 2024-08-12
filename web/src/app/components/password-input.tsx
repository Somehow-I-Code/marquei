import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex justify-between items-center">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
}
