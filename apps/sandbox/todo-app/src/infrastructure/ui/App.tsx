import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { TodoFilter } from "./components/TodoFilter";
import { AppContainer, Header, MainContent } from "./styles";
import { useTodos } from "./hooks/useTodos.ts";

export const App = () => {
  const {
    todos,
    loading,
    error,
    filter,
    addTodo,
    toggleTodoStatus,
    updateTodo,
    removeTodo,
    changeFilter,
  } = useTodos();

  return (
    <AppContainer>
      <Header>
        <h1>Todo App</h1>
      </Header>
      <MainContent>
        <TodoForm onAddTodo={addTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={changeFilter} />
        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggle={toggleTodoStatus}
          onUpdate={updateTodo}
          onDelete={removeTodo}
        />
      </MainContent>
    </AppContainer>
  );
};
