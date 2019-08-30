import React from 'react'
import Link from '../shared/link'
import {STAR_REPOSITORY, UNSTAR_REPOSITORY} from './query'
import { Mutation } from 'react-apollo';
import Button from '../shared/button'

const Repos  = ({ repositories }) => {
  return repositories.edges.map(({node: {
    id,
    name,
    url,
    descriptionHTML,
    primaryLanguage,
    owner,
    stargazers,
    watchers,
    viewerSubscription,
    viewerHasStarred,
  }}) => (
    <div key={id} className="RepositoryItem">
      <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>
        {!viewerHasStarred ? (
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {
            // addStar is returned by the mutation
            (addStar, { data, loading, error }) => (<Button
            className={'RepositoryItem-title-action'}
            onClick={addStar}
          >
            {stargazers.totalCount} Star
          </Button>)}
        </Mutation>
        ) : (
          <Mutation mutation={UNSTAR_REPOSITORY} variables={{ id }}>
            {(removeStar, { data, loading, error }) => (
              <Button
                className="RepositoryItem-title-action"
                onClick={removeStar}
              >
                {stargazers.totalCount} Unstar
              </Button>
            )}
          </Mutation>
        )}
      </div>
      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && (
              <span>Language: {primaryLanguage.name}</span>
            )}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  ))
}

export default Repos
