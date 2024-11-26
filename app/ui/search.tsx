"use client";
import { ChangeEvent } from "react";

import { fetchInvoicesPages } from "@/app/lib/data";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(function (
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { value } = event.target;
    const params = new URLSearchParams(searchParams);

    //  when the user types a new search query,
    //  we want to reset the page number to 1
    params.set("page", "1");

    console.log(value);

    if (value) params.set("query", value);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={handleSearch}
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
