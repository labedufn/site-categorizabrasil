"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type City = {
  value: string;
  label: string;
};

type CityComboboxProps = {
  cities: City[];
  onCitySelect: (city: City) => void;
};

export function CityCombobox({ cities, onCitySelect }: CityComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
  const [input, setInput] = React.useState("");

  const handleSelect = (cityValue: string) => {
    const city = cities.find((c) => c.value === cityValue);
    if (city) {
      setSelectedCity(city);
      setInput(city.label);
      onCitySelect(city);
    }
    setOpen(false);
  };

  const filteredCities = cities.filter((city) => city.label.toLowerCase().includes(input.toLowerCase()));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {selectedCity ? selectedCity.label : "Selecione uma cidade..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Pesquisar cidade..." value={input} onValueChange={setInput} />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              {filteredCities.map((city) => (
                <CommandItem key={city.value} onSelect={() => handleSelect(city.value)}>
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedCity?.value === city.value ? "opacity-100" : "opacity-0")}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
