import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [country, setCountry] = useState("");
  const [post, setPost] = useState("");
  const [years, setYears] = useState();
  const [id, setId] = useState();


  const [edit, setEdit] = useState(false);

  const [employeesList, setEmployees] = useState([]);

  const add = () => {
    Axios.post('http://localhost:3001/create',{
      name: name,
      age: age,
      country: country,
      post: post,
      years: years
    }).then(() => {
      getEmployees();
      clearnFields();
      Swal.fire({
        title:"<strong>Successful registration! </strong>",
        html: "<i>The employee <strong>"+ name + "</strong> was loaded successfully!</i>",
        icon: 'success',
        timer: 3000
      })
    });
  }

  const update = () => {
    Axios.put('http://localhost:3001/update',{
      id: id,
      name: name,
      age: age,
      country: country,
      post: post,
      years: years
    }).then(() => {
      getEmployees();
      clearnFields();
      Swal.fire({
        title:"<strong> successful update! </strong>",
        html: "<i>The employee <strong>"+ name + "</strong> was updated  successfully!</i>",
        icon: 'success',
        timer: 3000
      })
    });
  }

  const clearnFields = () => {
    setYears("");
    setName("");
    setPost("");
    setAge("");
    setCountry("");
    setId("");
    setEdit(false);
  }

  const editEmployye = (val) => {
    setEdit(true);

    setName(val.name);
    setAge(val.age);
    setPost(val.post);
    setCountry(val.country);
    setName(val.name);
    setYears(val.years);
    setId(val.id);


}

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployees(response.data);
    });
  };

  getEmployees();

  return (
    <div className="container">
    <div className="card text-center">
      <div className="card-header">
        Employee management 
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Name: </span>
          <input type="text" 
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="form-control" value={name} placeholder="Enter name" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Age:</span>
          <input type="number" value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
          className="form-control" placeholder="Enter an age" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Country: </span>
          <input type="text" value={country}
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          className="form-control" placeholder="Enter a country" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Post: </span>
          <input type="text" value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
          className="form-control" placeholder="Enter a post" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Years of experience: </span>
          <input type="number" value={years}
          onChange={(event) => {
            setYears(event.target.value);
          }}
          className="form-control"  placeholder="Enter years" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

      </div>
      <div className="card-footer text-body-secondary">
        {
          edit? 
          <div>
            <button className='btn btn-warning m-2' onClick={update}>Update</button>
            <button className='btn btn-info m-2' onClick={clearnFields}>Cancel</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Save data</button>
        }

      </div>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Country</th>
          <th scope="col">Post</th>
          <th scope="col">Experience</th>
          <th scope="col">Action</th>


        </tr>
      </thead>
      <tbody>
        {employeesList.map((val, key) => {
          return (
            <tr key={val.id}>
              <th> {val.id} </th>
              <td> {val.name} </td>
              <td> {val.age} </td>
              <td> {val.country} </td>
              <td> {val.post} </td>
              <td> {val.years} </td>
              <td>
                {/* Move the buttons here */}
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    onClick={() => {
                      editEmployye(val);
                    }}
                    className="btn btn-info"
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default App;
