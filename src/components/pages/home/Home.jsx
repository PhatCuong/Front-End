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
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
};

const generateData = (num) => {
    Array(num)
        .fill(0)
        .forEach((i) => {
            const fakeData = {
                name: faker.name.findName(),
                avatar: faker.image.avatar(),
                address: faker.address.city(),
                dob: faker.date.past(),
                doses: faker.datatype.number({
                    min: 0,
                    max: 2,
                }),
                phone: faker.phone.phoneNumber("09#########"),
            };
            db.collection("vaccine_passport").add(fakeData);
        });
};

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [inputId, setInputId] = useState("upxaCgbNglWU3YNLFT9s");

    const submitHandler = async () => {
        db.collection("vaccine_passport")
            .doc(inputId)
            .get()
            .then((snapshot) => {
                console.log(snapshot.exists);
                if (snapshot.exists) {
                    const document = snapshot.data();
                    setUserData(document);
                } else {
                    console.log("notFound");
                    setUserData(null);
                }
            });
    };
    useEffect(() => {
        // add generate here if needed
        // generateData(3);
        submitHandler();
    }, []);

    return (
        <div className="home">
            {/* <-----------------Search by ID-------------------> */}
            <Container className="home__container">
                <Form onSubmit={submitHandler}>
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
                    <Button type="submit">Search</Button>
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
                        className="section__title"
                        style={{ textAlign: "center" }}
                        id="vaccine_status"
                    >
                        Vaccine Status
                    </h1>

                    <Image src={userData.avatar} />

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
                                            <Icon
                                                style={{ color: "green" }}
                                                name="check circle"
                                            />
                                        </span>
                                    ) : userData.doses != 1 ? (
                                        <span>
                                            <Icon
                                                style={{ color: "red" }}
                                                name="cancel"
                                            />
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
                                <p>{getFormattedDate(userData.dob)}</p>
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
