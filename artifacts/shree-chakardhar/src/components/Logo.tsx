export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center bg-white px-2 py-1">
      <img
        src="/logo.png"
        alt="Shree Chakardhar Enterprises"
        width={920}
        height={280}
        className={`${className} w-auto max-w-[42vw] object-contain [clip-path:inset(3px)] sm:max-w-[220px]`}
      />
    </span>
  );
}
