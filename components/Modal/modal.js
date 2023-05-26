import { useState } from 'react';
import { Button, Modal, Form, Checkbox, Input } from 'antd';
import { createUsers } from '@/services/Users';
import { toast } from 'react-toastify';

const ModalAddUser = (props) => {
  const { handleUpdateTable } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const res = await createUsers(name, job);
    if (res && res.id) {
      setIsModalOpen(false);
      setName('');
      setJob('');
      toast.success('CREATED A NEW USER');
      handleUpdateTable({ FirstName: name, ID: res.id });
    } else {
      toast.error('FAILED TO CREATE A NEW USER');
    }
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
        Add a new user
      </Button>
      <Modal
        title="Add a new user"
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
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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

export default ModalAddUser;
