import React, { useState, useEffect } from "react";
import IUser from "../../Entities/User";
import Avatar, { Cache, ConfigProvider } from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";

const UserProfile = () => {
  const usersDb: IUser[] = [
    {
      id: 1,
      username: "John Doe",
      email: "smt@fakemail.com",
      password: "psw",
      isAdmin: false,
    },
    {
      id: 2,
      username: "Jane Doe",
      email: "smt2@fakemail.com",
      password: "psw2",
      isAdmin: true,
    },
  ];

  const [userData, setUserData] = useState<IUser>(usersDb[0]);

  const fetchUserData = () => {
    // fetch("https://randomuser.me/api")
    //   .then((resp) => resp.json())
    //   .then((data) => setUserData(data.results));

    // Single user fetch
    // return usersDb[Math.floor(Math.random() * usersDb.length)];

    setUserData(usersDb[Math.floor(Math.random() * usersDb.length)]);
  };

  //Creates userProfile with picture/full name
  const userProfile = (userMeta: any) => {
    const {
      name: { first, last },
      picture: { medium },
    } = userMeta;

    return (
      <>
        <img src={medium} alt="" />
        <p>
          {first}, {last}
        </p>
      </>
    );
  };

  //Fetch API data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={userData.username} />

          <h1>Username: {userData.username}</h1>
          <h1>Email: {userData.email}</h1>
          <h1>Password: {userData.password}</h1>
        </Grid>
      </PageContainer>
    </>
  );
};

export default UserProfile;
