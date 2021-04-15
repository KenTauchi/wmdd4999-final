import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Form, Input, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";

import { GET_PEOPLE, GET_BOAT, ADD_BOAT } from "../../queries";

const AddBoat = () => {
  const [addBoat] = useMutation(ADD_BOAT);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [personId, setPersonId] = useState("1");

  const { loading, error, data } = useQuery(GET_PEOPLE);

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const { Option } = Select;

  const handleChange = (value) => {
    setPersonId(value);
  };

  const fullName = (person) => {
    return `${person.firstName} ${person.lastName}`;
  };

  const onFinish = (values) => {
    const { year, make, model, price } = values;
    const id = uuidv4();

    addBoat({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addPerson: {
          __typename: "Boat",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (proxy, { data: { addBoat } }) => {
        const data = proxy.readQuery({ query: GET_BOATS });
        proxy.writeQuery({
          query: GET_BOATS,
          data: {
            ...data,
            boats: [...data.boats, addBoat],
          },
        });
      },
    });
  };

  if (loading) return "Loading...";
  if (error) return `Errror! ${error.message}`;

  return (
    <Form
      form={form}
      name="add-boat-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input your boat year!" }]}
      >
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input boat make!" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input boat model!" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input boat price" }]}
      >
        <Input placeholder="Price" />
      </Form.Item>

      <Select
        defaultValue={fullName(data.people[0])}
        style={{ width: 200 }}
        onChange={handleChange}
      >
        {data.people.map((person, index) => (
          <Option key={index} value={person.id}>
            {fullName(person)}
          </Option>
        ))}
      </Select>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddBoat;
