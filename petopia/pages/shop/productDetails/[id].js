import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  const router = useRouter();

  // If the page is still generating during fallback
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

// Fetch all product IDs for dynamic paths
export async function getStaticPaths() {
    
  const response = await fetch("http://localhost:3000/api/getProduct");
  const data = await response.json();

  // Map product IDs to paths
  const paths = data.prod.map((product) => ({
    params: { id: product._id.toString() }, // Ensure IDs are strings
  }));

  return {
    paths, // Paths generated for all products
    fallback: true, // Enable fallback for on-demand generation
  };
}

// Fetch individual product data for each dynamic path
export async function getStaticProps({ params }) {
    
//   const { id } = params; // Extract `id` from params
//   console.log("khehe",id)
//   const response = await fetch(`http://localhost:3000/api/getProduct?id=${id}`);
//   const data = await response.json();

  return {
    props: {
      product: data.product || null, // Pass the product as props
    },
    revalidate: 10, // Re-generate the page every 10 seconds
  };
}
