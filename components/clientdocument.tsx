import clientaddress from "@/styles/clientaddress.module.scss";
export default function Clientdocument(props: any) {
  const response = props.info;

  if (response.length === 0) {
    return <h1 className={clientaddress.h1}>Client documents</h1>;
  }

  let newresponse = response[0].documents;

  return (
    <div>
      <h1 className={clientaddress.h1}>Client documents</h1>
      <div className={clientaddress.container}>
        {newresponse.map((items: string) => {
          return (
            <div className={clientaddress.con} key={items.length}>
              <h6 className={clientaddress.h6}>PDF</h6>
              <p>{items}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
