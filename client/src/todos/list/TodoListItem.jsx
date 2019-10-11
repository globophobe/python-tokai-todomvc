import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import DeleteTodoButton from "../delete/DeleteTodoButton";
import UpdateTodoButton from "./UpdateTodoButton";

const styles = StyleSheet.create({
  section: {
    marginVertical: 10
  },
  subHeader: {
    fontSize: 22
  },
  title: {
    fontSize: 18
  }
});
export default function TodoListItem({ uuid, title, completed }) {
  return (
    <List.Section style={styles.section}>
      <List.Item
        title={title}
        left={() => <UpdateTodoButton uuid={uuid} completed={completed} />}
        right={() => <DeleteTodoButton uuid={uuid} />}
      />
    </List.Section>
  );
}

TodoListItem.propTypes = {
  uuid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};
