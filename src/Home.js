import React, { useEffect, useState } from 'react'
import { Table, Button, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import './Home.scss'

export default function Home () {
  const dispatch = useDispatch()
  const tableDataAsync = useSelector(state => state.tableData)
  const [TableData, setTableData] = useState(tableDataAsync)
  const [EditRow, setEditRow] = useState(-1)

  useEffect(() => {
    dispatch({ type: 'GET_TABLE_DATA' })
  }, [])

  useEffect(() => {
    const tabledata = JSON.parse(localStorage.getItem('tableData'))
    if (tabledata) {
      setTableData(tabledata)
    } else {
      setTableData(tableDataAsync)
    }
  }, [tableDataAsync])

  const handleSave = (e, userId) => {
    const newData = [...TableData]
    const editUser = TableData.find(user => user.id === userId)
    editUser[e.target.name] = e.target.value
    newData[newData.findIndex(user => user.id === userId)] = editUser
    setTableData(newData)
    localStorage.setItem('tableData', JSON.stringify(newData))
  }

  const handleDelete = (userId) => {
    const newData = [...TableData]
    console.log(newData, newData.findIndex(user => user.id === userId))
    newData.splice(newData.findIndex(user => user.id === userId), 1)
    setTableData(newData)
    localStorage.setItem('tableData', JSON.stringify(newData))
  }

  const handleReset = () => {
    setTableData(tableDataAsync)
    localStorage.setItem('tableData', JSON.stringify(tableDataAsync))
  }

  const renderTable = (user) => {
    return (
      EditRow === user.id
        ? <tr key={user.id}>
          <td>
            <img className='user-avatar' src={user.avatar} alt="avatar" />
          </td>
          <td>
            <FormControl type="text" placeholder="Normal text" name="first_name"
              defaultValue={user.first_name} onChange={e => handleSave(e, user.id)} />
          </td>
          <td>
            <FormControl type="text" placeholder="Normal text" name="last_name"
              defaultValue={user.last_name} onChange={e => handleSave(e, user.id)} />
          </td>
          <td>
            <FormControl type="text" placeholder="Normal text" name="email"
              defaultValue={user.email} onChange={e => handleSave(e, user.id)} />
          </td>
          <td>
            <Button onClick={() => setEditRow(-1)} variant="primary">Save</Button>{' / '}
            <Button variant="primary">Delete</Button>
          </td>
        </tr>
        : <tr key={user.id}>
          <td>
            <img className='user-avatar' src={user.avatar} alt="avatar" />
          </td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td>
            <Button onClick={() => setEditRow(user.id)} variant="primary">Edit</Button>{' / '}
            <Button onClick={() => handleDelete(user.id)} variant="primary">Delete</Button>
          </td>
        </tr>
    )
  }

  return (
    <div className='home-wrapper'>
      <h2>User Details</h2>
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
            {
              TableData?.map(user => {
                return renderTable(user)
              })
            }
          </tbody>
        </Table>
      </div>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  )
}
