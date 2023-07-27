import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

const formatName = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

const formatCountry = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

const formatPost = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState('');
  const [country, setCountry] = useState("");
  const [post, setPost] = useState("");
  const [years, setYears] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [employeesList, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees(); // Fetch employees when the component mounts
  }, []);

  const add = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      post: post,
      years: years
    })
    .then(() => {
      getEmployees();
      clearnFields();
      Swal.fire({
        title:"<strong>Successful registration! </strong>",
        html: "<i>The employee <strong>"+ name + "</strong> was loaded successfully!</i>",
        icon: 'success',
        timer: 3000
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while adding the employee. Please try again later.',
      });
    });
  }

  const update = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      name: name,
      age: age,
      country: country,
      post: post,
      years: years
    })
    .then(() => {
      getEmployees();
      clearnFields();
      Swal.fire({
        title:"<strong> Successful update! </strong>",
        html: "<i>The employee <strong>"+ name + "</strong> was updated  successfully!</i>",
        icon: 'success',
        timer: 3000
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while updating the employee. Please try again later.',
      });
    });
  }

  const deleteEmployee = (val) => {
    Swal.fire({
      title: 'Are you sure?',
      html: "<i>Do you want to delete <strong>"+ val.name + "</strong> ? </i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`, {})
        .then(() => {
          getEmployees();
          clearnFields();
          Swal.fire({
            icon: 'success',
            title: val.name+' was removed.',
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while deleting the employee. Please try again later.',
          });
        });
      }
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
    Axios.get('http://localhost:3001/employees')
    .then((response) => {
      setEmployees(response.data);
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while fetching employees. Please try again later.',
      });
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h4>Employee Management</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 col-12"> {/* Cambio de col-md-6 a col-md-4 y col-12 */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setName(formatName(event.target.value));
                  }}
                  className="form-control"
                  value={name}
                  placeholder="Enter name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter age"
                  id="age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setCountry(formatCountry(event.target.value));
                  }}
                  className="form-control"
                  value={country}
                  placeholder="Enter country"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="post" className="form-label">Post:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setPost(formatPost(event.target.value));
                  }}
                  className="form-control"
                  value={post}
                  placeholder="Enter post"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="years" className="form-label">Years of Experience:</label>
                <input
                  type="number"
                  className="form-control"
                  id="years"
                  value={years}
                  onChange={(event) => setYears(event.target.value)}
                />
              </div>
              <div className="text-body-secondary">
                {edit ? (
                  <div>
                    <button className='btn btn-warning m-2' onClick={update}>Update</button>
                    <button className='btn btn-info m-2' onClick={clearnFields}>Cancel</button>
                  </div>
                ) : (
                  <button className='btn btn-success' onClick={add}>Save Data</button>
                )}
              </div>
            </div>
            <div className="col-md-8 col-12"> {/* Cambio de col-md-6 a col-md-8 y col-12 */}
              {/* Table goes here */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
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
                              <button
                                type="button"
                                onClick={() => {
                                  deleteEmployee(val);
                                }}
                                className="btn btn-danger"
                              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;