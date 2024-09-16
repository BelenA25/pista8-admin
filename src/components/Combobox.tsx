import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import { listCountries } from "countries-ts";

type ComboboxProps = {
    onSelect: (value: string) => void;
    selectedValue?: string; 
};

export function Combobox({ onSelect, selectedValue }: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [countries, setCountries] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        const countryList = listCountries().map(country => ({
            value: country.label.toLowerCase(),
            label: country.label,
        }));
        setCountries(countryList);
    }, []);

    useEffect(() => {
        setValue(selectedValue || "");
    }, [selectedValue]);
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? countries.find((country) => country.label === value)?.label
                        : "Select country..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.label}
                                    value={country.label}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        onSelect(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {country.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === country.label ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
