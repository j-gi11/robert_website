interface BentoBoxProps {
  color: string;
  label: string;
  onClick: () => void;
  isExpanded?: boolean;
}

export function BentoBox({ color, label, onClick, isExpanded = false }: BentoBoxProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        cursor-pointer
        overflow-hidden
        group
        transition-all
        duration-300
        hover:scale-105
        ${isExpanded ? "col-span-1 md:col-span-3 md:row-span-2" : ""}
      `}
      style={{
        backgroundColor: color,
      }}
    >
      {/* Image Placeholder - Hidden by default, shown on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Color overlay that fades on hover */}
      <div
        className="absolute inset-0 opacity-100 group-hover:opacity-60 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Label */}
      <div className="relative h-full flex items-center justify-center p-4">
        <p className="text-center text-white font-semibold text-sm md:text-base lg:text-lg tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
}
