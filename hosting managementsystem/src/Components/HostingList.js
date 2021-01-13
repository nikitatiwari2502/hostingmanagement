import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "react-datepicker/dist/react-datepicker.css";


class HostingList extends Component {
  state = {
    
    domainName: "",
        clientName: "",
        email: "",
        ipAddress: "",
        status: "",
        setupDate: "",
        provider: "",
        isSaved: "",
        fields : {},
    errors: {},
    showModal : false,
    formIsValid: "",
    isEditView: false,
    isLogin: false,

    SampleData: [
      {
        id: 1,
        domainName: "abc",
        clientName: "Nikita",
        provider: "test",
        ipAddress: "harda",
        setupDate: "10/12/13",
        email: "abc@gmail.com",
        status: "active",
      },
      {
        id: 2,
        domainName: "abc",
        clientName: "Nikita",
        provider: "test",
        ipAddress: "harda",
        setupDate: "10/12/13",
        email: "abc@gmail.com",
        status: "active",
      },
      {
        id: 3,
        domainName: "abc",
        clientName: "Nikita",
        provider: "test",
        ipAddress: "harda",
        setupDate: "10/12/13",
        email: "abc@gmail.com",
        status: "active",
      },
    ],
  };
  close =(e)=> {
    this.setState({showModal : false });
  }

  open =(e)=> {
    this.setState({ showModal: true });
  }

  handleSave = (e) => {
    this.addNewEntry(this.state);

    this.setState({
      [e.target.name]: "" 
    })
    };
   

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      });
    
  };
  resetValue=(e) =>{
    this.setState({
      
      });
  }
  handleAdd = (e) => {
   
     this.setState({
      showModal: true,
    });
   
    
  };
  handleEdit = (e) => {

  //  updatedEntry = e.target.value

    let list = this.state.SampleData

    let upadtedList= list.map(item=>{console.log(item)})
   
  };

  UpdateComponentValue = () => {
    let SampleData = this.refs.theTextInput.value;
    this.setState({
      SampleData: SampleData,
    });
  };

  addNewEntry = (entry) => {
    
    let SampleData = [...this.state.SampleData, entry];
    this.validateForm(entry);
    entry.id = Math.random();
    if (this.state.formIsValid)
     {
      this.setState({
        id: Math.random(),
        SampleData: SampleData,
        showModal: !this.state.showModal,
      });
    }
    this.resetValue()
};
  handleDelete = (id) => {
    
    let SampleData = this.state.SampleData.filter((data) => {
      return data.id !== id;
    });
    this.setState({
      SampleData: SampleData,
    });
  };
  validateForm(SampleData) {
    
    
    
    let fields = {SampleData};
    let errors = {};
    let formIsValid = true;
    
    
    if (!SampleData["domainName"]) {
      formIsValid = false;
      errors["domainName"] = "*Please enter Domain name.";
    }

    if (!SampleData["clientName"]) {
      formIsValid = false;
      errors["clientName"] = "*Please enter client name.";
    }

    if (!SampleData["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter email-ID.";
    }

    if (typeof SampleData["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(SampleData["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }
    if (!SampleData["ipAddress"]) {
      formIsValid = false;
      errors["ipAddress"] = "*Please enter IP-address.";
    }
    if (!SampleData["provider"]) {
      formIsValid = false;
      errors["provider"] = "*Please select the provider.";
    }
    if (!SampleData["status"]) {
      formIsValid = false;
      errors["status"] = "*Please select the status.";
    }
    
    
    this.setState({
      errors: errors,
      formIsValid: formIsValid
     });
    return (formIsValid);
  }

  renderData = (data, index) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.domainName}</td>
        <td>{data.clientName}</td>
        <td>{data.provider}</td>
        <td>{data.ipAddress}</td>
        <td>{data.email}</td>
        <td>{data.status}</td>
        <td>{data.setupDate}</td>

        <td>
          <Button
            onClick={() => {
              this.handleEdit(data.id);
            }}
          >
            edit
          </Button>
          <Button
            onClick={() => {
              this.handleDelete(data.id);
            }}
          >
            delete
          </Button>
        </td>
      </tr>
    );
  };
  render() {
    return (
      
      <div>
      
        <div align="center">
          <h1>Hosting Management System </h1>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Domain Name</th>
              <th>Client Name</th>
              <th>Provider</th>
              <th>IPAddress</th>

              <th>EMail</th>
              <th>Status</th>
              <th>Setup Date</th>
              <th>
                <Button onClick={() =>{this.handleAdd()}}> Add </Button>
              </th>
            </tr>
          </thead>
          <tbody>{this.state.SampleData.map(this.renderData)}</tbody>
        </Table>
        {this.state.showModal ? (
          
          <div>
           

            <Modal show={this.state.showModal} onHide={this.handleSave}>
              <Modal.Header>
                <Modal.Title>Add New User</Modal.Title>
                <Button onClick={() =>this.close()}>X</Button>
              </Modal.Header>
              <Modal.Body>
                <Container className="FormContainer" onSubmit={this.handleSave}>
                  <Form onSubmit={this.handleSave}>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridDomainName">
                        <Form.Label>Domain Name</Form.Label>
                        <Form.Control
                           
                          type="text"
                          name="domainName"
                          placeholder="Enter Domain name"
                          value={this.state.fields.domainName}
                          onChange={this.handleChange}
                        />
                        <div className="errorMsg">
                          {this.state.errors.domainName}
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridClientName">
                        <Form.Label>Client Name</Form.Label>
                        <Form.Control
                          name="clientName"
                          type="text"
                          value={this.state.fields.clientName}
                          placeholder="Enter client Name"
                          onChange={this.handleChange}
                        />
                        <div className="errorMsg">
                          {this.state.errors.clientName}
                        </div>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          value={this.state.fields.email}
                          onChange={this.handleChange}
                        />
                        <div className="errorMsg">
                          {this.state.errors.email}
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridIPAddress">
                        <Form.Label>IP-Address</Form.Label>
                        <Form.Control
                          name="ipAddress"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.fields.ipAddress}
                          placeholder=" Enter IPAddress"
                        />
                        <div className="errorMsg">
                          {this.state.errors.ipAddress}
                        </div>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridProvider">
                        <Form.Label>Provider</Form.Label>
                        <Form.Control
                          name="provider"
                          as="select"
                          defaultValue="Choose..."
                          value={this.state.fields.provider}
                          onChange={this.handleChange}
                        >
                          <option>Choose...</option>
                          <option>Iweb</option>
                          <option>Buzinessware</option>
                          <option>Inmotion</option>
                        </Form.Control>
                        <div className="errorMsg">
                          {this.state.errors.provider}
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          name="status"
                          as="select"
                          onChange={this.handleChange}
                          defaultValue="Choose..."
                          value={this.state.fields.status}
                        >
                          <option>Choose...</option>
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>Suspended</option>
                        </Form.Control>
                        <div className="errorMsg">
                          {this.state.errors.status}
                        </div>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          name="setupDate"
                          type="date"
                          onChange={this.handleChange}
                          placeholder=" Enter Date"
                          value={this.state.fields.date}
                        />
                         <div className="errorMsg">
                          {this.state.errors.date}
                        </div>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label></Form.Label>
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleSave}>Submit</Button>
              </Modal.Footer>
            </Modal>
            )}
           
          </div>
        
        ) : (
          ""
          )}
        </div>
    );
  }
}

export default HostingList;
