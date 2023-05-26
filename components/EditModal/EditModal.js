import { useEffect, useState } from 'react';
import { Button, Modal, Form, Checkbox, Input } from 'antd';

const EditModal = (props) => {
  const { record } = props;
  const [dataEditUser, setDataEditUser] = useState({});
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setDataEditUser({ ...record });
  };
  const handleOk = async () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{ backgroundColor: 'transparent', color: '#2563eb' }}
        type="primary"
        onClick={showModal}
      >
        Edit
      </Button>
      <Modal
        title="Edit a user"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            FirstName: dataEditUser.FirstName,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input value={dataEditUser.FirstName} />
          </Form.Item>

          <Form.Item
            label="Job"
            name="job"
            rules={[
              {
                required: true,
                message: 'Please input your job!',
              },
            ]}
          >
            <Input value={job} onChange={(e) => setJob(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
