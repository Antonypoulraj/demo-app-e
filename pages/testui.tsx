export default function TestUI() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black text-black dark:text-white p-10 rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-center">Tailwind UI Test</h1>
        <p className="text-center text-muted-foreground">
          If this looks styled, Tailwind is working 🎉
        </p>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-blue-600">
          Test Button
        </button>
      </div>
    </div>
  );
}
