import React from 'react';
import { Button, Popconfirm } from 'antd';

const popConfirm: React.FC = () => {
  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  return (
    <Popconfirm
      title="Title"
      description="Are you sure you want to disable this property?"
      onConfirm={confirm}
      onOpenChange={() => console.log('open change')}
    >
      <Button type="primary">Are you sure you want to disable this propery?</Button>
    </Popconfirm>
  );
};

export default popConfirm