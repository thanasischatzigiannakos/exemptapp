import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function StudentRoute( {component: Component, ...rest}) {

    const signedIn = localStorage.getItem("user_id")
    return (
        <Route
      {...rest}
      render={props => {
        return signedIn !== null  ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
    )
}
