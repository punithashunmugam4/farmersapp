export function StatisticsSection() {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/marketplace-stats");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching marketplace stats:", error);
    }
  };

  const data = fetchData();

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Marketplace Impact
          </h2>
          <p className="text-xl text-gray-600">
            Connecting farmers and buyers across the nation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-farm-green-600 mb-2">
              {data?.activeFarmers || "2,847"}
            </div>
            <div className="text-gray-600">Active Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-farm-green-600 mb-2">
              {data?.wholesaleBuyers || "1,523"}
            </div>
            <div className="text-gray-600">Wholesale Buyers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-farm-green-600 mb-2">
              {data?.totalSalesVolume || "$12.8M"}
            </div>
            <div className="text-gray-600">Total Sales Volume</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-farm-green-600 mb-2">
              {data?.productsListed || "15,642"}
            </div>
            <div className="text-gray-600">Products Listed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
