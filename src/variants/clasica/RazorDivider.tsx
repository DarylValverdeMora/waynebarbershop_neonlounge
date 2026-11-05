// Corte diagonal entre secciones, como el filo de una navaja.
export const RazorDivider = () => (
  <div aria-hidden="true" className="container-wb py-6">
    <div className="relative h-8">
      <span className="absolute inset-x-0 top-1/2 block h-[2px] origin-left -rotate-[1.2deg] bg-ink" data-razor-line />
      <span className="absolute top-1/2 right-0 block h-[2px] w-1/3 origin-right -rotate-[1.2deg] bg-accent" data-razor-line />
    </div>
  </div>
);
