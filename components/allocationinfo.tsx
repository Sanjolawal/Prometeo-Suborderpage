import allocationinfo from "@/styles/allocationinfo.module.scss";
import Productlist from "./productlist";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import downarrow from "@/public/downarrow.svg";
import plus from "@/public/plus.svg";

export default function Allocationinfo(props: {
  info: [{ sub_orders: [{ types: []; boxes: [] }]; products: [] }];
  state: string;
}) {
  type formvalues = {
    warehouse: string;
    storage: number;
    arrival_date: string;
    arrival_time: string;
    boxtype: string;
    duration: string;
    product_name: string[];
    document_number: number;
    document_type: string;
    description: string;
    file: any;
    quantity: number;
    dimension: string[];
    weight: number[];
    product_quantity: number[];
  };

  const form = useForm<formvalues>();
  const { register, handleSubmit, formState, trigger, reset } = form;
  const { errors } = formState;
  const sub_orders = props.info[0].sub_orders;
  const types = sub_orders[0].types;
  const boxes = sub_orders[0].boxes;
  const products = props.info[0].products;
  const [counter, setcounter] = useState(1);
  const [files, setfiles] = useState("");
  const [show, setshow] = useState("");
  const [box, setbox] = useState([]);
  const [input_products, setinput_products] = useState([{ id: 1 }]);
  const [number, setnumber] = useState(1);
  const [weight, setweight] = useState<any[]>([]);
  const [quantity, setquantity] = useState<any[]>([]);
  const [current_weight, setcurrent_weight] = useState(0);
  const first = useRef<HTMLParagraphElement>(null);
  const state = props.state;

  const calculate_currentweight = () => {
    const weight_number = weight.map(
      (weight: { number: number; name: string }) => {
        return weight.number;
      }
    );

    const quantity_number = quantity.map(
      (quantity: { number: number; name: string }) => {
        return quantity.number;
      }
    );

    let current_weight: number = 0;
    for (let i = 0; i < weight_number.length; i++) {
      current_weight += weight_number[i] * quantity_number[i];
    }
    setcurrent_weight(current_weight);
  };

  useEffect(() => {
    return calculate_currentweight();
  }, [weight, quantity]);

  const Prev_section = () => {
    setcounter(counter - 1);
  };

  if (state === "Choose Warehouse" || !state) {
    return <div></div>;
  }

  const Next_section = () => {
    setcounter(counter + 1);
  };

  const handleChange = () => {
    trigger("file");
    setfiles("file uploaded");
  };

  const boxinfo = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === `Select box type`) {
      return setshow(``);
    }
    const type_selected: any = types.filter((type: { type_name: string }) => {
      return type.type_name === value;
    });
    const type_id = type_selected[0].type_id;
    const box = boxes.filter((box: { box_type: string }) => {
      return box.box_type === type_id;
    });
    setbox(box);
    setshow(e.target.value);
  };

  const result = first.current?.innerHTML;
  const box_weight = Number(result?.split(` `)[0]);
  const product_none = () => {
    if (box_weight > current_weight) {
      return true;
    } else {
      return false;
    }
  };

  const showproducts = async () => {
    const result = product_none();
    if (!result) {
      await trigger([
        "product_name",
        "dimension",
        "weight",
        "product_quantity",
      ]);
      return;
    }
    const response = await trigger([
      "product_name",
      "dimension",
      "weight",
      "product_quantity",
    ]);
    response ? run() : ``;
    function run() {
      let new_number = number + 1;
      input_products.unshift({ id: new_number });
      setnumber(new_number);
    }
  };

  const deleteproduct = (product_id: number) => {
    if (product_id === 1) {
      return;
    }
    const new_input = input_products.filter((products) => {
      return products.id !== product_id;
    });

    const new_weight = weight.filter((weight) => {
      return Number(weight.name.split(`.`)[1]) !== product_id;
    });

    const new_quantity: any[] = quantity.filter((quantity) => {
      return Number(quantity.name.split(`.`)[1]) !== product_id;
    });
    setweight(new_weight);
    setquantity(new_quantity);
    setinput_products(new_input);
  };

  const extract_weight = (e: number, ename: string) => {
    const weight_inputted = weight.filter((weight: any) => {
      return weight.name === ename;
    });
    if (weight_inputted.length === 0) {
      weight.push({ number: e, name: ename });
      const test = [...weight];
      setweight(test);
    }
    if (weight_inputted.length > 0) {
      const updated_weight = weight.map(
        (weight: { number: number; name: string }) => {
          if (weight_inputted[0].name === weight.name) {
            return { ...weight, number: e, name: ename };
          }
          return weight;
        }
      );
      const test = [...updated_weight];
      setweight(test);
    }
  };

  const extract_quantity = (e: number, ename: string) => {
    const quantity_inputted = quantity.filter((quantity: any) => {
      return quantity.name === ename;
    });
    if (quantity_inputted.length === 0) {
      quantity.push({ number: e, name: ename });
      const test = [...quantity];
      setquantity(test);
    }
    if (quantity_inputted.length > 0) {
      const updated_quantity = quantity.map(
        (quantity: { number: number; name: string }) => {
          if (quantity_inputted[0].name === quantity.name) {
            return { ...quantity, number: e, name: ename };
          }
          return quantity;
        }
      );
      const test = [...updated_quantity];
      setquantity(test);
    }
  };

  const onSubmit = async (data: formvalues) => {
    if (
      !data.product_name ||
      !data.dimension ||
      !data.weight ||
      !data.product_quantity
    ) {
      return;
    }

    const formData = new FormData();
    formData.append(`file`, data.file[0]);
    data = { ...data, file: data.file[0].name };
    formData.append("data", JSON.stringify(data));

    await fetch(`/api`, {
      method: `POST`,
      body: formData,
    });

    Next_section();
    setfiles("");
    setshow("");
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
          </div>
          <h1 className={allocationinfo.h2}>All products</h1>
          <Productlist productlists={products} />
          <div
            className={allocationinfo.first_btn}
            onClick={async () => {
              const test = await trigger([
                "storage",
                "arrival_date",
                "arrival_time",
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
              <select
                className={allocationinfo.boxtype}
                {...register("boxtype", {
                  onChange: async (e) => {
                    boxinfo(e.target.value, e);
                  },
                })}
              >
                <option>Select box type</option>
                {types.map(
                  (boxtype: { type_id: string; type_name: string }) => {
                    return (
                      <option key={boxtype.type_id}>{boxtype.type_name}</option>
                    );
                  }
                )}
              </select>
              <p></p>
            </div>
            {show ? (
              <div>
                {box.map(
                  (box: {
                    box_type: string;
                    box_quantity: number;
                    box_weight: number;
                    length: number;
                    width: number;
                    height: number;
                  }) => {
                    return (
                      <div key={box.box_type}>
                        <section className={allocationinfo.available}>
                          <h6>Quantity available</h6>
                          <p>{box.box_quantity}</p>
                        </section>
                        <div className={allocationinfo.boxdetails}>
                          <section>
                            <h6>Quantity</h6>
                            <input
                              type="number"
                              className={allocationinfo.input2}
                              placeholder="Quantity"
                              id="quantity"
                              {...register("quantity", {
                                required: true,
                              })}
                            />
                            <p className={allocationinfo.p}>
                              {errors.quantity ? `Quantity is required` : ``}
                            </p>
                          </section>
                          <section>
                            <h6>Weight Capacity</h6>
                            <p ref={first}>{box.box_weight} kg</p>
                          </section>
                          <section>
                            <h6>Dimensions (L x W x H)</h6>
                            <p>{`${box.length} x ${box.width} x ${box.height} cm`}</p>
                          </section>
                          <section>
                            <h6>Current weight</h6>
                            <p>
                              {current_weight > box.box_weight
                                ? product_none()
                                : `${current_weight} kg`}
                            </p>
                            <p>
                              {current_weight > box.box_weight
                                ? `${current_weight} kg`
                                : ``}
                            </p>

                            <p className={allocationinfo.p}>
                              {current_weight > box.box_weight
                                ? `Uh oh Current weight is more than box weight`
                                : ``}
                            </p>
                          </section>
                        </div>
                      </div>
                    );
                  }
                )}
                <div className={allocationinfo.products}>
                  <h1 className={allocationinfo.h1}>Products</h1>
                  <Image
                    src={plus}
                    alt="plus"
                    onClick={showproducts}
                    className={allocationinfo.image}
                  />
                </div>
                <div>
                  {input_products.map((product: { id: number }) => {
                    return (
                      <div
                        key={product.id}
                        className={allocationinfo.productInputs}
                      >
                        <section>
                          <h6>Product name</h6>
                          <input
                            type="text"
                            className={allocationinfo.input2}
                            placeholder="Tv set"
                            id="product_name"
                            {...register(`product_name.${product.id}`, {
                              required: true,
                            })}
                          />
                          <p className={allocationinfo.p}>
                            {errors.product_name?.[product.id]
                              ? `Product name is required`
                              : ``}
                          </p>
                        </section>
                        <section>
                          <h6>Qauntity</h6>
                          <input
                            type="number"
                            className={allocationinfo.input2}
                            placeholder="4"
                            id="product_quantity"
                            {...register(`product_quantity.${product.id}`, {
                              required: true,
                              onChange: (e) => {
                                extract_quantity(e.target.value, e.target.name);
                              },
                            })}
                          />
                          <p className={allocationinfo.p}>
                            {errors.product_quantity?.[product.id]
                              ? `Quantity is required`
                              : ``}
                          </p>
                        </section>
                        <section>
                          <h6>Dimensions(L x W x H) in cm</h6>
                          <input
                            type="text"
                            className={allocationinfo.input2}
                            placeholder="70 X 30 X 40 cm"
                            id="dimension"
                            {...register(`dimension.${product.id}`, {
                              required: true,
                            })}
                          />
                          <p className={allocationinfo.p}>
                            {errors.dimension?.[product.id]
                              ? `Dimension is required`
                              : ``}
                          </p>
                        </section>
                        <section>
                          <h6>Weight in kg</h6>
                          <input
                            type="number"
                            className={allocationinfo.input2}
                            placeholder="10 kg"
                            id="weight"
                            {...register(`weight.${product.id}`, {
                              required: true,
                              onChange: (e) => {
                                extract_weight(e.target.value, e.target.name);
                              },
                            })}
                          />
                          <p className={allocationinfo.p}>
                            {errors.weight?.[product.id]
                              ? `Weight is required`
                              : ``}
                          </p>
                        </section>
                        <p
                          onClick={() => {
                            deleteproduct(product.id);
                          }}
                          className={allocationinfo.p3}
                        >
                          Delete
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ``
            )}
          </div>

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
            {box_weight < current_weight ? (
              ``
            ) : (
              <button
                onClick={async () => {
                  await trigger([
                    "quantity",
                    "product_name",
                    "dimension",
                    "weight",
                    "product_quantity",
                  ]);
                }}
                className={allocationinfo.btn}
              >
                <p>Submit</p>
                <Image
                  src={downarrow}
                  alt="downarrow"
                  className={allocationinfo.firstbtnarrow}
                />
              </button>
            )}
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
              setcurrent_weight(0);
              setinput_products([{id:1}]);
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
