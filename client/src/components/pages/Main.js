import React from "react";
import AddPerson from "../forms/AddPerson";
import AddBoat from "../forms/AddBoat";
import People from "../lists/People";
import Title from "../layout/Title";
import Boats from "../listItems/Boat";

import { Layout } from "antd";
const { Content } = Layout;

const Main = () => {
  return (
    <div className="container">
      <Content className="App">
        <Title />
        <AddPerson />
        <AddBoat />
        <People />
        {/* <Boats /> */}
      </Content>
    </div>
  );
};

export default Main;
