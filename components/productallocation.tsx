import plus from "@/public/plus.svg";
import Image from "next/image";
import productallocation from "@/styles/productallocation.module.scss";
import Allocationinfo from "./allocationinfo";
import downarrow from "@/public/downarrow.svg";
import { useState } from "react";

export default function Productallocation(props: any) {
  const response = props.info;
  const [show, setshow] = useState(false);
  const [value, setvalue] = useState("");
  const [available, setavailable] = useState("");

  const show_warehouse = () => {
    setavailable(``);
    setvalue("");
    setshow(!show);
  };

  const selected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setavailable(``);
    const warehouse = orders.filter((warehouse: { warehouse_name: string }) => {
      return e.target.value === warehouse.warehouse_name;
    });
    if (warehouse.length === 0) {
      return setvalue(e.target.value);
    }
    if (warehouse[0].box_available) {
      setavailable(warehouse[0].box_available);
    }
    setvalue(e.target.value);
  };

  if (response.length === 0) {
    return (
      <div className={productallocation.div}>
        <h1>Product allocation</h1>
        <Image
          src={plus}
          alt="plus"
          className={productallocation.plus}
          onClick={() => {
            show_warehouse();
          }}
        />
      </div>
    );
  }

  const orders = response[0].sub_orders;

  return (
    <>
      <div className={productallocation.div}>
        <h1>Product allocation</h1>
        <Image
          src={plus}
          alt="plus"
          className={productallocation.plus}
          onClick={() => {
            show_warehouse();
          }}
        />
      </div>
      {show ? (
        <div className={productallocation.main}>
          <div className={productallocation.customselectcontainer}>
            <div className={productallocation.customselect}>
              <select
                className={productallocation.select}
                onChange={(e) => {
                  selected(e);
                }}
              >
                <option>Choose Warehouse</option>
                {orders.map((warehouses: { warehouse_name: string }) => {
                  return (
                    <option
                      value={warehouses.warehouse_name}
                      className={productallocation.option}
                    >
                      {warehouses.warehouse_name}
                    </option>
                  );
                })}
              </select>
              <Image
                src={downarrow}
                alt="arrow"
                className={productallocation.arrow}
              />
            </div>
            <p className={productallocation.available}>
              {available ? `${available} boxes available` : ``}
            </p>
          </div>
          <Allocationinfo info={response[0].sub_orders} state={value} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
