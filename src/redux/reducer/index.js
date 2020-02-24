const initState = {
  toggle: false,
  sort: {
    type: { toggle: false, val: [] },
    color: { toggle: false, val: [] },
    value: { toggle: false, val: [] }
  },
  list: [
    {
      name: "Squarey",
      type: "polygon",
      color: "red",
      value: 10
    },
    {
      name: "Rectangle Man",
      type: "polygon",
      color: "orange",
      value: 20
    },
    {
      name: "Trap Trap",
      type: "polygon",
      color: "pink",
      value: 30
    },
    {
      name: "Triman",
      type: "triangle",
      color: "green",
      value: 15
    },
    {
      name: "RightTry",
      type: "triangle",
      color: "blue",
      value: 20
    },
    {
      name: "Ninety",
      type: "triangle",
      color: "red",
      value: 10
    },
    {
      name: "Block Brick",
      type: "square",
      color: "orange",
      value: 15
    },
    {
      name: "Trtinity",
      type: "triangle",
      color: "purple",
      value: 50
    }
  ]
};

const rootReducer = (state = initState, action) => {
  if (action.type === "CHANGE_SORT") {
    let orgArray = state.sort[action.prop].val; //= state.sort(value being passed in products under 'changeSort').val state is the entire cart.
    if (orgArray.includes(action.val)) {
      // if this array (which was sorted based on the prop) includes
      let ind = orgArray.indexOf(action.val); //get the index, assign it a position. then put it in the empty array.
      orgArray.splice(ind, 1);
    } else {
      orgArray.push(action.val);
    }

    let togg = orgArray.length > 0;

    return {
      ...state,
      sort: {
        ...state.sort,

        [action.prop]: {
          toggle: togg,
          val: orgArray
        }
      }
    };
  }

  return state;
};

export default rootReducer;
