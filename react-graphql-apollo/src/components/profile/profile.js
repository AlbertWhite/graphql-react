import React from 'react'
import {Query, graphql} from 'react-apollo'
import {GET_REPOSITORIES_OF_CURRENT_USER} from './query'
import Repos from '../repo/repos'

const Profile = ({ data, loading, error }) => {
  if (error) {
    return error.toString()
  }
  const { viewer } = data;
  if (loading || !viewer) {
    return null;
  }
  return <Repos repositories={viewer.repositories} />
};

const ProfileWithRenderProps = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {Profile}
  </Query>  
  )


const ProfileWithHOC = graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);

export default ProfileWithRenderProps
