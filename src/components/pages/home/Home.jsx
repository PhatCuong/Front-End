import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
    Button,
    Card,
    Icon,
    Form,
    Checkbox,
    Container,
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
    const [userData, setUserData] = useState([]);
    const [newData, setNewData] = useState({
        name: "",
        dob: "",
        doses: 0,
        location: "",
        phoneNumber: "",
        address: "",
    });

    const fetchData = () => {
        db.collection("vaccine_passport")
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                for (let i = 0; i < data.length; i++) {
                    data[i].avt = faker.image.avatar();
                }
                setUserData(data); // array of cities objects
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const removeData = (item) => {
        setUserData((pre) => {
            return pre.filter((i) => i !== item);
        });
    };
    return (
        <div className="home">
            <Container className="home__container">
                <Form>
                    <Form.Field>
                        <label>Location</label>
                        <input
                            placeholder="Ho Chi Minh city"
                            value={newData.description}
                            onChange={(e) => {
                                setNewData((pre) => {
                                    return {
                                        ...pre,
                                        description: e.target.value,
                                    };
                                });
                            }}
                        />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
            
            <div className="home__data">
                {userData.map((user, index) => (
                    <Card
                        key={user.id}
                        className="home__card"
                        image={user.avt}
                        header={user.name}
                        meta={getFormattedDate(user.dob)}
                        description={
                            <div>
                                <div>Vaccine location: {user.location}</div>
                                <div>Dose(s): {user.doses}</div>
                                <div>Phone Number: {user.phoneNumber}</div>
                                <div>Address: {user.address}</div>
                            </div>
                        }    
                        extra={
                            <div>
                                {user.doses == 2 ? (
                                    <span>
                                    <Icon
                                        style={{ color: "green" }}
                                        name="check circle"
                                    />
                                    Fully vaccinated
                                </span>
                                ) : (
                                    user.doses != 1 ? (
                                        <span>
                                            <Icon
                                                style={{ color: "red" }}
                                                name="cancel"
                                            />
                                            Not fully vaccinated
                                        </span>
                                        ) : (
                                            <span>
                                            <Icon
                                                style={{ color: "orange" }}
                                                name="exclamation triangle"
                                            />
                                            Not fully vaccinated
                                        </span>
                                        )
                                )}
                               <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                <Button style = {{paddingRight : "10px", paddingLeft: "10px"}}
                                    onClick={() => {
                                        db.collection("vaccine_passport")
                                            .doc(user.id)
                                            .delete()
                                            .then(() => {
                                                console.log(success);
                                                fetchData();
                                            });
                                    }}>
                                    <Icon name="user cancel" />
                                </Button>
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
