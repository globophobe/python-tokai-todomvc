import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../app/components/Loading";
import TodoList from "./list/TodoList";
import ALL_TODO_QUERY from "./list/allTodosQuery";

export default function TodoScreen() {
  const { loading, error, data } = useQuery(ALL_TODO_QUERY);
  let child = null;
  if (loading || error) {
    child = <Loading />;
  } else if (data) {
    const { allTodos } = data;
    child = <TodoList allTodos={allTodos} />;
  }
  return child;
}
