import Navigation from "./navigation";

const MyProducts = ({ isSessionValid, setIsSessionValid, user }) => {
  return (
    <div id="my-products">
      <Navigation
        isSessionValid={isSessionValid}
        setIsSessionValid={setIsSessionValid}
      />
      <h1 className="text-2xl font-bold text-center my-4">My Products</h1>
      <p className="text-center text-gray-600">
        This section will display your products once implemented.
      </p>
    </div>
  );
};

export default MyProducts;
