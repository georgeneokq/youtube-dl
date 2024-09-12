import React from "react"

interface Props {
    show: boolean;
}

export default function Spinner({ show }: Props) {

    const styleShow = {};
    const styleHide = {display: 'none'};

    return (
       <img src={require('../../public/img/spinner.gif')} id="spinner" style={show ? styleShow : styleHide} />
    )
}