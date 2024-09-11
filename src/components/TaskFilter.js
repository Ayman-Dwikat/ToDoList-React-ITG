export default function TaskFilter({ filterValue, onFilterChange }) {
  return (
    <select
      value={filterValue}
      onChange={(e) => onFilterChange(e.target.value)}
      className="mt-2 form-select"
    >
      <option value="any">All Tasks</option>
      <option value="completed">Completed Tasks</option>
      <option value="pending">Pending Tasks</option>
      <option value="not completed">Not Completed Tasks</option>
    </select>
  );
}
