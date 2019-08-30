import React from 'react'
import {Query} from 'react-apollo'
import {GET_REPOSITORIES_OF_CURRENT_USER} from './query'
import Repos from '../repo/repos'

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({data, loading, error}) => {
      const {viewer} = data
      if (loading || !viewer) {
        return null;
      }
      if(error){
        return error.toString()
      }
      return (
        <Repos repositories={viewer.repositories} />
      );
    }}
  </Query>  
  )

export default Profile
