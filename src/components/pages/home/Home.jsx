import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
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
import faker from "faker";
import "semantic-ui-css/semantic.min.css";
import "./home.scss";

const getFormattedDate = (date) => {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
};

const Home = () => {
  const [userData, setUserData] = useState({});
  const fetchData = () => {
    db.collection("vaccine_passport")
      .doc("1634463353623")
      .get()
      .then((snapshot) => {
        const document = snapshot.data();
        // do something with document
        setUserData(document);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      {/* <-----------------Search by ID-------------------> */}
      <Container className="home__container">
        <Form>
          <Form.Field>
            <label>Search by ID</label>
            <input
              placeholder="0123456789"
              //   value={newData.description}
              //   onChange={(e) => {
              //     setNewData((pre) => {
              //       return {
              //         ...pre,
              //         description: e.target.value,
              //       };
              //     });
              //   }}
            />
          </Form.Field>
          <Button type="Search">Search</Button>
        </Form>
      </Container>

      {/* <-----------------Vaccine Status-------------------> */}

      <div className="home__data">
        <h1
          className="section__title"
          style={{ textAlign: "center" }}
          id="vaccine_status"
        >
          Vaccine Status
        </h1>

        <Image src={faker.image.avatar()} />

        <h2> {userData.name} </h2>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vaccinated?</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Dose(s)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {userData.doses == 2 ? (
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
              <Table.Cell>
                {userData.doses == 2 ? (
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
              <Table.Cell>{userData.doses}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        {/* <-----------------Personal Information-------------------> */}

        <h1 className="section__title" id="info">
          Personal Information
        </h1>

        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <h3>Full name</h3>
            </Grid.Column>
            <Grid.Column width={13}>
              <p>{userData.name}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <h3>Date of Birth</h3>
            </Grid.Column>
            <Grid.Column width={13}>
              <p>{userData.name}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <h3>Address</h3>
            </Grid.Column>
            <Grid.Column width={13}>
              <p>{userData.address}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <h3>Phone Number</h3>
            </Grid.Column>
            <Grid.Column width={13}>
              <p>{userData.phoneNumber}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
