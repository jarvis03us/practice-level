import { useEffect, useState } from 'react';
import { Button, Modal, Form, Checkbox, Input } from 'antd';
import { updateUsers } from '@/services/Users';
import { toast } from 'react-toastify';

const EditModal = (props) => {
  const { record, handleEditUsers } = props;
  const [dataEditUser, setDataEditUser] = useState({});
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setDataEditUser({ ...record });
  };
  const handleOk = async (page) => {
    setIsModalOpen(false);
    let res = await updateUsers(name, job, page);
    if (res && res.updatedAt) {
      handleEditUsers({
        first_name: name,
        ID: dataEditUser.ID,
      });
      toast.success('Users updated successfully');
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
        Edit
      </Button>
      <Modal
        title="Edit a user"
        open={isModalOpen}
        onOk={handleOk}
        okText="Save changes"
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          onFinish={handleOk}
          initialValues={{
            remember: true,
            FirstName: dataEditUser.FirstName,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="FirstName"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input
              value={dataEditUser.FirstName}
              onChange={(e) => setName(e.target.value)}
            />
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
