export const Schedule = () => (
  <ol className="flex flex-col gap-2">
    {[...Array(10)].map((_, i) => (
      <li
        key={i}
        className="flex flex-col gap-1 rounded bg-gray-1000 px-4 py-2"
      >
        <div className="text-sm text-gray-500">13:00 - 13:30</div>
        <div>MTG</div>
      </li>
    ))}
  </ol>
);
