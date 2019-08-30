import React from 'react'
import {Query} from 'react-apollo'
import {GET_CURRENT_USER} from './query'

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({data, loading}) => {
      const {viewer} = data
      if (loading || !viewer) {
        return null;
      }
      return (
        <div>
          {viewer.name} {viewer.login}
        </div>
      );
    }}
  </Query>  
  )

export default Profile
