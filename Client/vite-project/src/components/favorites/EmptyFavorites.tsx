import React from "react";
import { Button, Empty } from "antd";
import { Link } from "react-router-dom";

const EmptyFavorites: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 120, margin: 60 }}
    description={
      <span>
        There's no favorites yet{" "}
        <a href="/login">Login to see your favorites</a> or ...
      </span>
    }
  >
    <Link to="/rooms">
      <Button type="primary">Look for rooms!</Button>
    </Link>
  </Empty>
);

export default EmptyFavorites;
