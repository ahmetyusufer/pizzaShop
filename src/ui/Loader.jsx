function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-red-600"></div>
    </div>
  );
}

export default Loader;
