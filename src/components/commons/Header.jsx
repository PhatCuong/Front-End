import React from 'react'
import { Container, Header as AppHeader } from 'semantic-ui-react'

const Header = () => (
  <Container style={{marginBottom: "100px"}}>
    
    <h1 style={{display: "flex", justifyContent: "center", marginTop: "50px"}}
        >Vaccine Passport Project
    </h1>

    <a style={{display: "flex", justifyContent: "center"}}>
      A project is held by Nguyen Cuong Phat student of Computer Science department of Vietnamses - German Univerisity
    </a>
  </Container>
)

export default Header;
