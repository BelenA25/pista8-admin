import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; 
import { PropsWithClassName } from "@/shared/types/types";

type TextAreaFieldProps<T extends FieldValues> = {
  control: Control<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
} & PropsWithClassName;

export const TextAreaField = <T extends FieldValues>({
  control,
  fieldName,
  label,
  placeholder,
  className,
}: TextAreaFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} className={className} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
