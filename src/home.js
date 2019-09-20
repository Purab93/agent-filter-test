import React from 'react';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    render(){
        return(
            <div className="container">
                <Link to='/part1' >
                    <div className="btn">Part 1</div>
                </Link>
                <Link to='/part2' >
                    <div className="btn">Part 2</div>
                </Link>
            </div>
        );
    }
}  