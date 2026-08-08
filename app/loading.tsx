export default function Loading() {
  return (
    <main className="section-shell min-h-screen animate-pulse py-32" aria-busy="true" aria-label="Cargando contenido">
      <div className="h-4 w-36 rounded-full bg-ink/10" />
      <div className="mt-8 h-24 max-w-3xl rounded-3xl bg-ink/10" />
      <div className="mt-6 h-6 max-w-xl rounded-full bg-ink/10" />
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {["uno", "dos", "tres"].map((item) => <div key={item} className="h-64 rounded-[1.6rem] bg-ink/10" />)}
      </div>
    </main>
  );
}
