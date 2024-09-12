import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PropsWithClassName } from "@/components/shared/types/types";

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
} & PropsWithClassName;

export const TextField = <T extends FieldValues>({ control, fieldName, label, placeholder, className}: TextFieldProps<T>) => {
  return (
    <FormField control={control} name={fieldName} render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className={className} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};