const VendorCard = ({ vendor, viewVendorProductsHandler }) => {
  const { id, businessName, logoUrl, city, province } = vendor;

  return (
    <div
      onClick={() => viewVendorProductsHandler(id)}
      key={id}
      className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md cursor-pointer text-center transition"
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={businessName}
          className="w-full h-32 object-cover mb-3 rounded"
        />
      ) : (
        <div className="text-4xl mb-3">🏪</div>
      )}
      <h3 className="sm:text-sl lg:text-lg font-semibold text-gray-800">{businessName}</h3>
      <p className="text-sm text-gray-500">
        {city}
        {province ? `, ${province}` : ""}
      </p>
    </div>
  );
};

export default VendorCard;
