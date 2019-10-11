import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { FilterContext } from "../../app/FilterContext";
import TodoListItem from "./TodoListItem";
import CreateTodo from "../create/CreateTodo";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function TodoList({ allTodos }) {
  const {
    state: { status }
  } = useContext(FilterContext);
  let todos;
  if (status !== undefined) {
    todos = allTodos.filter(({ completed }) => completed === status);
  } else {
    todos = allTodos;
  }
  return (
    <SafeAreaView styles={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={({ uuid }) => uuid}
        ListHeaderComponent={() => <CreateTodo />}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <TodoListItem {...item} />}
      />
    </SafeAreaView>
  );
}

TodoList.propTypes = {
  allTodos: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
