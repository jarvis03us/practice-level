import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/Users';
import { Table, Button } from 'antd';
import ModalAddUser from '../Modal/modal';
import EditModal from '../EditModal/EditModal';

const TableUsers = (props) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',
      render: (text, record) => (
        <>
          <>
            <EditModal record={record} />
          </>

          <button
            className="rounded-full bg-red-500 px-4"
            onClick={() => console.log(record)}
          >
            {'Delete'}
          </button>
        </>
      ),
    },
  ];

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setListUsers(
        res.data.map((row) => ({
          ID: row.id,
          Email: row.email,
          FirstName: row.first_name,
          LastName: row.last_name,
        }))
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium uppercase text-slate-600">
          User Table
        </h1>
        <ModalAddUser handleUpdateTable={handleUpdateTable} />
      </div>
      <Table
        dataSource={listUsers}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          pageSize: 6,
          total: totalUsers,
        }}
        onChange={(page) => {
          getUsers(page.current);
        }}
      />
    </>
  );
};

export default TableUsers;
