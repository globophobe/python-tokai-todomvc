import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { IconButton, Colors } from "react-native-paper";
import ALL_TODOS_QUERY from "./allTodosQuery";
import UPDATE_TODO_MUTATION from "./updateTodoMutation";

export default function UpdateTodoButton({ uuid, completed }) {
  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
    update(
      cache,
      {
        data: { updateTodo: updated }
      }
    ) {
      const { allTodos } = cache.readQuery({ query: ALL_TODOS_QUERY });
      const index = allTodos.findIndex(todo => todo.uuid === updated.uuid);
      if (index > -1) {
        const todos = allTodos.slice(0);
        todos[index] = updated;
        cache.writeQuery({
          query: ALL_TODOS_QUERY,
          data: { allTodos: todos }
        });
      }
    }
  });
  const variables = { uuid, completed: !completed };
  const icon = completed ? "done" : "clear";
  const color = completed ? Colors.blue700 : Colors.red700;
  return (
    <IconButton
      mode="contained"
      icon={icon}
      color={color}
      onPress={() => updateTodo({ variables })}
    >
      Delete
    </IconButton>
  );
}

UpdateTodoButton.propTypes = {
  uuid: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};
