import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Input,
  Select,
  MenuItem,
  Checkbox,
  DialogTitle,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { CloudUpload, X } from "lucide-react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { add_new_load } from "../api_call";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sleep = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export function FarmerModal({ user, isOpen, onClose, product }) {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "none",
    description: "",
    quantity: "",

    unit: "kg",
    startingPrice: "",
    auctionDuration: "24",
    location: "",
    isOrganic: false,
    pick_up_range_start_date: dayjs(),
    pick_up_range_end_date: dayjs(),
    auctionViewers: [],
  });
  const formatDate = (time) => {
    let t = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    return t;
  };
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setModalLoading(true);
      setShowModal(false);
      const timer = window.setTimeout(() => {
        setModalLoading(false);
        setShowModal(true);
      }, 250); // adjust as needed
      return () => window.clearTimeout(timer);
    } else {
      setModalLoading(false);
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("Running UseEffect in FarmerModal.js");
    console.log("farmer modal product in: ", product);
    console.log("farmer modal User in: ", user);
    if (user && showModal) {
      setFormData({
        name: product?.product || "",
        category: product?.category || "none",
        description: product?.additional_info || "",
        quantity: product?.weight || "",
        unit: "kg",
        startingPrice: product?.min_bid || "",
        auctionDuration: product?.auction_time_hrs || "24",
        location:
          product?.product_location.join(", ") || user
            ? `${user.address}, ${user.city}, ${user.state}, ${
                user.country || "India"
              } - ${user.zipcode}`
            : "",
        isOrganic: false,
        pick_up_range_start_date: product?.pick_up_range_start_date
          ? dayjs(product?.pick_up_range_start_date)
          : dayjs(),
        pick_up_range_end_date: product?.pick_up_range_end_date
          ? dayjs(product?.pick_up_range_end_date)
          : dayjs(),
        auctionViewers: [],
      });
      // console.log("User details in FarmerModal:", user);
      // console.log("Initial formData:", formData);
    }
  }, [user, showModal, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    let location = formData.location.split(", ");
    let zip = formData.location.split("-").pop().trim();
    let visibleUsers =
      formData.auctionViewers === ""
        ? []
        : formData.auctionViewers.includes(",")
          ? formData.auctionViewers.split(",")
          : [formData.auctionViewers];
    const loadDetails = {
      name: user?.username,
      email: user?.email,
      product: formData.name,
      category: formData.category,
      additional_info: formData.description,
      weight: formData.quantity,
      contact: user?.contact,
      auction_time_hrs: formData.auctionDuration,
      min_bid: formData.startingPrice,
      product_location: [
        {
          address: location[0],
          city: location[1],
          state: location[2],
          country: location[3],
          zip: zip,
        },
      ],
      status: "Open",
      pick_up_range_start_date: formatDate(formData.pick_up_range_start_date),
      pick_up_range_end_date: formatDate(formData.pick_up_range_end_date),
      visible_user: visibleUsers,
    };
    console.log("Load details to be sent:", loadDetails);
    if (product) {
      loadDetails.auction_id = product.auction_id;
    }
    add_new_load(
      process.env.REACT_APP_API_URL,
      sessionStorage.getItem("session_token_farmersapp"),
      loadDetails,
    )
      .then(async (response) => {
        console.log("Load added successfully:", response);
        if (
          response.ok &&
          (response.status === 200 || response.status === 201)
        ) {
          console.log(response.ok, response.status);
          toast.success("🚀 Load added successfully!");
          await sleep(2000);
          onClose();
        } else {
          toast.error("Failed to add load. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error adding load:", error);
        toast.error("Failed to add load. Please try again.");
      });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(formData);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB limit

    if (validFiles.length !== files.length) {
      alert("Some files were larger than 5MB and were skipped.");
    }

    setImages((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={modalLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {showModal && (
        <Dialog open={showModal} className="relative">
          <DialogTitle>
            Add Product
            <button
              onClick={onClose}
              className="absolute top-1 right-1 bg-transparent hover:bg-gray-200 rounded-full p-2"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </DialogTitle>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar ">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name">Product Name</label>
                  <Input
                    id="name"
                    placeholder="e.g., Premium Tomatoes"
                    value={formData?.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Select
                    value={formData?.category}
                    placeholder="Select Category"
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
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
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
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
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Select
                    value={formData?.unit}
                    placeholder="Select Unit"
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  >
                    <MenuItem value="kg">kg</MenuItem>
                    <MenuItem value="lbs">lbs</MenuItem>
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
                    value={formData?.auctionDuration}
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
                    placeholder="Address, City, State, Zip"
                    value={formData.location}
                    onInput={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Pickup Range Start"
                    value={formData.pick_up_range_start_date}
                    onChange={(value) =>
                      handleInputChange("pick_up_range_start_date", value)
                    }
                  />
                  <DatePicker
                    label="Pickup Range End"
                    value={formData.pick_up_range_end_date}
                    onChange={(value) =>
                      handleInputChange("pick_up_range_end_date", value)
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
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
                    handleInputChange("auctionViewers", e.target.value);
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
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      multiple
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 5MB each
                  </p>

                  {/* Preview Section */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {images.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                          />
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-4 -right-4 bg-white text-red-500 rounded-full p-1 shadow-md opacity-80 group-hover:opacity-100"
                          >
                            <X className="text-sm small" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="organic"
                  checked={formData.isOrganic}
                  onClick={(e) =>
                    handleInputChange("isOrganic", e.target.checked)
                  }
                />
                <label htmlFor="organic">This is an organic product</label>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 hover:text-white hover:bg-farm-red-500"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 hover:text-white hover:farm-green-500"
                    disabled={false}
                  >
                    Submit
                  </Button>
                  <ToastContainer position="top-right" autoClose={2000} />
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
