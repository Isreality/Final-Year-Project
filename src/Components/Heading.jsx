import "../style.css";

const Heading = (props) => {
    return ( 
        <>
          <div className="flex flex-row">
            <h1 className="text-primary text-2xl font-semibold">{props.title}</h1>
          </div>           
        </>
     );
}
 
export default Heading;
