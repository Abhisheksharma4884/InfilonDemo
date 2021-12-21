import React, { useEffect, useState } from 'react'
import { Table, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    const tableData = useSelector(state => state.tableData);
    const [EditRow, setEditRow] = useState(-1);

    useEffect(() => {
        dispatch({ type: "GET_TABLE_DATA" })
    }, [])

    // useEffect(() => {
    //     localStorage.setItem("tableData",JSON.stringify(tableData))
    // }, [tableData])

    const handleSave = (e) => {

    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map(user => {
                        return (
                            EditRow === user.id ?
                                <tr key={user.id}>
                                    <td>
                                        <img style={{ width: "30px", height: "30px", borderRadius: "5px", objectFit: "contain" }} src={user.avatar} alt="avatar" />
                                    </td>
                                    <td>
                                        <FormControl type="text" placeholder="Normal text" 
                                        defaultValue={user.first_name} />
                                    </td>
                                    <td>
                                        <FormControl type="text" placeholder="Normal text" 
                                        defaultValue={user.last_name} />
                                    </td>
                                    <td>
                                        <FormControl type="text" placeholder="Normal text" 
                                        defaultValue={user.email} />
                                    </td>
                                    <td>
                                        <Button onClick={(e) => handleSave(e)} variant="primary">Save</Button>{' / '}
                                        <Button variant="primary">Delete</Button>
                                    </td>
                                </tr>
                                :
                                <tr key={user.id}>
                                    <td>
                                        <img style={{ width: "30px", height: "30px", borderRadius: "5px", objectFit: "contain" }} src={user.avatar} alt="avatar" />
                                    </td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button onClick={() => setEditRow(user.id)} variant="primary">Edit</Button>{' / '}
                                        <Button variant="primary">Delete</Button>
                                    </td>
                                </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
