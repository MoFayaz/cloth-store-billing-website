import React from 'react'
import { Button } from '@material-ui/core'
import "./BillingForm.css"

export const BillingForm = () => {

    return (
        <div className="billingFormContainer">
            <form className="formContainer" > 
                <div>
				   <label>Name</label>
				   <input required className="textField" type="text" placeholder="Full Name" />
				</div>

				<div>
				   <label>Customer Email ID</label>
				   <input required className="textField" type="email" />
				</div>

				<div>
				   <label>Product ID</label>
				   <input required className="textField" type="text" />
				</div>

				<div>
				   <label>Product Name</label>
				   <input className="textField" type="text" placeholder="Product Name" />
				</div>

				<div>
				   <label>Product Cost</label>
				   <input className="textField" type="text" disabled value="10$" />
				</div>

				<div>
				   <label>Size & Fit</label>
				   <select required>
				       <option disabled selected>Select the size</option>
					   <option>2XL</option>
					   <option>3XL</option>
					   <option>4XL</option>
				   </select>
				</div>

				<div>
				   <label>Quantity</label>
				   <input required className="textField" type="number"/>
				</div>

				<div>
				   <label>Occasion Date</label>
				   <input required type="date" />
				</div>

				<div>
				   <label>Return Time</label>
				   <input required type="time" />
				</div>

				<div>
				   <label>Return Date</label>
				   <input required type="date" />
				</div>

				<div>
				   <label>Return Date</label>
				   <input required type="date" />
				</div>

				<div>
				   <label>Daily</label>
				   <input  type="checkbox" />
				   
				   <label>Weekly</label>
				   <input type="checkbox" />
				   
				   <label>Monthly</label>
				   <input type="checkbox" />
				   
				</div>

				<div>
				   <label>Advance Amount</label>
				</div>

				<div>
				   <label>Refund Amount</label>
				   <input className="textField" type="text" value="20.5$" disabled/>
				</div>

				<div>
				   <label>Maintenance Amount</label>
				   <input className="textField" type="text" value="25$" disabled/>
				</div>

				<div>
				   <label>Billing Amount</label>
				   <input className="textField" type="text" value="25$" disabled/>
				</div>

				<div>
				   <label>Paid Amount</label>
				   <input required className="textField" type="number"/>
				</div>

				<Button variant="contained" color="default" className="formSubmitBtn" type="submit">Submit</Button>
			</form>
		</div>
    )
}