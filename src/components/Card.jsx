function Card(props) {

  return (

    <div className="card">

      <div className="card-top">

        <h3>{props.titulo}</h3>

        <span className="card-icon">
          {props.icone}
        </span>

      </div>

      <p>{props.valor}</p>

    </div>

  );
}

export default Card;