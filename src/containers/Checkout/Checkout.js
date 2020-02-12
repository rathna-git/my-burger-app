import React, { Component } from 'react';
import { connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';



class Checkout extends Component {

    checkoutContinuedHandler = () =>{
      this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
      this.props.history.goBack();
    }

    render(){
      let summary = <Redirect to='/' />;
      if(this.props.ings){
        const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
        summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}/>
            <Route path = {this.props.match.path + '/contact-data'}
                   component = {ContactData}
            />
        </div>

        );
      }

      return summary;
   }
}

const mapsStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapsStateToProps)(Checkout);
// if you are only passing mapsDispatchtoProps to connect it has to be the second argument
//such as connect(null,mapsDispatchtoProps).
