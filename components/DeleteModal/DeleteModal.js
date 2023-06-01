import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { deleteUsers } from '@/services/Users';
import { toast } from 'react-toastify';
import { useState } from 'react';

const DeleteModal = (props) => {
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const { handleDeleteUsers, record } = props;
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    setDataDeleteUser({ ...record });
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure to delete this user who has an email = ${record.Email}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        let res = await deleteUsers(record.ID);
        if (res && res.statusCode === 204) {
          handleDeleteUsers(dataDeleteUser);
          toast.success('Deleted successfully');
        } else {
          toast.error('Found an error while deleting');
        }
      },
    });
  };
  return (
    <>
      <Space>
        <Button
          className="ml-2 !text-red-600 !border-red-600 hover:!bg-red-600 hover:!text-white"
          onClick={confirm}
        >
          Delete
        </Button>
      </Space>
      {contextHolder}
    </>
  );
};
export default DeleteModal;
