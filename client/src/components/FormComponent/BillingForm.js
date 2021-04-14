import React, { useState, useEffect } from 'react'
import { Button, Typography, Card, CardActionArea, CardContent, CardMedia, makeStyles } from '@material-ui/core'
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

    const [products, setProducts] = useState([]);
    const [findProd, setFindProd] = useState('');

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1)

    const [dailyCheck, setDailyCheck] = useState(false)
    const [weeklyCheck, setWeeklyCheck] = useState(false)
    const [monthlyCheck, setMonthlyCheck] = useState(false)
    const [rentalCheck, setRentalCheck] = useState(0)

    const advancePrice = price * 65 / 100
    const dailyRefundPrice = price * 1 / 100 + "$"
    const weeklyRefundPrice = price * 5 / 100 + "$"
    const monthlyRefundPrice = price * 20 / 100 + "$"
    const maintenancePrice = quantity * 45
    const billingPrice = advancePrice + rentalCheck + maintenancePrice

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 8aa58cd6f9b3f0f6950cfad6e2d044090768c809");
    myHeaders.append('Content-Type', 'application/json')


    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    useEffect(() => {
        if (findProd.length != 0) {
            fetch("http://127.0.0.1:8000/products/" + findProd.toUpperCase(), requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.length != 0) {
                        setProducts(result)
                        setPrice(result[0].price)
                    }
                })
                .catch(error => console.error('error', error));
            console.log(products)

        }
    }, [findProd])
    // console.log(dailyCheck)

    const dailyCheckEvent = () => {
        setDailyCheck(!dailyCheck)
        if (dailyCheck == true) { setRentalCheck(0) } else { setRentalCheck(price * 1 / 100) }
        // console.log(rentalCheck)
    }
    const weeklyCheckEvent = () => {
        setWeeklyCheck(!weeklyCheck)
        if (weeklyCheck == true) { setRentalCheck(0) } else { setRentalCheck(price * 5 / 100) }

        // console.log(rentalCheck)
    }
    const monthlyCheckEvent = () => {
        setMonthlyCheck(!monthlyCheck)
        if (monthlyCheck == true) { setRentalCheck(0) } else { setRentalCheck(price * 20 / 100) }

        // console.log(rentalCheck)
    }

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
				   <input onChange={(e) => setFindProd(e.target.value)} required className="textField" type="text" />
				</div>

				<div>
				   <label>Product Name</label>
                    { products && products.map(product => (
                    	<input key={product.code} value={product.name} disabled className="textField" type="text"/>
                    	))}
				   
				</div>

				<div>
				   <label>Size & Fit</label>
				   <select required>
				       <option disabled selected>Select the size</option>
				       { products && products.map(product => (
                    	<option key={product.code}>{product.size}</option>
                    	))}					   
				   </select>
				</div>

				<div>
				   <label>Product Cost</label>
				   { products && products.map(product => (
				   	<input key={product.code} onChange={(e) => console.log(e.target.value)} className="textField" type="text" disabled value={product.price + "$"} />
                    	))}
				   
				</div>

				<div>
				   <label>Quantity</label>
				   <input required min="1" onChange={(e) => setQuantity(e.target.value)} className="textField" type="number"/>
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

				<div style={{textAlign: 'center'}} >
				   <span style={{paddingRight: 10 + 'px',paddingLeft: 10 + 'px'}}>Daily</span>
				   <input disabled={weeklyCheck || monthlyCheck} className="dailyCheckbox" onClick={dailyCheckEvent} checked={dailyCheck} type="checkbox" />
				   
				   <span style={{paddingRight: 10 + 'px',paddingLeft: 10 + 'px'}} className="weeklyText">Weekly</span>
				   <input disabled={dailyCheck || monthlyCheck} type="checkbox" onClick={weeklyCheckEvent} checked={weeklyCheck}/>
				   
				   <span style={{paddingRight: 10 + 'px',paddingLeft: 10 + 'px'}} className="monthlyText">Monthly</span>
				   <input disabled={weeklyCheck || dailyCheck} type="checkbox" onClick={monthlyCheckEvent} checked={monthlyCheck}/>
				   
				</div>

				<div>
				   <label>Advance Amount</label>
				   <input className="textField" type="text" value={advancePrice + "$"} disabled/>
				</div>

				<div>
				   <label>Refund Amount</label>
				   {!dailyCheck && !weeklyCheck && !monthlyCheck && (<input className="textField" type="text" value="0" disabled/>)}
				   {dailyCheck && (<input className="textField" type="text" value={dailyRefundPrice} disabled/>)}
				   {weeklyCheck && (<input className="textField" type="text" value={weeklyRefundPrice} disabled/>)}
				   {monthlyCheck && (<input className="textField" type="text" value={monthlyRefundPrice} disabled/>)}
				</div>

				<div>
				   <label>Maintenance Amount</label>
				   <input className="textField" type="text" value={maintenancePrice + "$"} disabled/>
				</div>

				<div>
				   <label>Billing Amount</label>
				   <input className="textField" type="text" value={billingPrice + "$"} disabled/>
				</div>

				<div>
				   <label>Paid Amount</label>
				   <input required className="textField" type="number"/>
				</div>

				<div style={{textAlign: 'center', marginTop: 2 + 'rem'}}>
				<Button variant="contained" color="secondary" className="formSubmitBtn" type="submit">Submit</Button>
				</div>
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