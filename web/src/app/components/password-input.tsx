import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";

type PasswordInputProps = ComponentProps<typeof Input>;

type Ref = HTMLInputElement;

const PasswordInput = forwardRef<Ref, PasswordInputProps>(
    function (props, ref) {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative flex items-center">
                <Input
                    {...props}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        );
    },
);

export default PasswordInput;
