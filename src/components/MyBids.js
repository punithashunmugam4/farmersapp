import Navigation from "./navigation";

const MyBids = ({ isSessionValid, setIsSessionValid, user }) => {
  return (
    <div id="my-bids">
      <Navigation
        isSessionValid={isSessionValid}
        setIsSessionValid={setIsSessionValid}
      />
      <h1 className="text-2xl font-bold text-center my-4">My Bids</h1>
      <p className="text-center text-gray-600">
        This section will display your bids once implemented.
      </p>
    </div>
  );
};

export default MyBids;
