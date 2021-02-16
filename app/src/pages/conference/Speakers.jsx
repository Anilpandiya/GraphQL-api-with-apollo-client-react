import * as React from "react";
import "./style-sessions.css";

/* ---> Define queries, mutations and fragments here */

const SpeakerList = () => {

  /* ---> Replace hardcoded speaker values with data that you get back from GraphQL server here */
  const featured = false;

  return (
		<div
      key={'id'}
      className="col-xs-12 col-sm-6 col-md-6"
      style={{ padding: 5 }}
    >
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{'Speaker: '}</h3>
        </div>
        <div className="panel-body">
          <h5>{'Bio: ' }</h5>
        </div>
        <div className="panel-footer">
          <h4>Sessions</h4>
					{
						/* ---> Loop through speaker's sessions here */
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
	);
};

const SpeakerDetails = () => {

    /* ---> Replace hardcoded speaker values with data that you get back from GraphQL server here */
  return (
    <div key={'id'} className="col-xs-12" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{'name'}</h3>
        </div>
        <div className="panel-body">
          <h5>{'bio'}</h5>
        </div>
        <div className="panel-footer">
          {{
						/* ---> Loop through speaker's sessions here */
					}}
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

	
