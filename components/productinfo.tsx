import productinfo from "@/styles/productinfo.module.scss";

export default function Productinfo(props: any) {
  const productinformation = props.moreinfo;
  const id = props.id;
  const product = productinformation.filter((each: any) => {
    return each.box_type_id === id;
  });

  if (product[0].conditions) {
    let conditions = product[0].conditions;
    return (
      <>
        <div>
          {product.map((info: any) => {
            return (
              <div key={info.box_type_id} className={productinfo.container}>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Product name</h5>
                  <p>{info.product_name}</p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Quantity</h5>
                  <p>{info.quantity}</p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Packing type</h5>
                  <p>{info.packing_type}</p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Serial number</h5>
                  <p>{info.serial_number || ""}</p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Dimensions (L x W x H)</h5>
                  <p>{info.dimensions || ""}</p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Weignt</h5>
                  <p>
                    {info.weignt}
                    {info.weight_type}
                  </p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Price</h5>
                  <p>
                    {info.price}
                    {info.currency}
                  </p>
                </div>
                <div className={productinfo.con}>
                  <h5 className={productinfo.h5}>Expiration time</h5>
                  <p>{new Date(info.expiration_date).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={productinfo.secondCon}>
          <h1 className={productinfo.h1}>Product conditions</h1>
          <div className={productinfo.conditionCon}>
            {conditions.map((condition: any) => {
              return (
                <div key={condition} className={productinfo.conWrapper}>
                  <h5 className={productinfo.h5}>Condition</h5>
                  <p>
                    {condition.condition_name} | {condition.condition_start} -
                    {condition.condition_end} | {condition.condition_price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {product.map((info: any) => {
        return (
          <div key={info.box_type_id} className={productinfo.container}>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Product name</h5>
              <p>{info.product_name}</p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Quantity</h5>
              <p>{info.quantity}</p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Packing type</h5>
              <p>{info.packing_type}</p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Serial number</h5>
              <p>{info.serial_number || ""}</p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Dimensions (L x W x H)</h5>
              <p>{info.dimensions || ""}</p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Weignt</h5>
              <p>
                {info.weignt}
                {info.weight_type}
              </p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Price</h5>
              <p>
                {info.price}
                {info.currency}
              </p>
            </div>
            <div className={productinfo.con}>
              <h5 className={productinfo.h5}>Expiration time</h5>
              <p>{new Date(info.expiration_date).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
