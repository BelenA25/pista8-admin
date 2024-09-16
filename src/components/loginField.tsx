import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PropsWithClassName } from "@/shared/types/types";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type LoginFieldProps<T extends FieldValues> = {
  control: Control<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
  type: "text" | "password" | "email" ; 
  disabled: boolean;
} & PropsWithClassName;

export const LoginField = <T extends FieldValues>({
  control,
  fieldName,
  label,
  placeholder,
  type = "text", 
  className,
  disabled = false
}: LoginFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField control={control} name={fieldName} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              placeholder={placeholder}
              type={type === "password" && !showPassword ? "password" : "text"}
              {...field}
              className={`${className} pr-10`}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon  />}
              </button>
            )}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
    />
  );
};
