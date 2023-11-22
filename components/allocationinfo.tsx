import allocationinfo from "@/styles/allocationinfo.module.scss";
import Productlist from "./productlist";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import downarrow from "@/public/downarrow.svg";
import plus from "@/public/plus.svg";

export default function Allocationinfo(props: {
  info: [{ sub_orders: []; products: [] }];
  state: string;
  box_available: string;
}) {
  type formvalues = {
    warehouse: string;
    storage: number;
    arrival_date: string;
    arrival_time: string;
    // product_name: string;
    duration: string;
    // quantity: string;
    // packing_type: string;
    // serial_number: string;
    // length: number;
    // width: number;
    // height: number;
    // measure: string;
    // weight: number;
    // weight2: string;
    // price: number;
    // price2: string;
    // expiration: string;
    document_number: number;
    document_type: string;
    description: string;
    file: any;
    // test: string;
  };

  const form = useForm<formvalues>();
  const { register, handleSubmit, formState, trigger, reset } = form;
  const { errors } = formState;
  const sub_orders = props.info[0].sub_orders;
  const products = props.info[0].products;
  const [counter, setcounter] = useState(1);
  const [files, setfiles] = useState("");
  const state = props.state;
  let available = props.box_available;

  const Prev_section = () => {
    setcounter(counter - 1);
  };

  if (state === "Choose Warehouse" || !state) {
    return <div></div>;
  }

  const warehouse = sub_orders.filter(
    (warehouse: { warehouse_name: string }) => {
      return warehouse.warehouse_name === state;
    }
  );

  const Next_section = () => {
    setcounter(counter + 1);
  };

  const handleChange = () => {
    trigger("file");
    setfiles("file uploaded");
  };

  const onSubmit = async (data: formvalues) => {
    const formData = new FormData();
    formData.append(`files`, data.file[0]);
    data = { ...data, file: data.file[0].name };
    formData.append("data", JSON.stringify(data));
    console.log("form submitted", data);

    const senddata = await fetch(`/api`, {
      method: `POST`,
      body: formData,
    });

    Next_section();
    setfiles("");
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={counter === 1 ? allocationinfo.div1 : allocationinfo.div}
        >
          <h1 className={allocationinfo.h1}>Details</h1>
          <div className={allocationinfo.inputsContainer}>
            <div>
              <input
                className={allocationinfo.input}
                type="text"
                id="warehouse"
                value={state}
                {...register("warehouse")}
              />
            </div>
            <div className={allocationinfo.variant}>
              <input
                className={allocationinfo.input}
                type="number"
                placeholder="storage duration"
                id="storage"
                {...register("storage", { required: true })}
              />
              <select
                className={allocationinfo.testing}
                {...register("duration")}
              >
                <option>hours</option>
                <option>Days</option>
                <option>months</option>
              </select>
              <p className={allocationinfo.p}>
                {errors.storage ? `storage duration is required` : ``}
              </p>
            </div>
            <div>
              <input
                className={allocationinfo.input}
                type="text"
                placeholder="Arrival date"
                id="arrival_date"
                {...register("arrival_date", { required: true })}
              />
              <p className={allocationinfo.p}>
                {errors.arrival_date ? `Arrival date is required` : ``}
              </p>
            </div>
            <div>
              <input
                className={allocationinfo.input}
                type="text"
                placeholder="Arrival time"
                id="arrival_time"
                {...register("arrival_time", { required: true })}
              />
              <p className={allocationinfo.p}>
                {errors.arrival_time ? `Arrival time type is required` : ``}
              </p>
            </div>
            {/* <div>
              <input
                className={allocationinfo.input}
                type="text"
                placeholder="Product name"
                id="product_name"
                {...register("product_name", { required: true })}
              />
              <p className={allocationinfo.p}>
                {errors.product_name ? `Product name is required` : ``}
              </p>
            </div>

            <div>
              <input
                className={allocationinfo.input}
                type="number"
                placeholder="Quantity"
                id="quantity"
                {...register("quantity", { required: true })}
              />
              <p className={allocationinfo.p}>
                {errors.quantity ? `Quantity is required` : ``}
              </p>
            </div>
            <div>
              <input
                className={allocationinfo.input}
                type="text"
                placeholder="Packing type"
                id="packing_type"
                {...register("packing_type", { required: true })}
              />
              <p className={allocationinfo.p}>
                {errors.packing_type ? `Packing type is required` : ``}
              </p>
            </div>
            <div>
              <input
                className={allocationinfo.input}
                type="text"
                placeholder="Serial number"
                id="serial_number"
                {...register("serial_number", { required: true })}
              />
              <p className={allocationinfo.p}>
                {errors.serial_number ? `Serial number is required` : ``}
              </p>
            </div> */}
          </div>
          <h1 className={allocationinfo.h2}>All products</h1>
          <Productlist productlists={products} />
          {/* <div className={allocationinfo.container2}>
            <div className={allocationinfo.variant2}>
              <div>
                <input
                  className={allocationinfo.input}
                  type="number"
                  placeholder="Length"
                  id="length"
                  {...register("length", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.length ? `Length is required` : ``}
                </p>
              </div>
              <div>
                <input
                  className={allocationinfo.input}
                  type="number"
                  placeholder="Width"
                  id="width"
                  {...register("width", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.width ? `Width is required` : ``}
                </p>
              </div>
              <div>
                <input
                  className={allocationinfo.input}
                  type="number"
                  placeholder="Height"
                  id="height"
                  {...register("height", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.height ? `Height is required` : ``}
                </p>
              </div>
              <select
                className={allocationinfo.testing}
                {...register("measure")}
              >
                <option>cm</option>
                <option>m</option>
              </select>
            </div>
            <div className={allocationinfo.variant3}>
              <div>
                <input
                  className={allocationinfo.input}
                  type="number"
                  placeholder="Weight"
                  id="weight"
                  {...register("weight", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.weight ? `Weight is required` : ``}
                </p>
              </div>
              <select
                className={allocationinfo.testing}
                {...register("weight2")}
              >
                <option>g</option>
                <option>Kg</option>
              </select>
            </div>
            <div className={allocationinfo.variant3}>
              <div>
                <input
                  className={allocationinfo.input}
                  type="number"
                  placeholder="Price"
                  id="price"
                  {...register("price", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.price ? `Price is required` : ``}
                </p>
              </div>
              <select
                className={allocationinfo.testing}
                {...register("price2")}
              >
                <option>USD</option>
                <option>TG</option>
              </select>
            </div>
          </div>
          <div className={allocationinfo.expiration}>
            <input
              className={allocationinfo.input}
              type="text"
              placeholder="Expiration day"
              id="expiration"
              {...register("expiration", { required: true })}
            />
            <p className={allocationinfo.p}>
              {errors.expiration ? `Expiration day is required` : ``}
            </p>
          </div> */}
          <div
            className={allocationinfo.first_btn}
            onClick={async () => {
              const test = await trigger([
                "storage",
                "arrival_date",
                "arrival_time",
                // "product_name",
                // "quantity",
                // "packing_type",
                // "serial_number",
                // "length",
                // "width",
                // "height",
                // "weight",
                // "price",
                // "expiration",
              ]);
              test ? Next_section() : ``;
            }}
          >
            <button type="button">Next</button>
            <Image
              src={downarrow}
              alt="arrow"
              className={allocationinfo.firstbtnarrow}
            />
          </div>
        </div>

        <div
          className={counter === 2 ? allocationinfo.div1 : allocationinfo.div}
        >
          <h1 className={allocationinfo.h1}>Document details</h1>
          <div className={allocationinfo.mainCondiv1}>
            <div className={allocationinfo.counter2firstcon}>
              <div>
                <input
                  className={allocationinfo.input}
                  type="number"
                  placeholder="Document number"
                  id="document_number"
                  {...register("document_number", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.document_number ? `Document number is required` : ``}
                </p>
              </div>
              <div>
                <input
                  className={allocationinfo.input}
                  type="text"
                  placeholder="Document type"
                  id="document_type"
                  {...register("document_type", { required: true })}
                />
                <p className={allocationinfo.p}>
                  {errors.document_type ? `Document type is required` : ``}
                </p>
              </div>
            </div>
            <textarea
              className={allocationinfo.textarea}
              placeholder="document description here....... ....... ......."
              {...register("description")}
            ></textarea>
            <h2 className={allocationinfo.h2}>Document files</h2>
            <div className={allocationinfo.test2}>
              <label htmlFor="file" className={allocationinfo.label}>
                <p>Add file</p>
                <Image src={plus} alt="plus" />
                <input
                  type="file"
                  id="file"
                  {...register("file", {
                    required: true,
                    onChange: () => {
                      handleChange();
                    },
                  })}
                  className={allocationinfo.file}
                />
              </label>
              <p className={allocationinfo.p1}>{files}</p>
              <p className={allocationinfo.p}>
                {errors.file ? `file is required` : ``}
              </p>
            </div>
          </div>
          <div className={allocationinfo.counter2btncon}>
            <div
              className={allocationinfo.btn}
              onClick={() => {
                Prev_section();
              }}
            >
              <Image
                src={downarrow}
                alt="downarrow"
                className={allocationinfo.backarrow}
              />
              <button type="button">Back</button>
            </div>
            <button
              type="button"
              onClick={async () => {
                const test = await trigger([
                  "document_number",
                  "document_type",
                  "file",
                ]);
                test ? Next_section() : ``;
              }}
              className={allocationinfo.btn}
            >
              <p>Next</p>
              <Image
                src={downarrow}
                alt="downarrow"
                className={allocationinfo.firstbtnarrow}
              />
            </button>
          </div>
        </div>
        <div
          className={counter === 3 ? allocationinfo.div1 : allocationinfo.div}
        >
          <h1 className={allocationinfo.h1}>Box allocation</h1>
          <div className={allocationinfo.main3}>
            <div className={allocationinfo.boxtypecon}>
              <select className={allocationinfo.boxtype}>
                <option>Select box type</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
              <p>{available ? `${available} products` : ``}</p>
            </div>
            <section className={allocationinfo.available}>
              <h6>Quantity available</h6>
              <p>x{available}</p>
            </section>
            <div className={allocationinfo.boxdetails}>
              <section>
                <h6>Quantity</h6>
                <p>x20</p>
              </section>
              <section>
                <h6>Weight Capacity</h6>
                <p>50kg</p>
              </section>
              <section>
                <h6>Dimensions (L x W x H)</h6>
                <p>120 x 140 x 150 cm</p>
              </section>
              <section>
                <h6>Current weight</h6>
                <p>51kg</p>
              </section>
            </div>
          </div>

          {/* <input
            type="text"
            placeholder="testing"
            id="test"
            {...register("test", {
              required: true,
            })}
            className={allocationinfo.test}
          />
          <p>{errors.test ? `test is required` : ``}</p> */}
          <div className={allocationinfo.counter2btncon}>
            <div
              onClick={() => {
                Prev_section();
              }}
              className={allocationinfo.btn}
            >
              <Image
                src={downarrow}
                alt="downarrow"
                className={allocationinfo.backarrow}
              />
              <button type="button">Back</button>
            </div>
            <button type="submit" className={allocationinfo.btn}>
              <p>Submit</p>
              <Image
                src={downarrow}
                alt="downarrow"
                className={allocationinfo.firstbtnarrow}
              />
            </button>
          </div>
        </div>

        <div
          className={counter === 4 ? allocationinfo.div1 : allocationinfo.div}
        >
          <p className={allocationinfo.p4}>Form Submitted succesfully</p>
          <button
            type="button"
            onClick={() => {
              setcounter(1);
            }}
            className={allocationinfo.back4}
          >
            <Image
              src={downarrow}
              alt="downarrow"
              className={allocationinfo.backarrow}
            />
            <p> Back</p>
          </button>
        </div>
      </form>
    </>
  );
}
