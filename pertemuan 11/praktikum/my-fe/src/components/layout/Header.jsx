export default function Header({ pageTitle, onToggleSidebar }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 bg-slate-100 rounded" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="text-lg font-bold">{pageTitle}</h1>
      </div>
    </header>
  );
}
