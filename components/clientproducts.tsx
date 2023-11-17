import Image from "next/image";
import downarrow from "@/public/downarrow.svg";
import clientproducts from "@/styles/clientproducts.module.scss";
import Productlist from "./productlist";
import { useState } from "react";

export default function Clientproducts(props: any) {
  const response = props.info;
  const [first, setfirst] = useState(true);
  const Showproducts = () => {
    setfirst(!first);
  };

  if (response.length === 0) {
    return <h1 className={clientproducts.h1}>Client products</h1>;
  }

  const products = response[0].products;

  return (
    <div>
      <div
        className={
          first ? clientproducts.mainContainer : clientproducts.mainContainer2
        }
      >
        <div
          className={clientproducts.container}
          onClick={() => {
            Showproducts();
          }}
        >
          <div className={clientproducts.div}>
            <h1 className={clientproducts.h1}>Client products</h1>
            <p>{products.length}</p>
          </div>
          <Image
            src={downarrow}
            alt="downarrow"
            className={
              first ? clientproducts.downarrow1 : clientproducts.downarrow2
            }
          />
        </div>
        {first ? "" : <Productlist productlists={products} />}
      </div>
    </div>
  );
}
