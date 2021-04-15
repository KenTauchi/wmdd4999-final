import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PEOPLE, GET_BOAT, ADD_BOAT } from "../../queries";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Person = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);
  const [boat, setBoat] = useState("");
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_BOAT);
  //   console.log("boat", data);

  const fullName = () => {
    return `${props.firstName} ${props.lastName}`;
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = () => setEditMode(!editMode);

  if (loading) return "Loading...";
  if (error) return `Errror! ${error.message}`;

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          title={fullName()}
          actions={[
            <Link to="/details">LEARN MORE </Link>,
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} firstName={firstName} lastName={lastName} />,
          ]}
          style={styles.card}
        ></Card>
      )}
    </List.Item>
  );
};

export default Person;
