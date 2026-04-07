import Link from "next/link";

type BrandMarkLinkProps = {
  className?: string;
};

export function BrandMarkLink({ className }: BrandMarkLinkProps) {
  const baseClassName =
    "inline-flex items-center bg-[#1A1817] px-2.5 py-1 font-mono text-[0.86rem] font-bold uppercase tracking-[0.12em] text-[#F7F3E9] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]";
  const composedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <Link href="/" aria-label="Onochu home" className={composedClassName}>
      ONOCHU
    </Link>
  );
}
