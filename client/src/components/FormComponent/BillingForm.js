import React, { useState, useEffect } from 'react'
import { Button, Typography, Card, CardActionArea, CardContent, CardMedia, makeStyles, Modal } from '@material-ui/core'
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
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        boxShadow: 'black',
        padding: 150,

    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


export const BillingForm = () => {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [productCode, setProductCode] = useState('')
    const [productName, setProductName] = useState('')
    const [productSize, setProductSize] = useState('')
    const [occasionDate, setOccasionDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [returnTime, setReturnTime] = useState('')
    const [paidAmount, setPaidAmount] = useState(0)

    const [products, setProducts] = useState([]);
    const [findProd, setFindProd] = useState('');

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1)

    const [days, setDays] = useState(0)

    const [dailyCheck, setDailyCheck] = useState(false)
    const [weeklyCheck, setWeeklyCheck] = useState(false)
    const [monthlyCheck, setMonthlyCheck] = useState(false)
    const [rentalCheck, setRentalCheck] = useState(0)
    const dailyRental = days / 1

    const weeklyRental = Math.floor(days / 7)
    const weeklyRemaining = days % 7
    const [weeklyGreater, setWeeklyGreater] = useState(false)

    const monthlyRental = Math.round(days / 30)
    const monthlyRemaining = days % 30
    const [monthlyGreater, setMonthlyGreater] = useState(false)

    const advancePrice = price * 65 / 100

    const dailyRentalPrice = dailyRental * (price * 1 / 100) + "$"
    const weeklyRentalPrice = weeklyRental * (price * 5 / 100) + weeklyRemaining * (price * 1 / 100) + "$"
    const monthlyRentalPrice = monthlyRental * (price * 20 / 100) + monthlyRemaining * (price * 1 / 100) + "$"

    const maintenancePrice = quantity * 45

    // billing section
    const [billingPrice, setBillingPrice] = useState(0)
    // const billingPrice = advancePrice + rentalCheck + maintenancePrice
    useEffect(() => {
        if (dailyCheck) {
            setBillingPrice(advancePrice + (dailyRental * rentalCheck) + maintenancePrice)
        } else { setBillingPrice(advancePrice + maintenancePrice) }
    }, [advancePrice, dailyCheck])

    useEffect(() => {
        if (weeklyCheck) {
            setBillingPrice(advancePrice + ((weeklyRental * rentalCheck) + weeklyRemaining * (price * 1 / 100)) + maintenancePrice)
        } else { setBillingPrice(advancePrice + maintenancePrice) }
    }, [advancePrice, weeklyCheck])

    useEffect(() => {
        if (monthlyCheck) {
            setBillingPrice(advancePrice + ((monthlyRental * rentalCheck) + monthlyRemaining * (price * 1 / 100)) + maintenancePrice)
        } else { setBillingPrice(advancePrice + maintenancePrice) }

    }, [advancePrice, monthlyCheck])



    const refundAmount = advancePrice;

    useEffect(() => {
        const newReturnDate = returnDate.replace(/-/g, "/")
        const newOccasionDate = occasionDate.replace(/-/g, "/")
        // console.log(newReturnDate, newOccasionDate)

        const parseDate = (str) => {
            // var mdy = str.split('/');
            // console.log(mdy)
            // console.log(new Date(mdy[2], mdy[0] - 1, mdy[1]))
            // console.log(new Date(str))
            return new Date(str);
        }


        const datediff = (first, second) => {
            // Take the difference between the dates and divide by milliseconds per day.
            // Round to nearest whole number to deal with DST.
            const diffInMs = Math.abs(second - first);
            return Math.round((diffInMs) / (1000 * 60 * 60 * 24));
        }

        const daysFromDates = datediff(parseDate(newOccasionDate), parseDate(newReturnDate))
        setDays(daysFromDates)

    }, [returnDate, occasionDate])
    // console.log(days)


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
                        setProductCode(result[0].code)
                        setProductName(result[0].name)
                        setPrice(result[0].price)
                        setProductSize(result[0].size)
                    }
                })
                .catch(error => console.error('error', error));
            console.log(products)

        }
    }, [findProd])
    // console.log(dailyCheck)

    // useEffect(() => {


    // }, [])
    var postHeaders = new Headers();
    postHeaders.append("Authorization", "Token 8aa58cd6f9b3f0f6950cfad6e2d044090768c809");
    postHeaders.append('Content-Type', 'application/json')
    postHeaders.append('Accept', 'application/json')

    const invoiceId = customerName.toUpperCase() + productCode.toString() + occasionDate.toString()
    const postRequestOptions = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify({
            invoiceId: invoiceId,
            customerName: customerName,
            customerEmail: customerEmail,
            productCode: productCode,
            productName: productName,
            productSize: productSize,
            productPrice: price,
            quantity: quantity,
            occasionDate: occasionDate,
            returnDate: returnDate,
            returnTime: returnTime,
            rentalChoice: "later",
            advanceAmount: advancePrice,
            rentalAmount: rentalCheck,
            refundAmount: refundAmount,
            maintenanceAmount: maintenancePrice,
            billingAmount: billingPrice,
            paidAmount: paidAmount
        })
    };

    const submissionOn = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/invoice/', postRequestOptions)
            .then(async response => await response.json())
            .then(data => {
                alert(customerName + "!" + "Succesfully ordered. Thanks for using our service ")
                console.log(data)
            }).then(() => window.location.reload());
    }

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

    // console.log(days % 30)

    useEffect(() => {
        if (days < 7) {
            setWeeklyGreater(true)
        } else {
            setWeeklyGreater(false)
        }

        if (days < 30) {
            setMonthlyGreater(true)
        } else {
            setMonthlyGreater(false)
        }
    }, [days])

    return (
        <div className="billingFormContainer">
            {/*Form component*/}
            <form onSubmit={submissionOn} className="formContainer" > 
                <div>
                   <label>Name</label>
                   <input onChange={(e) => setCustomerName(e.target.value)} required className="textField" type="text" placeholder="Full Name" />
                </div>

                <div>
                   <label>Customer Email ID</label>
                   <input onChange={(e) => setCustomerEmail(e.target.value)} required className="textField" type="email" />
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
                   <input id="datepicker" required type="date" onChange={(e) => setOccasionDate(e.target.value)} />
                </div>

                <div>
                   <label>Return Date</label>
                   <input required onChange={(e) => setReturnDate(e.target.value)} type="date" />
                </div>

                <div>
                   <label>Return Time</label>
                   <input required type="time" onChange={(e) => setReturnTime(e.target.value)} />
                </div>

                

                <div style={{textAlign: 'center'}} >
                   <span style={{paddingRight: 10 + 'px',paddingLeft: 10 + 'px'}}>Daily</span>
                   <input disabled={weeklyCheck || monthlyCheck} className="dailyCheckbox" onClick={dailyCheckEvent} checked={dailyCheck} type="checkbox" />

                   <span style={{paddingRight: 10 + 'px',paddingLeft: 10 + 'px'}} className="weeklyText">Weekly</span>
                   <input disabled={weeklyGreater || dailyCheck || monthlyCheck } type="checkbox" onClick={weeklyCheckEvent} checked={weeklyCheck}/>

                   <span style={{paddingRight: 10 + 'px',paddingLeft: 10 + 'px'}} className="monthlyText">Monthly</span>
                   <input disabled={monthlyGreater || weeklyCheck || dailyCheck} type="checkbox" onClick={monthlyCheckEvent} checked={monthlyCheck}/>

                </div>

                <div>
                   <label>Advance Amount</label>
                   <input className="textField" type="text" value={advancePrice + "$"} disabled/>
                </div>

                <div>
                   <label>Rental Amount</label>
                   {!dailyCheck && !weeklyCheck && !monthlyCheck && (<input className="textField" type="text" value="0" disabled/>)}
                   {dailyCheck && (<input className="textField" type="text" value={dailyRentalPrice} disabled/>)}
                   {weeklyCheck && (<input className="textField" type="text" value={weeklyRentalPrice} disabled/>)}
                   {monthlyCheck && (<input className="textField" type="text" value={monthlyRentalPrice} disabled/>)}
                </div>

                <div>
                   <label>Refund Amount</label>
                   <input className="textField" type="text" value={refundAmount + "$"} disabled/>
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
                   <input onChange={(e) => setPaidAmount(e.target.value)} min="1" required className="textField" type="number"/>
                </div>

                <div style={{textAlign: 'center', marginTop: 2 + 'rem'}}>
                <Button variant="contained" color="secondary" className="formSubmitBtn" type="submit">Submit</Button>
                </div>
            </form>

               {/*Card component*/}
               { products && products.map(product => (
                  <Card key={product.code} className={classes.root}>
                   <CardActionArea>
                     <CardMedia
                       className={classes.media}
                        image={product.image}
                       title="Model Image"
                              />
                           <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                         {product.name}
                       </Typography>
                       <Typography variant="body2" color="textSecondary" component="p">
                        {product.description}
                       </Typography>
                     </CardContent>
                   </CardActionArea>
                 </Card>
                        
                        ))}


            <div>
              <Button variant="contained" type="button" onClick={handleOpen}>
                Invoice
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div style={modalStyle} className={classes.paper}>
                  <h2 id="simple-modal-title">Text in a modal</h2>
                  <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </p>
                  {/*<SimpleModal />*/}
                </div>
              </Modal>
            </div>
                 
        </div>
    )
}