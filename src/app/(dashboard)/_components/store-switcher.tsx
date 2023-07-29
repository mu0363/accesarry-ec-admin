"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import type { Store as TStore } from "@prisma/client";
import { CommandSeparator } from "cmdk";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  ChevronsUpDownIcon,
  PlusCircle,
  Store,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Props = { items: TStore[] } & React.ComponentPropsWithRef<
  typeof PopoverTrigger
>;

export function StoreSwitcher({ className, items = [] }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { onOpen } = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(true);
    router.push(`/${store.value}`);
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="select a store"
            className={cn(
              "w-[200px] flex items-center justify-between",
              className
            )}
          >
            <Store className="h-4 w-4 mr-2" />
            {currentStore?.label}
            <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Store..." />
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup heading="Stores">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => {
                      onStoreSelect(store);
                    }}
                  >
                    <Store className="w-4 h-4 mr-2" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto w-4 h-4",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    onOpen();
                  }}
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create Store
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
