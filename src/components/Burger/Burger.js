import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  let transformedIngredients = [];
  Object.keys(props.ingredients).forEach((cur) => {
    for(let i=0; i<props.ingredients[cur]; i++){
      transformedIngredients.push(<BurgerIngredient key={cur + i} type={cur}/>)
    }
  });

  if(transformedIngredients.length === 0){
    transformedIngredients = <p>Please start adding ingredients</p>
  };

  return(
    <div className = {classes.Burger}>
      <BurgerIngredient type="bread_top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread_bottom"/>
    </div>
  );
};

export default burger;
