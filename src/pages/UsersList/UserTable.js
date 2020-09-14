import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Table = styled.table`
  text-align: left;
  border-collapse: collapse;
  width: 854px;
  height: 267px;
  margin: auto;
`;

const TableHeader = styled.th`
  text-transform: uppercase;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-family: SFProText;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.13px;
  color: #777777;
  vertical-align: middle;
  padding: 9px;
`;

const CheckboxHeader = styled(TableHeader)`
  width: 44px;
`;

const TableCell = styled.td`
  vertical-align: middle;
  padding: 14px;
  color: #000;#333333;
`;

const EmailCell = styled(TableCell)``;

const TableRow = styled.tr`
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #fafafa;
  }

  &:hover ${EmailCell} {
    color: #0070c9;
  }
`;

const StyledLink = styled(Link)`
  color: #0070c9;
  text-decoration: none;
`;

const RoleCell = styled(TableCell)`
  text-transform: capitalize;
`;

const UserCheckbox = styled.input`
  width: 14px;
  height: 14px;
  padding: 15px;
  border-radius: 3px;
  box-shadow: inset 0 0.5px 1.5px 0 rgba(0, 0, 0, 0.38);
  border: solid 0.5px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  vertical-align: middle;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

const DeleteButton = styled.button`
  box-shadow: none;
  outline: none;
  border: 1px solid #ee0000;
  color: #ee0000;
  background-color: #ffffff;
  &:disabled {
    border: 1px solid #b8b8b8;
    color: #b8b8b8;
  }
`;

const UserTable = ({ users, onDelete }) => {
  const [selected, setSelected] = useState([]);

  const handleDelete = (e) => {
    onDelete([selected]);
  };

  return (
    <div>
      <Header>
        <h1>Users</h1>

        <DeleteButton disabled={!selected.length} onClick={handleDelete}>
          Delete
        </DeleteButton>
      </Header>

      <Table>
        <thead>
          <TableRow>
            <CheckboxHeader />
            <TableHeader>Email</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Role</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {!users.length ? (
            <h1>No Users Found</h1>
          ) : (
            users.map((user) => {
              return (
                <TableRow
                  key={user.email}
                  onClick={() =>
                    setSelected((current) => {
                      return current.includes(user.email)
                        ? current.filter((email) => email !== user.email)
                        : [...current, user.email];
                    })
                  }
                >
                  <TableCell>
                    <UserCheckbox
                      type="checkbox"
                      id={user.email}
                      name="selected"
                      value={user.name}
                      checked={selected.includes(user.email)}
                    />
                  </TableCell>
                  {selected.includes(user.email) ? (
                    <EmailCell>
                      <StyledLink to={`/details/${user.email}`}>{user.email}</StyledLink>
                    </EmailCell>
                  ) : (
                    <EmailCell>{user.email}</EmailCell>
                  )}
                  <TableCell>{user.name}</TableCell>
                  <RoleCell>{user.role.toLocaleLowerCase().replace('_', ' ')}</RoleCell>
                </TableRow>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
