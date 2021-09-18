import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function ProfRoute( {component: Component, ...rest}) {

    const type = localStorage.getItem("user_type")
    return (
        <Route
      {...rest}
      render={props => {
        return type ==="PROFESSOR" ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
    )
}
