import React, { useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function UsuarioNuevo () {
  const [usuario, setUsuario] = useState([])

  const [inUpdated, setInUpdated] = useState(false)

  const formRef = useRef(null)

  //GET USUARIO
  useEffect(() => {
    const getUsuario = () => {
        fetch('http://localhost:4000/api/usuario')
        .then(res => res.json())
        .then(data=>{
            setUsuario(data)
          })
    }
    getUsuario()

  },[])

    //FUNCIÓN PARA ELIMINAR UN USUARIO
    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:4000/api/usuario/' + id, requestInit)
        .then(res => res.text()) 
        .then(res => console.log(res))
    
        setInUpdated(true)
      }

  const handleSubmit = (event) => {
    event.preventDefault()

    let tmpUsuario = {
      id: event.target.inputId.value,
      Nombre: event.target.inputNombre.value,
      Telefono: event.target.inputTelefono.value,
      Ciudad: event.target.inputCiudad.value
    }
    
    BAPI(tmpUsuario)

    formRef.current.reset()
  }

  const BAPI = (usuario) => {

    fetch("http://localhost:4000/api/usuario", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
        <div className='row'>
      {
        usuario.map((item, index) => (
          <div className="col-md-4"  >
          <Card className='mt-2' key={index} style={{ width: '350px' }}>
          <Card.Body>
          <h6>Nombre:</h6>
            <Card.Title>{item.Nombre}</Card.Title>
            <h6>Telefono:</h6>
            <Card.Text>
              {item.Telefono}
            </Card.Text>
            <Card.Text>
            <h6>Ciudad:</h6> 
            {item.Ciudad}
            </Card.Text>
            <button onClick={() => handleDelete(item.id)} setInUpdated={setInUpdated} className='btn btn-danger'>Borrar</button>
          </Card.Body>
        </Card>
        </div>
        ))
        
      }
      </div>
    <h1>Usuario</h1>
      {
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className='row'>
              <Form.Group className="mb-3 col-6" controlId="inputId">
                <Form.Label>Id</Form.Label>
                <Form.Control type="number" placeholder="Id..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" placeholder="Telefono..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" placeholder="Ciudad..." />
              </Form.Group>
            </div>
            <div className='row justify-content-center mt-3'>
              <Button variant="primary" className='col-3' type="submit">
                Guardar
              </Button>
            </div>
          </Form>
      }
    </>

  )
}