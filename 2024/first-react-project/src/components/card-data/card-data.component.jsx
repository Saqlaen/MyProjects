import './card-data.styles.css';

// class CardData extends Component {
//     render() {
//         const { id, name, email } = this.props;
//       return (
        // <div>
        //   {/* // we use key attribute so react can optimize it more // suppose if
        //   you only change one obj in the state react doesn't have to re-render
        //   all the h1's it only has to go to the updated one and look at that key
        //   // under the hood react uses this key attribute */}
        //   <div className="card-container" key={id}>
        //     <img
        //       src={`https://robohash.org/${id}?set=set4&size=180x180`}
        //       alt={`${name}`}
        //     />
        //     <h2> {name}</h2>
        //     <p>{email}</p>
        //   </div>
        // </div>
//       );
//     }
// }

const CardData = ({ id, name, email } ) => {
    return (
        <div className="card-container" key={id}>
        {/* // we use key attribute so react can optimize it more // suppose if
          you only change one obj in the state react doesn't have to re-render
          all the h1's it only has to go to the updated one and look at that key
          // under the hood react uses this key attribute */}
          <img
            src={`https://robohash.org/${id}?set=set4&size=180x180`}
            alt={`${name}`}
          />
          <h2> {name}</h2>
          <p>{email}</p>
        </div>
    );
};

export default CardData;