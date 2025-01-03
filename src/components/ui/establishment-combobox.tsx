"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Establishment = {
  value: string;
  label: string;
  cityValue: string;
};

type EstablishmentComboboxProps = {
  establishments: Establishment[];
  selectedCity: string | null;
  onEstablishmentSelect: (establishment: Establishment) => void;
};

export function EstablishmentCombobox({
  establishments,
  selectedCity,
  onEstablishmentSelect,
}: EstablishmentComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = React.useState<Establishment | null>(null);
  const [input, setInput] = React.useState("");

  const handleSelect = (establishmentValue: string) => {
    const establishment = establishments.find((e) => e.value === establishmentValue);
    if (establishment) {
      setSelectedEstablishment(establishment);
      setInput(establishment.label);
      onEstablishmentSelect(establishment);
    }
    setOpen(false);
  };

  const filteredEstablishments = establishments.filter(
    (est) => est.cityValue === selectedCity && est.label.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={!selectedCity}
        >
          {selectedEstablishment ? selectedEstablishment.label : "Selecione um estabelecimento..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Pesquisar estabelecimento..." value={input} onValueChange={setInput} />
          <CommandList>
            <CommandEmpty>Nenhum estabelecimento encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredEstablishments.map((est) => (
                <CommandItem key={est.value} onSelect={() => handleSelect(est.value)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedEstablishment?.value === est.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {est.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
