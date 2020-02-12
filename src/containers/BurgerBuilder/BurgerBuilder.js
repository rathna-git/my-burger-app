import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';


export class BurgerBuilder extends Component{
  state = {
    purchasing:false,
  }

componentDidMount(){
    this.props.onInitIngredients();
  }
//Instructor's approach
/*
updatePurchasable=(ingredients) => {
  const sum = Object.keys(ingredients)
              .map(igKey => {
                return ingredients[igKey];
              })
              .reduce((sum, el)=> {
                return sum + el;
              },0);
    this.setState({purchasable: sum > 0});
}
*/

//Better approach in 2018. (changed this method similar to Instructor's code after implementing Redux)
  updatePurchasable = (ingredients) => {
    //this.setState((prevState,props)=> {
      //const ingredients = {...prevState.ingredients}
      const sum = Object.keys(ingredients)
                  .map(igKey => (ingredients[igKey]))
                  .reduce((prevSum,curSum) => (prevSum + curSum), 0);
      return sum > 0;
  }

  purchaseHandler =() => {
    if(this.props.isAuthenticated){
      this.setState({purchasing:true});
    } else {
      this.props.onsetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }

  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false})
  }

    purchaseContinueHandler =()=> {
      //alert('YOU Continue!');
            this.props.onInitPurchase();
            this.props.history.push('/checkout');

    }
  render(){
    // disables Less button if ingredient is zero or less
    const disabledInfo = {...this.props.ings};
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // disables More button if ingredient is more than three
    const disabledMax = {...this.props.ings};
    for (let key in disabledMax){
      disabledMax[key] = disabledMax[key] >= 3
    }

    //let orderSummary = null;
  //  let burger =

    let orderSummary = null;
    let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients cannot be loaded</p> : <Spinner />;

    if(this.props.ings){
      burger = (
        <Fragment>
          <Burger ingredients = {this.props.ings}/>
          <BuildControls
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoved = {this.props.onIngredientRemoved}
            disabled = {disabledInfo}
            disMax = {disabledMax}
            purchasable ={this.updatePurchasable(this.props.ings)}
            price = {this.props.price}
            ordered = {this.purchaseHandler}
            isAuth = {this.props.isAuthenticated}/>
        </Fragment>
      );
      orderSummary = <OrderSummary
                      ingredients ={this.props.ings}
                      purchaseCancelled={this.purchaseCancelHandler}
                      purchaseContinued={this.purchaseContinueHandler}
                      price={this.props.price}/>;
    }

    if(this.state.loader){
      orderSummary = <Spinner />;
    }

    return(
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapsDispatchtoProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onsetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))

  }
}

export default connect(mapsStateToProps,mapsDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
