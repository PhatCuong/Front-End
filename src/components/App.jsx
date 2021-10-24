import React from "react";
import Header from "@/components/commons/Header";
import { Switch, Route } from "react-router-dom";
import { routes } from "@/configs";
import "./app.scss";
import Footer from "./pages/footer/Footer";
import Topbar from "./pages/topbar/Topbar";

const App = () => {
    return (
        <div>
            <Topbar />
            <Header />
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        exact
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Switch>
            <Footer />
        </div>
    );
};

export default App;
