import React, {Component} from 'react';

class Navbar extends Component {
    
    render(){
        return (
          <div>
            <nav>
              <div className="nav-wrapper">
                <a className="brand-logo">
                  SQL Exec
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>
                    <a >Sass</a>
                  </li>
                  <li>
                    <a >Components</a>
                  </li>
                  <li>
                    <a >JavaScript</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        );
    }
}

export default Navbar;
