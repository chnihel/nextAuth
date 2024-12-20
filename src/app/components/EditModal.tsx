
"use client";


import React, { useState, useEffect } from "react";
//import styles from './EditProductModal.module.css'; // Import your CSS module
import { Modal, Button,Form  } from 'react-bootstrap';

interface Product {
  _id: string,
    Ref: string,
    Price: number,
    Description: string,
    Qnt: number,
    image: string[]
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdate: (updatedProduct: Product,image?: FileList | null) => void;
}

const EditProductModal: React.FC<ModalProps> = ({ isOpen, onClose, product, onUpdate }) => {
  const [formData, setFormData] = useState<Product | null>(null);
  const [gal, setGal] = useState<FileList | null>(null);
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData!,
      [e.target.name]: e.target.value,
    });
  };
  

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setGal(e.target.files);
    }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (formData) {
    onUpdate(formData, gal);  // Mettez à jour avec le FormData contenant les fichiers
  }
  onClose();
};

  if (!isOpen || !formData) return null;

  return (
    <div>

  

      {/* Modal pour mise à jour du produit */}
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mettre à jour le produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRef">
              <Form.Label>Référence</Form.Label>
              <Form.Control
                type="text"
                name="Ref"
                value={formData.Ref}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formQnt">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                name="Qnt"
                value={formData.Qnt}
                onChange={handleInputChange}
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
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProductModal;
