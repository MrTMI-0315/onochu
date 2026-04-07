import Link from "next/link";

type BrandMarkLinkProps = {
  className?: string;
};

export function BrandMarkLink({ className }: BrandMarkLinkProps) {
  const baseClassName =
    "inline-flex items-center bg-[#1A1817] px-2 py-1 font-mono text-[0.82rem] font-bold uppercase tracking-[0.1em] text-[#EBE6D8]";
  const composedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <Link href="/" aria-label="Onochu home" className={composedClassName}>
      ONOCHU
    </Link>
  );
}
