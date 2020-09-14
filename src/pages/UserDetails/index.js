import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 1024px;
  text-align: center;
  padding-top: 113px;
  padding-left: 84px;
  padding-right: 84px;
  margin: 0 auto;
`;

const StyledLabel = styled.label`
  text-transform: capitalize;
`;

const TextLabel = styled.label`
  text-transform: capitalize;
  color: #333333;
`;

const RadioLabel = styled.p`
  color: #333333;
`;

const TextInput = styled.input`
  display: block;
  width: 240px;
  height: 21px;
  padding: 4px 4px 2px 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  border: solid 3.5px rgba(59, 153, 252, 0.5);
  background-color: #ffffff;
`;
const RadioInput = styled.input`
  margin-right: 8px;
  margin-top: -1px;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  border: solid 0.5px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

const RadioOption = styled.div`
  align-items: center;
  margin-top: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 253px;
`;

// FIX FOR DRY
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #e5e5e5;
  padding-bottom: 15px;
  margin-bottom: 22px;
`;

const LeftSide = styled.div`
  text-align: left;
  flex: 1;
  border-right: solid 1px #e5e5e5;
  padding-right: 23px;
`;
const RightSide = styled.div`
  text-align: left;
  flex: 1;
  padding-left: 23px;
`;

const USER_QUERY = gql`
  query User($email: ID!) {
    user(email: $email) {
      email
      name
      role
    }
  }
`;

const USER_UPDATE = gql`
  mutation UserUpdate($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
      name
      role
    }
  }
`;

const UserDetails = ({ match }) => {
  const {
    params: { userId },
  } = match;
  const history = useHistory();
  const user = useQuery(USER_QUERY, {
    variables: { email: userId },
  });
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [update] = useMutation(USER_UPDATE);

  useEffect(() => {
    if (user && user.data) {
      setUserRole(user.data.user.role);
      setUserName(user.data.user.name);
    }
  }, [user]);

  const roles = ['ADMIN', 'DEVELOPER', 'APP_MANAGER', 'MARKETING', 'SALES'];

  const handleSubmit = (event) => {
    event.preventDefault();
    update({
      variables: { email: userId, newAttributes: { name: userName, role: userRole } },
      refetchQueries: [USER_QUERY],
    });
    history.push('/');
  };

  if (user.loading) return <p>LOADING</p>;
  if (user.error || update.error) return <p>Error</p>;
  return (
    <Container>
      {user.data.user ? (
        <form onSubmit={handleSubmit}>
          <Header>
            <h1>{user.data.user.email}</h1>
            <button type="submit" name="submit">
              Save
            </button>
          </Header>
          <FlexContainer>
            <LeftSide>
              <TextLabel htmlFor="name">Name</TextLabel>
              <TextInput
                id="name"
                type="text"
                value={userName}
                placeholder={user.data.user.name}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={(e) => setUserName(e.target.value)}
              />
            </LeftSide>

            <RightSide>
              <RadioLabel>Role</RadioLabel>
              {roles.map((option) => {
                return (
                  <RadioOption key={option}>
                    <RadioInput
                      id={option}
                      type="radio"
                      name="role"
                      value={option}
                      onChange={(e) => setUserRole(e.target.value)}
                      onBlur={(e) => setUserRole(e.target.value)}
                      checked={userRole === option.toUpperCase()}
                    />

                    <StyledLabel htmlFor={option}>
                      {option.toLocaleLowerCase().replace('_', ' ')}
                    </StyledLabel>
                  </RadioOption>
                );
              })}
            </RightSide>
          </FlexContainer>
        </form>
      ) : (
        <h1>No User found</h1>
      )}
    </Container>
  );
};

export default UserDetails;
