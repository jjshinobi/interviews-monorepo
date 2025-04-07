import { TodoStatus } from "../../../../core/domain/entities/todo";
import { FilterContainer, FilterButton } from "./styles";

export const TodoFilter = ({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: TodoStatus | "all";
  onFilterChange: (filter: TodoStatus | "all") => void;
}) => {
  return (
    <FilterContainer>
      <FilterButton
        active={currentFilter === "all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </FilterButton>
      <FilterButton
        active={currentFilter === "active"}
        onClick={() => onFilterChange("active")}
      >
        Active
      </FilterButton>
      <FilterButton
        active={currentFilter === "completed"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </FilterButton>
    </FilterContainer>
  );
};
