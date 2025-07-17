// pages/simpletest.tsx
export default function SimpleTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100">
      <div className="p-10 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Simple Tailwind Test</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
}
