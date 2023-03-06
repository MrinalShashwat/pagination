import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPages] = useState(1);
  const callData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
    console.log(products);
  };
  useEffect(() => {
    callData();
  }, []);
  const setPage = (index) => {
    if (index > 0 && index < products.length / 10 + 1 && index !== page)
      setPages(index);
  };
  return (
    <>
      <div className="products">
        {products &&
          products.length > 0 &&
          products.slice(page * 10 - 10, page * 10).map((item, index) => (
            <span className="products__single" key={index}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
          ))}
      </div>
      <span
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <span
          style={
            page === 1
              ? { opacity: 0 }
              : { marginRight: "10px", cursor: "pointer" }
          }
          onClick={() => {
            setPage(page - 1);
          }}
        >
          {"<-"}
        </span>
        <span>
          {[...Array(products.length / 10)].map((_, index) => (
            <span
              style={
                page === index + 1
                  ? {
                      backgroundColor: "red",
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: "10px",
                    }
                  : {
                      marginRight: "10px",
                      cursor: "pointer",
                      padding: "10px",
                    }
              }
              onClick={() => {
                console.log(index);
                setPage(index + 1);
              }}
            >
              {index + 1}
            </span>
          ))}
        </span>
        <span
          style={
            page === products.length / 10
              ? { opacity: "0" }
              : { marginLeft: "10px", cursor: "pointer" }
          }
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {"->"}
        </span>
      </span>
    </>
  );
}
