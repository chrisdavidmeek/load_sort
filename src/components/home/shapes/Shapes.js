import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSort } from "../../../redux/reducer/actions/setActions";
import Modal from "react-modal";

//I found this on git hub (using Modals for a basic start up)
//github.com/reactjs/react-modal#examples
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("body");
const Shapes = () => {
  const [shapeHeros, setShapeHeros] = React.useState([]); //starting point of array needed to be empty so we can populate it with sort.
  const shapes = useSelector(state => state.list);
  const sort = useSelector(state => state.sort); //sort is a prop of state that has property type: { toggle: false, val []} so...if toggle is true, val is populated?
  const dispatch = useDispatch();

  const [props, setProps] = React.useState({});
  const [active, setActive] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    let sortedList = shapes;

    for (let i in sort) {
      //let i in sort...does that mean...declare empty var...i?
      if (sort[i].toggle) {
        sortedList = sortedList.filter(it => {
          return sort[i].val.includes(it[i]);
        });
      }
    }
    setShapeHeros(sortedList);
  }, [sort, shapes]);

  let shapesEle = shapeHeros.map((item, idx) => {
    return (
      <div key={idx}>
        <h1>{item.name}</h1>
        <h3>{item.type}</h3>
        <h3>{item.color}</h3>
        <h3>{item.value}</h3>
        <button onClick={() => showInfo(item)}>Show More Info</button>
      </div>
    );
  });
  const showInfo = item => {
    console.log(item);
    setActive(!active);
    openModal(item);
    setProps({ ...item });
  };
  return (
    <div>
      <h2>By Shapes</h2>
      <button onClick={() => dispatch(changeSort("type", "polygon"))}>
        Polygons
      </button>
      <button onClick={() => dispatch(changeSort("type", "triangle"))}>
        Triangles
      </button>
      <button onClick={() => dispatch(changeSort("type", "square"))}>
        Sqaures
      </button>
      <br />
      <div className="colorButtons">
        <h2>By Color</h2>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => dispatch(changeSort("color", "red"))}
        ></button>
        <button
          style={{ backgroundColor: "blue" }}
          onClick={() => dispatch(changeSort("color", "blue"))}
        ></button>
        <button
          style={{ backgroundColor: "green" }}
          onClick={() => dispatch(changeSort("color", "green"))}
        ></button>
        <button
          style={{ backgroundColor: "orange" }}
          onClick={() => dispatch(changeSort("color", "orange"))}
        ></button>
        <button
          style={{ backgroundColor: "pink" }}
          onClick={() => dispatch(changeSort("color", "pink"))}
        ></button>
        <button
          style={{ backgroundColor: "purple" }}
          onClick={() => dispatch(changeSort("color", "purple"))}
        ></button>
      </div>
      <br />
      <div className="costButtons">
        <h2> By Cost</h2>
        <button onClick={() => dispatch(changeSort("value", "value" > 25))}>
          Less than 25
        </button>
        <button
          onClick={() =>
            dispatch(changeSort("value", "value" ? "value" < 25 : null))
          }
        >
          More than 25
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div style={{ backgroundColor: props.color }}>
          <h1>{props.name}</h1>
          <h2>{props.type}</h2>
          <h2>{props.value}</h2>
          <h2>{props.color}</h2>
        </div>

        <button onClick={() => closeModal()}>Close</button>
      </Modal>
      {shapesEle}
    </div>
  );
};

export default Shapes;
