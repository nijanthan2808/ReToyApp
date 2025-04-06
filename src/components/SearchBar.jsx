import React from "react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ search, setSearch, locationFilter, setLocationFilter }) {
  return (
    <div className="mb-4 flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Search for toys..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2"
      />
      <Input
        placeholder="Filter by location..."
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="w-full p-2"
      />
    </div>
  );
}