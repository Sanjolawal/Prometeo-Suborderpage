import clientaddress from "@/styles/clientaddress.module.scss";

export default function Clientaddress(props: any) {
  const response = props.info;

  return (
    <div>
      <h1 className={clientaddress.h1}>Client address</h1>
      <div>
        {response.map((item: any) => {
          const { zip_code, street, city, region, country } = item.user_address;
          return (
            <div className={clientaddress.container} key={item}>
              <div className={clientaddress.con}>
                <h6 className={clientaddress.h6}>Street</h6>
                <p>{street}</p>
              </div>
              <div className={clientaddress.con}>
                <h6 className={clientaddress.h6}>City</h6>
                <p>{city}</p>
              </div>
              <div className={clientaddress.con}>
                <h6 className={clientaddress.h6}>Region</h6>
                <p>{region}</p>
              </div>
              <div className={clientaddress.secondCon}>
                <div className={clientaddress.con}>
                  <h6 className={clientaddress.h6}>Zipcode</h6>
                  <p>{zip_code}</p>
                </div>
                <div className={clientaddress.con}>
                  <h6 className={clientaddress.h6}>Country</h6>
                  <p>{country}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
