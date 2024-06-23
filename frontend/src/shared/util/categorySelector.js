const categorySelector = (cid) => {
  let category;
  switch (cid){
    case 1: 
      category = "TOP";
      break; 
    case 2:
      category = "OUTER";
      break;
    case 3:
      category = "SHIRTS"; 
      break;
    case 4:
      category = "PANTS"; 
      break; 
    case 5:
      category = "HAT"; 
      break; 
    case 6:
      category = "BAG"; 
      break; 
    case 7:
      category = "SHOES"; 
      break; 
    default:
      category = false; 
      break;
  }
  return category;
};

export default categorySelector;