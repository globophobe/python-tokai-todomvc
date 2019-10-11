import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { IconButton, Colors } from "react-native-paper";
import ALL_TODOS_QUERY from "../list/allTodosQuery";
import DELETE_TODO_MUTATION from "./deleteTodoMutation";

export default function DeleteTodoButton({ uuid }) {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    update(
      cache,
      {
        data: { deleteTodo: deleted }
      }
    ) {
      const { allTodos } = cache.readQuery({ query: ALL_TODOS_QUERY });
      const todos = allTodos.filter(todo => todo.uuid !== deleted.uuid);
      cache.writeQuery({
        query: ALL_TODOS_QUERY,
        data: { allTodos: todos }
      });
    }
  });
  const variables = { uuid };
  return (
    <IconButton
      mode="contained"
      icon="delete"
      color={Colors.red700}
      onPress={() => deleteTodo({ variables })}
    >
      Delete
    </IconButton>
  );
}

DeleteTodoButton.propTypes = {
  uuid: PropTypes.string.isRequired
};
