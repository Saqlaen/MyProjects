import './cardList.styles.css';
import CardData from "../card-data/card-data.component";

// class CardList extends Component {
//     render(){  
//         const { listToRender } = this.props; 
//         return (
        //   <div className="card-list">
        //     {listToRender.map((ele) => {
        //         const { name, email, id } = ele
        //         return (
        //           <CardData
        //             id={id}
        //             name={name}
        //             email={email}
        //           />
        //         );})}
        //   </div>
//         );
//     }
// }

const CardList = ( { listToRender }  ) => {
    return (
      <div className="card-list">
        {listToRender.map((ele) => {
          const { name, email, id } = ele;
          return <CardData id={id} name={name} email={email} />;
        })}
      </div>
    );
}
export default CardList;