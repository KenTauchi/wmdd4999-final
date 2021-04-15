import React from "react";
import { useHistory } from "react-router-dom";

const PersonDetail = () => {
  const history = useHistory();
  return (
    <div>
      test
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        GO BACK HOME
      </button>
    </div>
  );
};

export default PersonDetail;
