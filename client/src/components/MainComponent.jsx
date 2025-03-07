import React from "react";
import UploadComponent from "./UploadComponent";
import ChatComponent from "./ChatComponent";

const MainComponent = () => {
  return (
    <div className="container">
      <div className="left-column">
        <UploadComponent />
      </div>
      <div className="right-column">
        <ChatComponent />
      </div>
    </div>
  );
};

export default MainComponent;