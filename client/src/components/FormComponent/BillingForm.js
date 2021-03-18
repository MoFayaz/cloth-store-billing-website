import React from 'react'
import { Button, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles } from '@material-ui/core'
import "./BillingForm.css"

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        width: 400,
        height: 600,
        marginTop: 50,
        marginLeft: 50
    },
    media: {
        height: 500,
        width: '100%',
        objectFit: 'cover'
    },
});

export const BillingForm = () => {
    const classes = useStyles();

    return (
        <div className="billingFormContainer">
            {/*Form component*/}
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

		       {/*Card component*/}

				 <Card className={classes.root}>
    			   <CardActionArea>
    			     <CardMedia
    			       className={classes.media}
             		   image="https://rukminim1.flixcart.com/image/714/857/jped7rk0/sari/q/a/j/free-omt303b-model-madness-original-imafbnz5ztzfbqch.jpeg?q=50"
    			       title="Model Image"
           		           />
   			   		 <CardContent>
           		       <Typography gutterBottom variant="h5" component="h2">
    			         Cotton Saree
    			       </Typography>
    			       <Typography variant="body2" color="textSecondary" component="p">
    			         Pattu baarambariyam
    			       </Typography>
    			     </CardContent>
    			   </CardActionArea>
    			 </Card>
		</div>
    )
}