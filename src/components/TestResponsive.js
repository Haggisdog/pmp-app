// File: /src/components/TestResponsive.js

export default function TestResponsive() {
  const sizes = [
    { name: "iPhone SE", width: 375 },
    { name: "sm (640px)", width: 640 },
    { name: "md (768px)", width: 768 },
    { name: "lg (1024px)", width: 1024 },
    { name: "xl (1280px)", width: 1280 },
  ];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Responsive Test Dashboard</h2>
      {sizes.map(({ name, width }) => (
        <div key={name}>
          <h3 className="text-lg font-semibold mb-2">{name} - {width}px</h3>
          <iframe
            src="/"
            width={width}
            height="500"
            style={{ border: '2px solid #ccc', borderRadius: '8px' }}
            title={name}
          />
        </div>
      ))}
    </div>
  );
}
