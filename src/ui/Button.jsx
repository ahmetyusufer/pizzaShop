function Button({ children, onClick, disabled, className }) {
  return (
    <button
      className={`m-1 rounded-full px-3 py-1 text-sm sm:m-0 sm:px-4 sm:py-2 sm:text-base ${disabled ? "cursor-not-allowed bg-gray-400" : "bg-yellow-400"} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
