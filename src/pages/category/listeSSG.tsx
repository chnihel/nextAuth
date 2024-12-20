import React from 'react';

interface Category {
  _id: string;
  Qnt:number;
  Price:number
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/order');
  const data = await res.json();

  return {
    props: {
      categories: data.getorder ?? data,
    },
    revalidate: 10, // (Optionnel) Revalide la page toutes les 10 secondes
  };
}

const ListeSSG = ({ categories }: { categories: Category[] }) => {
  return (
    <div>
      <ul>
        {categories?.map((item) => (
          <li key={item._id}>
            {item.Qnt}: {item.Price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeSSG;
