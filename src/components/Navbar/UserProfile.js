import "../../css/UserProfile.css";

import React, { useEffect } from "react";
import { ReactComponent as Score } from "../Navbar/score.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "urql";
import Loader from "../Loader";
const expQuery = `query MyQuery {
  users {
    exp
  }
}
`;
const UserProfile = ({ exp }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [result, reexecuteQuery] = useQuery({
    query: expQuery,
  });
  const { fetching, data } = result;
  useEffect(() => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  }, []);

  useEffect(() => {
    console.log(data)
    if(data?.users[0]?.exp === undefined) {
      reexecuteQuery({ requestPolicy: 'cache-and-network' });
    }
  }, [data]);

  if (isLoading || fetching) {
    return <Loader />;
  }

  return (
    isAuthenticated && (
      <div className="userProfile">
        <h2 >{user.nickname}</h2>
        <span>
          <Score />
          {data.users.length > 0 ? (
            data.users[0].exp + " .exp"
          ): <p>Loading...</p>}
        </span>
      </div>
    )
  );
};

export default UserProfile;
