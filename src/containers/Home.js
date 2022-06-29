import React, { Component } from 'react'
import {Outlet } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                Hola soy el Home
                <Outlet />
            </div>
        )
    }
}