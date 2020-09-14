import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserTable from './UserTable';
import styled from 'styled-components';

const Container = styled.div`
  width: 1024px;
  text-align: center;
  padding-top: 156px;
  padding-left: 84px;
  padding-right: 84px;
  margin: 0 auto;
`;

const ALL_USERS_QUERY = gql`
  query GetUsers {
    allUsers {
      email
      name
      role
    }
  }
`;

const USERS_DELETE = gql`
  mutation UsersDelete($emails: [ID]!) {
    deleteUsers(emails: $emails) {
      ID
    }
  }
`;

export default function UsersList() {
  const users = useQuery(ALL_USERS_QUERY);
  const [deleteUsers] = useMutation(USERS_DELETE);

  if (users.loading) {
    return <p>Loading...</p>;
  }

  if (users.error) {
    return <p>Error: {JSON.stringify(users.error)}</p>;
  }

  const handleDelete = (input) => {
    deleteUsers({
      variables: { input },
      refetchQueries: [ALL_USERS_QUERY],
    });
  };

  return (
    <Container>
      <UserTable users={users.data.allUsers} onDelete={handleDelete} />
    </Container>
  );
}
