interface HomeIconProps {
  onClick: () => void;
}

export function HomeIcon({ onClick }: HomeIconProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed 
        top-4 
        left-4 
        z-50 
        w-12 
        h-12 
        flex 
        items-center 
        justify-center 
        bg-foreground 
        text-background 
        rounded-full 
        hover:scale-110 
        transition-transform 
        duration-200
        cursor-pointer
      "
      aria-label="Return to home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    </button>
  );
}
