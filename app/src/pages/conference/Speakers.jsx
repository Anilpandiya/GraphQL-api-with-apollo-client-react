import * as React from "react";
import { useParams } from "react-router-dom";
import "./style-sessions.css";
import { gql, useQuery } from '@apollo/client';

//Fragment
const SPEAKER_ATTRIBUTES = gql`
 fragment SpeakerInfo on Speaker{
   id
   name
   bio
   sessions{
     id
     title
   } 
 }
`;

/* ---> Define queries, mutations and fragments here */
const SPEAKERS = gql`
  query speakers {
    speakers {
     ...SpeakerInfo
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;

const SPEAKER_BY_ID = gql`
  query speakerById($id: ID!) {
    speakerById(id: $id) {
      ...SpeakerInfo
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;


const SpeakerList = () => {
  const { loading, data, error } = useQuery(SPEAKERS);
  /* ---> Replace hardcoded speaker values with data that you get back from GraphQL server here */
  const featured = false;

  if(loading) return <p>Loading Soeakers...</p>

  if(error) return <p>Something went wrong!</p>

  return data.speakers.map(({ id, name, bio, sessions} ) => ( 
		<div
      key={id}
      className="col-xs-12 col-sm-6 col-md-6"
      style={{ padding: 5 }}
    >
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{`Speaker: ${name} `}</h3>
        </div>
        <div className="panel-body">
          <h5>{`Bio: ${bio}` }</h5>
        </div>
        <div className="panel-footer">
          <h4>Sessions</h4>
					{
						sessions.map(({id, title}) => (
              <span id={id} style={{padding: 2}}>
                <p>{title}</p>
              </span>
            ))
					}
          <span>	
            <button	
              type="button"	
              className="btn btn-default btn-lg"	
              onClick={()=> {
                /* ---> Call useMutation's mutate function to mark speaker as featured */
              }}	
              >	
                <i	
                  className={`fa ${featured ? "fa-star" : "fa-star-o"}`}	
                  aria-hidden="true"	
                  style={{	
                    color: featured ? "gold" : undefined,	
                  }}	
                ></i>{" "}	
                Featured Speaker	
            </button>	
          </span>
        </div>
      </div>
    </div>
	));
};

const SpeakerDetails = () => {

  const { speaker_id } = useParams();

  const { loading, data, error } = useQuery(SPEAKER_BY_ID, {
    variables:{
      id: speaker_id,
    }
  });

  if(loading) return <p>Loading Soeakers...</p>

  if(error) return <p>Something went wrong!</p>

  const speaker = data.speakerById; 

  const { id, bio, name, title, sessions } = speaker;

  return (
    <div key={id} className="col-xs-12" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{name}</h3>
        </div>
        <div className="panel-body">
          <h5>{bio}</h5>
        </div>
        <div className="panel-footer">
          {
						sessions.map(session => {
              return (
                <span key={session.id}>
                  {session.title}
                </span>
              )
            })
					}
        </div>
      </div>
    </div>
  );
};

export function Speaker() {
  return (
    <>
      <div className="container">
        <div className="row">
          <SpeakerDetails />
        </div>
      </div>
    </>
  );
}


export function Speakers() {
  return (
    <>
      <div className="container">
        <div className="row">
          <SpeakerList />
        </div>
      </div>
    </>
  );
}

	
