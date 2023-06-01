import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/Users';
import { Table, Button } from 'antd';
import ModalAddUser from '../Modal/modal';
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import _ from 'lodash';

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
      key: 'first_name',
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
            <EditModal record={record} handleEditUsers={handleEditUsers} />
            <DeleteModal
              record={record}
              handleDeleteUsers={handleDeleteUsers}
            />
          </>
        </>
      ),
    },
  ];

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUsers = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.ID === user.ID);
    cloneListUsers[index].FirstName = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteUsers = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.ID !== user.ID);
    setListUsers(cloneListUsers);
  };

  useEffect(() => {
    getUsers(1);
    handleDeleteUsers();
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setListUsers(
        res.data.map((row) => ({
          key: row.id,
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
