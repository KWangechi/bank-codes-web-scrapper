import { useState, useMemo } from "react";
import Select from "react-select";
import { useBanks, useSubmitBankLocationSuggestion } from "stores/queryStore";
import { Option } from "./BankSelectOption";
import GoogleMap from "./Map";
import { XMarkIcon } from "@heroicons/react/24/solid";

const BankLocationSuggestion = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    bankName: null,
    branchName: "",
    location: "",
    branchCode: "",
    useMap: false,
    coordinates: null,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { data: banksData } = useBanks();
  const { mutate: submitSuggestion, isPending: isSubmitting, data: suggestion } =
    useSubmitBankLocationSuggestion();
  const [selectedBank, setSelectedBank] = useState(null);

  const bankOptions = useMemo(() => {
    return [...banksData]
      .map((bank) => ({
        value: bank.name,
        label: bank.name,
        logo: bank.logo_url,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [banksData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
    setFormData((prev) => ({
      ...prev,
      bankName: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.bankName) {
      setError("Bank Name is required");
      return;
    }
    if (!formData.branchName.trim()) {
      setError("Branch Name is required");
      return;
    }

    // Location validation - either manual location OR coordinates (from map OR manual lat/lng)
    const hasManualLocation = formData.location && formData.location.trim();
    const hasMapCoordinates = formData.coordinates;
    const hasManualCoordinates =
      formData.latitude !== null &&
      formData.longitude !== null &&
      formData.latitude !== undefined &&
      formData.longitude !== undefined;

    if (!hasManualLocation && !hasMapCoordinates && !hasManualCoordinates) {
      setError(
        "Location is required (either manual location input, map selection, or manual coordinates)",
      );
      return;
    }

    if (!formData.branchCode.trim()) {
      setError("Branch Code is required");
      return;
    }

    // Prepare the suggestion data
    const suggestionData = {
      bank_name: formData.bankName.value || formData.bankName,
      branch_name: formData.branchName.trim(),
      branch_code: formData.branchCode.trim(),
      location: formData.location.trim(),
      latitude: null,
      longitude: null,
    };

    // Set coordinates based on input method
    if (hasMapCoordinates) {
      suggestionData.latitude = formData.coordinates.lat;
      suggestionData.longitude = formData.coordinates.lng;
    } else if (hasManualCoordinates) {
      suggestionData.latitude = formData.latitude;
      suggestionData.longitude = formData.longitude;
    }

    try {
      // Submit the suggestion
      submitSuggestion(suggestionData);
      console.log(suggestion);
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        bankName: null,
        branchName: "",
        location: "",
        branchCode: "",
        useMap: false,
        coordinates: null,
      });
      setSelectedBank(null);
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit suggestion. Please try again.");
    }
  };

  return (
    <div className="relative py-8 px-4 overflow-hidden bg-primary/5 dark:bg-primary/10">
      <div className="flex justify-between items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Suggest New Bank Location
        </h2>

        <div onClick={handleClose}>
          <XMarkIcon className="w-7 h-7 hover:bg-gray-200 rounded-md cursor-pointer" />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>
          <span className="text-yellow-600 font-extrabold pr-2">*</span>
          Note: All submissions will be reviewed before being added to the
          database.
        </p>
      </div>

      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-3 mt-4"
          role="alert"
        >
          <span className="block sm:inline">Success</span>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3 mt-4"
          role="alert"
        >
          <span className="block sm:inline"> {error}!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 pt-10">
        {/* Bank Name Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <Select
            isClearable
            options={bankOptions}
            placeholder="Filter by Bank"
            // isLoading={isLoadingBanks}
            onChange={(e) => handleBankChange(e?.value)}
            value={
              selectedBank ? { value: selectedBank, label: selectedBank } : null
            }
            components={{ Option }}
            classNamePrefix="react-select"
            isSortable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                padding: "3px 3px",
                borderColor: state.isFocused ? "primary" : "gray",
                boxShadow: state.isFocused ? "0 0 0 1px gray" : "none",
                "&:hover": {
                  borderColor: "gray",
                },
              }),
            }}
          />
        </div>

        {/* Branch Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.branchName}
            onChange={(e) => handleInputChange("branchName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter branch name"
          />
        </div>

        {/* Branch Code Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.branchCode}
            onChange={(e) => handleInputChange("branchCode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:border-[#D0BB95]"
            placeholder="Enter branch code (e.g., 001)"
          />
        </div>

        {/* Location Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="useMap"
              checked={formData.useMap}
              onChange={(e) => handleInputChange("useMap", e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="useMap" className="text-sm text-gray-600">
              Use map to select location instead of manual input
            </label>
          </div>

          {!formData.useMap ? (
            <div className="space-y-4">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:border-[#D0BB95]"
                placeholder="Enter location (e.g., Nairobi CBD, Mombasa City Centre)"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.latitude || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "latitude",
                        e.target.value ? parseFloat(e.target.value) : null,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:border-[#D0BB95]"
                    placeholder="e.g., -1.286389"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.longitude || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "longitude",
                        e.target.value ? parseFloat(e.target.value) : null,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:border-[#D0BB95]"
                    placeholder="e.g., 36.817223"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <GoogleMap setFormData={setFormData} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude (from map)
                  </label>
                  <input
                    type="text"
                    value={
                      formData.coordinates
                        ? formData.coordinates.lat.toFixed(6)
                        : ""
                    }
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude (from map)
                  </label>
                  <input
                    type="text"
                    value={
                      formData.coordinates
                        ? formData.coordinates.lng.toFixed(6)
                        : ""
                    }
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary/80 hover:bg-primary text-white font-bold py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankLocationSuggestion;
