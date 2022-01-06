import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import DefaultAvt from "@/components/img/DefaultAvt.png";
import {
  Button,
  Card,
  Icon,
  Form,
  Checkbox,
  Container,
  Table,
  Label,
  Image,
  Grid,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./home.scss";

const getFormattedDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [inputId, setInputId] = useState("");

  const submitHandler = async (id) => {
    window.location.pathname = "/" + id;
  };
  useEffect(() => {
    let id = "00";
    if (window.location.pathname.split("/")[1].length > 0) {
      id = window.location.pathname.split("/")[1];
    }
    db.collection("vaccine_passport")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const document = snapshot.data();
          setUserData(document);
        } else {
          setUserData(null);
        }
      });
  }, []);

  return (
    <div className="home">
      <a href="#" className="float">
        <Icon name="arrow up" />
      </a>
      <Container style={{ marginBottom: "100px" }}>
        <h1
          id="home"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          Vaccine Passport Project
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="src/components/img/vaccination.png"></img>
        </div>
      </Container>
      {/* <-----------------Search by ID-------------------> */}
      <Container className="home__container">
        <Form onSubmit={() => submitHandler(inputId)}>
          <Form.Field>
            <label>Search by ID</label>
            <input
              placeholder="0123456789"
              value={inputId}
              onChange={(e) => {
                setInputId(e.target.value);
              }}
            />
          </Form.Field>
          <Button
            style={{ display: "flex", justifyContent: "center" }}
            type="submit"
          >
            Search
          </Button>
        </Form>
      </Container>

      {/* <-----------------Vaccine Status-------------------> */}
      {userData == null ? (
        <div className="home__data">
          <h2>Not Found</h2>
        </div>
      ) : (
        <div className="home__data">
          <h1
            id="vaccine-status"
            className="section__title"
            style={{ textAlign: "center" }}
            id="vaccine-status"
          >
            Vaccine Status
          </h1>

          <Image
            style={{ height: "200px", width: "200px" }}
            src={userData.avatar != null ? userData.avatar : DefaultAvt}
          />

          <h2>{userData.name}</h2>

          <Table style={{ width: "50%" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ width: "4" }}>
                  Vaccinated?
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "4" }}>
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "4" }}>
                  Dose(s)
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell style={{ width: "30rem" }}>
                  {userData.recovered == true ? (
                    <span>
                      <Icon style={{ color: "blue" }} name="check circle" />
                    </span>
                  ) : userData.doses == 2 ? (
                    <span>
                      <Icon style={{ color: "green" }} name="check circle" />
                    </span>
                  ) : userData.doses != 1 ? (
                    <span>
                      <Icon style={{ color: "red" }} name="cancel" />
                    </span>
                  ) : (
                    <span>
                      <Icon
                        style={{ color: "orange" }}
                        name="exclamation triangle"
                      />
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell style={{ width: "40rem" }}>
                  {userData.recovered == true ? (
                    <span>
                      <p> Recovered from COVID</p>
                    </span>
                  ) : userData.doses == 2 ? (
                    <span>
                      <p> Fully vaccinated</p>
                    </span>
                  ) : userData.doses != 1 ? (
                    <span>
                      <p> Not vaccinated</p>
                    </span>
                  ) : (
                    <span>
                      <p> Not fully vaccinated</p>
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell style={{ width: "30rem" }}>
                  {userData.doses}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          {/* <-----------------Personal Information-------------------> */}

          <h1 className="section__title" id="contact">
            Emergency Contact
          </h1>

          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <h3>Full name</h3>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{userData.name}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                <h3>Gender</h3>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{userData.gender == "M" ? "Male" : "Female"}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                <h3>Date of Birth</h3>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{getFormattedDate(userData.dob)}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                <h3>Address</h3>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{userData.address}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                <h3>Phone Number</h3>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{userData.phone}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Home;
