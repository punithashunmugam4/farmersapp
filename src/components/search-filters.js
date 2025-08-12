import { useState } from "react";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Search, Filter } from "lucide-react";

export default function SearchFilters({ onFiltersChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchChange = (event) => {
    let value = event.target.value;
    setSearch(value);
    onFiltersChange({ search: value, category, location });
  };

  const handleCategoryChange = (event) => {
    let value = event.target.value;
    setCategory(value);
    onFiltersChange({
      search,
      category: value === "all" ? "" : value,
      location,
    });
  };

  const handleLocationChange = (event) => {
    let value = event.target.value;
    setLocation(value);
    onFiltersChange({
      search,
      category,
      location: value === "all" ? "" : value,
    });
  };

  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={handleSearchChange}
                className="pl-10 h-12 focus:ring-2 focus:ring-farm-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select
              value={category === "" ? "all" : category}
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Vegetables">Vegetables</MenuItem>
              <MenuItem value="Fruits">Fruits</MenuItem>
              <MenuItem value="Grains">Grains</MenuItem>
              <MenuItem value="Herbs">Herbs</MenuItem>
            </Select>

            <Select
              value={location !== "" ? location : "all"}
              onChange={handleLocationChange}
            >
              <MenuItem value="all">All Locations</MenuItem>
              <MenuItem value="California">Tamil Nadu</MenuItem>
              <MenuItem value="Texas">Kerala</MenuItem>
              <MenuItem value="Florida">Kanada</MenuItem>
              <MenuItem value="Oregon">Andra</MenuItem>
              <MenuItem value="Washington">Telangana</MenuItem>
            </Select>

            <Button variant="outline" className="h-15">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
