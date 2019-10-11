import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { TextInput, Colors } from "react-native-paper";
import ErrorList from "../../error/ErrorList";
import ALL_TODOS_QUERY from "../list/allTodosQuery";
import CREATE_TODO_MUTATION from "./createTodoMutation";

const styles = StyleSheet.create({
  textInput: {
    height: 90,
    backgroundColor: Colors.grey100
  }
});

function mutate(createTodo, variables, setErrors, setSubmitting) {
  createTodo({ variables })
    .then(async ({ errors }) => {
      if (errors) {
        setErrors(errors);
        setSubmitting(false);
      }
    })
    .catch(() => {
      setSubmitting(false);
    });
}

function validate(title, setErrors) {
  if (!title) {
    setErrors(["Title is required"]);
    return false;
  }
  return true;
}

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    update(
      cache,
      {
        data: { createTodo: todo }
      }
    ) {
      const { allTodos } = cache.readQuery({ query: ALL_TODOS_QUERY });
      cache.writeQuery({
        query: ALL_TODOS_QUERY,
        data: { allTodos: allTodos.concat([todo]) }
      });
    }
  });
  return (
    <>
      <TextInput
        mode="flat"
        style={styles.textInput}
        label="Title"
        value={title}
        onChangeText={value => setTitle(value)}
        onSubmitEditing={() => {
          const isValid = validate(title, setErrors);
          if (isValid) {
            mutate(createTodo, { title }, setErrors, setSubmitting);
          }
        }}
        editable={!isSubmitting}
      />
      <ErrorList errors={errors} />
    </>
  );
}
