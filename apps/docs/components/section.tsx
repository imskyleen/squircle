export const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid flex-1 grid-rows-[1fr_auto] grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
      <div className="col-start-2 row-span-full row-start-1 text-border border-x border-x-current bg-neutral-50 dark:bg-neutral-900" />
      <div className="col-start-4 row-span-full row-start-1 text-border border-x border-x-current bg-neutral-50 dark:bg-neutral-900" />
      <div className="col-start-3 row-start-1">{children}</div>
    </div>
  );
};
