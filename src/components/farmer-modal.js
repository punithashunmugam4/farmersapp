import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Input,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useToast } from "./hooks/use-toast.ts";
import { styled } from "@mui/material/styles";
import { CloudUpload } from "lucide-react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function FarmerModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    unit: "lbs",
    startingPrice: "",
    auctionDuration: "24",
    location: "",
    isOrganic: false,
    auctionViewers: [],
  });
  console.log(formData.isOrganic);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto ">
        <DialogTitle>
          <Dialog>List Your Product</Dialog>
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name">Product Name</label>
              <Input
                id="name"
                placeholder="e.g., Premium Tomatoes"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Select
                value={formData.category === "" ? "none" : formData.category}
                placeholder="Select Category"
                onChange={(value) => handleInputChange("category", value)}
              >
                <MenuItem value="none">Select Category</MenuItem>
                <MenuItem value="Vegetables">Vegetables</MenuItem>
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Grains">Grains</MenuItem>
                <MenuItem value="Herbs">Herbs</MenuItem>
                <MenuItem value="Dairy">Dairy</MenuItem>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Describe your product, quality, harvesting details..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-farm-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="quantity">Quantity Available</label>
              <Input
                id="quantity"
                type="number"
                placeholder="500"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                required
              />
            </div>
            <div>
              <Select
                value={formData.unit ? formData.unit : "lbs"}
                placeholder="Select Unit"
                onChange={(e) => handleInputChange("unit", e.target.value)}
              >
                <MenuItem value="lbs">kg</MenuItem>
                <MenuItem value="kg">lbs</MenuItem>
                <MenuItem value="pieces">pieces</MenuItem>
                <MenuItem value="bundles">bundles</MenuItem>
                <MenuItem value="bushels">bushels</MenuItem>
              </Select>
            </div>
            <div>
              <label htmlFor="startingPrice">Starting Price</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Rs.
                </span>
                <Input
                  id="startingPrice"
                  type="number"
                  step="0.01"
                  placeholder="2.50"
                  className="pl-8"
                  value={formData.startingPrice}
                  onChange={(e) =>
                    handleInputChange("startingPrice", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="auctionDuration" className="mr-4">
                Auction Duration
              </label>
              <Select
                value={
                  formData.auctionDuration ? formData.auctionDuration : "168"
                }
                placeholder="Select Duration"
                onChange={(e) =>
                  handleInputChange("auctionDuration", e.target.value)
                }
              >
                <MenuItem value="3">3 hours</MenuItem>
                <MenuItem value="6">6 hours</MenuItem>
                <MenuItem value="12">12 hours</MenuItem>
                <MenuItem value="24">24 hours</MenuItem>
                <MenuItem value="72">3 days</MenuItem>
                <MenuItem value="168">7 days</MenuItem>
              </Select>
            </div>
            <div>
              <label htmlFor="location" className="mr-4">
                Location
              </label>
              <Input
                id="location"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="auctionviewers" className="mr-4">
              Auction viewers
            </label>
            <Input
              id="auctionviewers"
              type="text"
              placeholder="Comma separated emails"
              value={formData.auctionViewers}
              onChange={(e) => {
                let viewers = formData.auctionViewers;
                let newValue = e.target.value.split(",").map((v) => v.trim());
                viewers.push(...newValue);
                handleInputChange("auctionViewers", viewers);
              }}
            />
          </div>

          <div>
            <label>Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-farm-green-400 transition-colors">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="organic"
              checked={formData.isOrganic}
              onClick={(e) => handleInputChange("isOrganic", e.target.checked)}
            />
            <label htmlFor="organic">This is an organic product</label>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 farm-green-600 hover:bg-farm-green-700"
                disabled={false}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
