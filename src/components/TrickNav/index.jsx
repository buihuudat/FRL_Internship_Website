import { useEffect, useState } from "react";
import "./styles.css";
import { messageApi } from "../../utils/api/messageApi";

const TrickNav = () => {
  const [position, setPosition] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const getText = async () => {
      try {
        const rs = await messageApi.getText("Mẹo để ứng tuyển ngắn gọn");
        rs?.message && setText(rs.message);
      } catch (error) {
        console.log(error);
      }
    };
    getText();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) =>
        prevPosition <= -100 ? 0 : prevPosition - 1
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "70%" }}>
      <div
        style={{
          transform: `translateX(${position}%)`,
          color: "white",
          fontFamily: "cursive",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default TrickNav;
