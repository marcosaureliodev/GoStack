import React from 'react';

export default function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}

/* // função pode ser importada tanto no final quando no início pois o resultado vai ser o mesmo
export default header; */