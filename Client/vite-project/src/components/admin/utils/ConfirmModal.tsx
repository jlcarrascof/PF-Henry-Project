import { ExclamationCircleFilled } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';

type FieldType = {
    username?: string;
    email?: string;
  };

  export const showConfirmationModalWithForm = (onOk: (values: FieldType) => void) => {
    Modal.confirm({
        title: 'Are you sure?',
        icon: <ExclamationCircleFilled />,
        content: (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={(values: FieldType) => onOk(values)} // Corregir aquí
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        ),
        onOk() {},
        onCancel() {},
    });
};

export const showConfirmationModal = (onOk: () => void) => {
    Modal.confirm({
      title: 'Are you sure you want to continue?',
      icon: <ExclamationCircleFilled />,
      content: 'This action can be risky',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk,
    });
  };