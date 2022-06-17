import React from "react";
import {Link} from "react-router-dom";
import  '../Pages/acc-reg.css'
import PropTypes from "prop-types";

const ResList = ({reses}) => {
    return (
        <div>
            {reses.map(e => {
                return (
                        <div key={e.id}>
                            <p>{e.user_id}</p>
                            <p >{e.audience_id}</p>
                            <p >{e.title}</p>
                            <p >{e.from_date}</p>
                            <p >{e.to_date}</p>
                            <Link className="signUp_button" key={e.id} to={`/reses/${e.id}`}>View res</Link>
                        </div>
                );
            })}
        </div>
    );
};

ResList.propTypes = {
    reses: PropTypes.array
};

export default ResList;