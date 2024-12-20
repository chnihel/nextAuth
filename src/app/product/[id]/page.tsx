"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Modal, Button,Form  } from 'react-bootstrap';

interface Product {
  _id: string,
  Ref: string,
  Price: number,
  Description: string,
  Qnt: number,
  image: string[]
}

const UpdateData = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [prod, setProd] = useState<Product[]>([]);
    const [data, setData] = useState<Product>({
      _id: "",
      Ref: "",
      Price: 0,
      Description: "",
      Qnt: 0,
      image: []
    });
    const [gal, setGal] = useState<FileList | null>(null);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const getProduct = async () => {
      try {
          const response = await fetch("http://localhost:3000/product");
          const dataProduct = await response.json();
          console.log("les donnee recuperer", dataProduct);
          const products: Product[] = dataProduct.AllData;
          setProd(products);
      } catch (err) {
          console.log("erreur lors de la recuperation des donnes", err);
      }
  }

  // Initial product fetch
  useEffect(() => {
      getProduct();
  }, []);

    // Fetch initial data to populate the form
   useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
                try {
                    const response = await fetch(`http://localhost:3000/product/${params.id}`);
                    if (!response.ok) throw new Error('Erreur de récupération des données de cette élément');
                    const categoryData = await response.json();
                    setData(categoryData);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [params.id]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData({
          ...data,
          [name]: name === "Price" || name === "Qnt" ? parseFloat(value) : value
      });
    };

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGal(e.target.files);
        }
    };

    const updateData = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('Ref', data.Ref);
        formData.append('Price', data.Price.toString());
        formData.append('Description', data.Description);
        formData.append('Qnt', data.Qnt.toString());
  
        // Ajouter des fichiers au formData
        if (gal) {
          for (let i = 0; i < gal.length; i++) {
            formData.append('files', gal[i]);
          }
        }
        
        const response = await fetch(`http://localhost:3000/product/${params.id}`, {
          method: "PUT",
          body: formData,
        });
        
        if (response.ok) {
          const responseData = await response.json();
          console.log("Produit mis à jour avec succès", responseData);
          getProduct(); // Appel de la fonction pour récupérer les produits mis à jour
        } else {
          const errorData = await response.json();
          console.error("Erreur côté serveur:", errorData);
        }
      } catch (err) {
        console.error("Erreur réseau ou autre problème:", err);
        console.log("Impossible de mettre à jour le produit, veuillez vérifier");
      }
    };

    return (
      <div>
         {/* Liste des produits */}
         <div className="col-lg-8 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body p-4">
              <h5 className="card-title fw-semibold mb-4">Produits</h5>
              <div className="table-responsive">
                <table className="table text-nowrap mb-0 align-middle">
                  <thead className="text-dark fs-4">
                    <tr>
                      <th className="border-bottom-0">Id</th>
                      <th className="border-bottom-0">Ref</th>
                      <th className="border-bottom-0">Prix</th>
                      <th className="border-bottom-0">Description</th>
                      <th className="border-bottom-0">Quantité</th>
                      <th className="border-bottom-0">Image</th>
                      <th className="border-bottom-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prod.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.Ref}</td>
                        <td>{item.Price}</td>
                        <td>{item.Description}</td>
                        <td>{item.Qnt}</td>
                        <td>
                          <img
                            src={`http://localhost:3000/file/${item.image[0]}`}
                            alt={item.Description}
                            style={{ width: '50px', height: '50px' }}
                          />
                        </td>
                        <td>
                          <button type='button' >Supprimer</button>
                          <button type="button">Mettre à jour</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Votre interface de mise à jour ici */}
        <Button variant="primary" onClick={handleShow}>
        Update Product
      </Button>

     {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Update product form goes here...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>*/ }

       {/* Modal pour mise à jour du produit */}
       <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateData}>
              <Form.Group controlId="formRef">
                <Form.Label>Référence</Form.Label>
                <Form.Control
                  type="text"
                  name="Ref"
                  value={data.Ref}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  name="Price"
                  value={data.Price}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="Description"
                  value={data.Description}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formQnt">
                <Form.Label>Quantité</Form.Label>
                <Form.Control
                  type="number"
                  name="Qnt"
                  value={data.Qnt}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={changeImage}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Mettre à jour
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
       
      </div>
    );
};

export default UpdateData;
