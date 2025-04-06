import React from "react";
import ToyCard from "./ToyCard";

export default function ToyList({ toys, search, locationFilter }) {
  const filteredToys = toys.filter((toy) => {
    const matchesSearch = toy.name.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = toy.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  if (filteredToys.length === 0) {
    return <p className="text-center text-gray-500">No toys found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredToys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}