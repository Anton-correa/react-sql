import React, {Component} from 'react';
import Mysql from 'mysql';
import Window from './data.json';

function Person(props){
    return (
      <div>
        <h3>{props.person.name}, {props.person.title}</h3>

        <p>
          <img
            className=" size-medium alignright"
            src={props.person.img}
            alt={props.person.name}
            width="300"
            height="300"
            sizes="(max-width: 300px) 100vw, 300px"
          />
          {props.person.bio}
        </p>
      </div>
    );
}

function People(props){
    return(
        <div >
            {props.people.map(function(person) {
                return(<Person key={person.id} person={person}/>)
            })}
        </div>
    );
}

function Filters(props) {

    function updateName(evt) {
        props.updateFormState("currentName", evt.target.value)
    }
    function updateTitle(evt) {
        props.updateFormState("currentTitle", evt.target.value)
    }
    function updateIntern(evt) {
        props.updateFormState("isIntern", evt.target.checked)
    }


    return (
      <form action="" id="directory-filters">
        <div className="group">
          <label htmlFor="person-name">Name:</label>
          <input
            type="text"
            name="name"
            value=""
            placeholder="Name of employee"
            id="person-name"
            value={props.currentName}
            onChange={updateName}
          />
        </div>
        <div className="group">
          <label htmlFor="sel-title">Job Title:</label>
          <select name="sel-title" id="sel-title" value={props.currentTitle} onChange={updateTitle}>
            <option value="">- Select -</option>
            <option value="architect">Architect</option>
            <option value="designer">Designer</option>
            <option value="contractor">Contractor</option>
            <option value="staff">Support Staff</option>
          </select>
        </div>
        <div className="group">
          <label>
            <input type="checkbox"name="person_intern" value="1" checked={props.isIntern} onChange={updateIntern}/> Intern
          </label>
        </div>
      </form>
    );
}

class Listsql extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryR: null,
      people: Window,
      currentName: "",
      currentTitle: "",
      isIntern: false
    };
    this.updateFormState = this.updateFormState.bind(this);
    
  }

  updateFormState(name, val) {
    this.setState({
      [name]: val
    }, this.updatePeopleList);
  }

  updatePeopleList() {
    var filteredPeople = Window.filter(
      function(person) {
        return (
          person.intern === this.state.isIntern &&
          (this.state.currentName === "" ||
            person.name
              .toLowerCase()
              .indexOf(this.state.currentName.toLowerCase()) !== -1) &&
          (this.state.currentTitle === "" ||
            person.title_cat === this.state.currentTitle)
        );
      }.bind(this)
    );
    this.setState({
        people: filteredPeople
    });
  }
  /*componentDidMount() {
    const con = Mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "testdb"
    })
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT Nombre FROM users", function (err, result, fields) {
            if (err) throw err;
            this.setState({
                queryR: result
            })
            console.log(result);
            console.log(this.queryR)
          });
        console.log("Connected!");
      });
}*/
  render() {
    /*const list = this.queryR.map(items, key => {
            <td>{items}</td>
        })*/
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Names</th>
            </tr>
          </thead>
          <tbody>
            <tr />
          </tbody>
        </table>
        <People people={this.state.people} />
        <Filters
          currentName={this.state.currentName}
          currentTitle={this.state.currentTitle}
          isIntern={this.state.isIntern}
          updateFormState={this.updateFormState}
        />
      </div>
    );
  }
}

export default Listsql;