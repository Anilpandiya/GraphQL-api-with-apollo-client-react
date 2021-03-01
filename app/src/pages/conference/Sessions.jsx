import React, {useState} from "react";  
import "./style-sessions.css";
import { Link } from "react-router-dom"
import { Formik, Field, Form } from "formik";
import { gql, useQuery } from "@apollo/client";

/* ---> Define queries, mutations and fragments here */

//Fragment
const SESSIONS_ATTRIBUTES = gql `
  fragment SessionInfo on Session {
      id
      title
      day
      startsAt
      room
      level
      speakers{
        id
        name
      }
  }
`
// Aliases example with fragments

const SESSIONS = gql`
  query sessions($day: String!) {
    intro: sessions(day: $day, level: "Introductory and overview") {
      ...SessionInfo
    }
    intermediate: sessions(day: $day, level: "Intermediate") {
      ...SessionInfo
    }
    advanced: sessions(day: $day, level: "Advanced") {
      ...SessionInfo
    }
  }
  ${SESSIONS_ATTRIBUTES}
`;

function AllSessionList() {
   /* ---> Invoke useQuery hook here to retrieve all sessions and call SessionItem */
   return <SessionItem />
}

function SessionList ({ day }) {
  if(day === '') day = "Wednesday";
  const { loading, data, error } = useQuery(SESSIONS, {
    variables: { day }
  });
  
  if(loading) return <p>Loading sessions....</p>

  if(error) return <p>Something went wrong</p>

  const results = [];

  results.push(data.intro.map(session => (
    <SessionItem
      key={session.id}
      session={{
        ...session
      }}
    />
  )));

  results.push(data.intermediate.map(session => (
    <SessionItem
      key={session.id}
      session={{
        ...session
      }}
    />
  )));

  results.push(data.advanced.map(session => (
    <SessionItem
      key={session.id}
      session={{
        ...session
      }}
    />
  )));


  return results;
}

function SessionItem({session}) {
  const { id, title, day, room, level, startsAt, speakers } = session;

  /* ---> Replace hard coded session values with data that you get back from GraphQL server here */
  return (
    <div key={id} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
          <h5>{`Level: ${level} `}</h5>
        </div>
        <div className="panel-body">
          <h5>{`Day: ${day} `}</h5>
          <h5>{`Room Number: ${room}`}</h5>
          <h5>{`Starts At: ${startsAt} `}</h5>
        </div>
        <div className="panel-footer">
          {speakers.map(({id, name}) => [
            <span key={id} style={{padding:2}}>
              <Link to={`/conference/speaker/${id}`}>
                view {name}'s profile
              </Link>
            </span>
          ])
          }
        </div>
      </div>
    </div>
  );
}

export function Sessions() {

  const [day, setDay] = useState("");
  return (
    <>
      <section className="banner">
        <div className="container">
        <div className="row" style={{ padding: 10 }}>	
            <Link	
              className="btn btn-lg center-block"	
              to={`/conference/sessions/new`}	
            >	
              Submit a Session!	
            </Link>	
          </div>
          <div className="row">
          <button type="button" onClick={() => setDay('All')} className="btn-oval">
              All Sessions
            </button >
            <button type="button" onClick={() => setDay('Wednesday')} className="btn-oval">
              Wednesday
            </button>
            <button type="button"  onClick={() => setDay('Thursday')} className="btn-oval">
              Thursday
            </button>
            <button type="button" onClick={() => setDay('Friday')} className="btn-oval">
              Friday
            </button >
          </div>
          { day !== 'All' && <SessionList day={day} />}
          { day === 'All' && <AllSessionList /> }
        </div>
      </section>
    </>
  );
}

export function SessionForm() {	

  /* ---> Call useMutation hook here to create new session and update cache */

  return (	
    <div	
      style={{	
        width: "100%",	
        display: "flex",	
        alignContent: "center",	
        justifyContent: "center",	
        padding: 10,	
      }}	
    >	
      <Formik	
        initialValues={{	
          title: "",	
          description: "",	
          day: "",	
          level: "",	
        }}	
        onSubmit={() => {
          /* ---> Call useMutation mutate function here to create new session */
        }}	
      >	
        {() => (	
          <Form style={{ width: "100%", maxWidth: 500 }}>	
            <h3 className="h3 mb-3 font-weight-normal">Submit a Session!</h3>	
            <div className="mb-3" style={{ paddingBottom: 5 }}>	
              <label htmlFor="inputTitle">Title</label>	
              <Field	
                id="inputTitle"	
                className="form-control"	
                required	
                autoFocus	
                name="title"	
              />	
            </div>	
            <div className="mb-3" style={{ paddingBottom: 5 }}>	
              <label htmlFor="inputDescription">Description</label>	
              <Field	
                type="textarea"	
                id="inputDescription"	
                className="form-control"	
                required	
                name="description"	
              />	
            </div>	
            <div className="mb-3" style={{ paddingBottom: 5 }}>	
              <label htmlFor="inputDay">Day</label>	
              <Field	
                name="day"	
                id="inputDay"	
                className="form-control"	
                required	
              />	
            </div>	
            <div className="mb-3" style={{ paddingBottom: 5 }}>	
              <label htmlFor="inputLevel">Level</label>	
              <Field	
                name="level"	
                id="inputLevel"	
                className="form-control"	
                required	
              />	
            </div>	
            <div style={{ justifyContent: "center", alignContent: "center" }}>
              <button className="btn btn-primary">Submit</button>	
            </div>
          </Form>	
        )}	
      </Formik>	
    </div>	
  );	
}

export function AddSession() {	
  return (	
    <>	
      <section className="banner">	
        <div className="container">	
          <div className="row">	
            <SessionForm />	
          </div>	
        </div>	
      </section>	
    </>	
  );	
}
