import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOATS } from "../../queries";
import Boat from "../listItems/Boat";

import { List } from "antd";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_BOATS);
  if (loading) return "Loading...";
  if (error) return `Errror! ${error.message}`;
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.boats.map((boat) => (
        <List.Item key={id}>
          <Boat {...boat} />
        </List.Item>
      ))}
    </List>
  );
};

export default People;
