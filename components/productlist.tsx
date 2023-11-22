import clientproducts from "@/styles/clientproducts.module.scss";
import Image from "next/image";
import downarrow from "@/public/downarrow.svg";
import { useState } from "react";
import Productinfo from "./productinfo";

export default function Productlist(props: any) {
  const products = props.productlists;
  const [id, setid] = useState(0);
  const [show, setshow] = useState(false);
  const productPerPage = 5;
  const totalPage = Math.ceil(products.length / productPerPage);
  let [currentPage, setcurrentPage] = useState(1);
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }
  if (currentPage < 1) {
    currentPage = 1;
  }
  const lastIndex = currentPage * productPerPage;
  const firstIndex = lastIndex - productPerPage;

  const records = products.slice(firstIndex, lastIndex);

  const Showmoreinfo = (id: number) => {
    setid(id);
    setshow(!show);
  };

  const Nextpage = () => {
    setcurrentPage(currentPage + 1);
  };
  const Previouspage = () => {
    setcurrentPage(currentPage - 1);
  };

  if (products.length > 5) {
    return (
      <div className={clientproducts.listContainer}>
        {records.map((product: any) => {
          return (
            <>
              <div
                className={clientproducts.productlist}
                onClick={() => {
                  Showmoreinfo(product.box_type_id);
                }}
                key={product.box_type_id}
              >
                <p className={clientproducts.paragraph}>
                  No {product.box_type_id}
                </p>
                <p className={clientproducts.paragraph}>
                  {product.product_name}
                </p>
                <p className={clientproducts.paragraph}>
                  {product.price}
                  {product.currency}
                </p>
                <p className={clientproducts.paragraph}>x{product.quantity}</p>
                <Image
                  src={downarrow}
                  alt="downarrow"
                  className={
                    product.box_type_id === id && show
                      ? clientproducts.downarrow3
                      : clientproducts.downarrow
                  }
                />
              </div>
              {product.box_type_id === id && show ? (
                <Productinfo moreinfo={products} id={product.box_type_id} />
              ) : (
                ""
              )}
            </>
          );
        })}
        <div className={clientproducts.btncontainer}>
          <div
            className={clientproducts.btncon}
            onClick={() => {
              Previouspage();
            }}
          >
            <Image
              src={downarrow}
              alt="arrow"
              className={clientproducts.backarrow}
            />
            <button type="button">Back</button>
          </div>
          <div
            className={clientproducts.btncon}
            onClick={() => {
              Nextpage();
            }}
          >
            <button type="button">Next</button>
            <Image
              src={downarrow}
              alt="arrow"
              className={clientproducts.nextarrow}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clientproducts.listContainer}>
      {records.map((product: any) => {
        return (
          <>
            <div
              className={clientproducts.productlist}
              onClick={() => {
                Showmoreinfo(product.box_type_id);
              }}
              key={product.box_type_id}
            >
              <p className={clientproducts.paragraph}>
                No {product.box_type_id}
              </p>
              <p className={clientproducts.paragraph}>{product.product_name}</p>
              <p className={clientproducts.paragraph}>
                {product.price}
                {product.currency}
              </p>
              <p className={clientproducts.paragraph}>x{product.quantity}</p>
              <Image
                src={downarrow}
                alt="downarrow"
                className={
                  product.box_type_id === id && show
                    ? clientproducts.downarrow3
                    : clientproducts.downarrow
                }
              />
            </div>
            {product.box_type_id === id && show ? (
              <Productinfo moreinfo={products} id={product.box_type_id} />
            ) : (
              ""
            )}
          </>
        );
      })}
    </div>
  );
}
