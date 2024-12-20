import React from 'react';

interface Category{
    _id:string;
    Name:string
    discription:string
}
interface Props{
    database:Category[]
}
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/category");

    // Vérifier si la réponse est correcte
    if (!res.ok) {
        return {
            notFound: true, 
        };
    }

    const data = await res.json();

    return {
        props: {
            database: data.AllCategories || [], 
        },
    };
}

const  Liste:React.FC<Props>=({ database })=> { 
    
    return (
        <div>
            <table>
                <thead>
                <tr>
                   <th>Name</th> 
                   <th>discription</th>
                   <td>delete</td>
                </tr>
                </thead>
                <tbody>
                {database.length === 0 ? (
                <div>Loading...</div> // Correction du texte
            ) : (
                database.map((todo) => (
                    <tr key={todo._id}>
                        <td>{todo.Name}</td>
                        <td>{todo.discription}</td>
                        <td><button type='submit'>delete</button></td>
                    </tr>
                )) // Utilisation correcte de map
            )}
                </tbody>
            </table>
            
        </div>
    );
}

export default Liste; // Utiliser une majuscule pour le nom du composant
