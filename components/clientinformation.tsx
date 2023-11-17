import clientinfo from "@/styles/clientinfo.module.scss";

export default function Clientinformation(props: any) {
  const response = props.info;

  return (
    <div>
      <h1 className={clientinfo.h1}>Client information</h1>
      <div>
        {response.map((item: any) => {
          return (
            <div className={clientinfo.container}>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Company name</h6>
                <p>{item.company_name}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Bin_tax code</h6>
                <p>{item.bin_tax_code}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>First name</h6>
                <p>{item.first_name}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Last name</h6>
                <p>{item.second_name}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Email</h6>
                <p>{item.e_mail}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Phone number</h6>
                <p>{item.telephone}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Date</h6>
                <p>{item.date}</p>
              </div>
              <div className={clientinfo.con}>
                <h6 className={clientinfo.h6}>Time</h6>
                <p>{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
