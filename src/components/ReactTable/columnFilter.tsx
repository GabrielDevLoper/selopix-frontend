import { Input } from "../Form/Input";

export default function GlobalFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <>
      <Input
        name={"filterColumn"}
        placeholder=""
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        size="sm"
        borderRadius="6px"
      />
    </>
  );
}
