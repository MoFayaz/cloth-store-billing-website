import React, { useState } from 'react'
import { Button, makeStyles, Modal, TextField } from '@material-ui/core'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        border: 'none',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 5, 7),
    },
}));

export const InvoiceModal = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [getInvoiceCode, setGetInvoiceCode] = useState('')

    const getInvoice = () => {
        fetch('http://127.0.0.1:8000/invoice/' + getInvoiceCode.toUpperCase())
            .then(async response => await response.json())
            .then(data => {
                console.log(data)

                const doc = new jsPDF('landscape');

                doc.setFont("courier", "bold");
                doc.setFontSize(30);
                doc.text(String(data[0].customerName), 10, 10);
                doc.setFontSize(10);
                doc.text(String(data[0].customerEmail), 150, 10);

                doc.autoTable({
                    head: [
                        [
                            'Product Code',
                            'Product Name',
                            'Product Size',
                            'Product Price',
                            'Quantity',
                            'Occasion Date',
                            'Return Date',
                            'Return Time',
                            'Advance Amount',
                            'Rental Amount',
                            'Refund Amount',
                            'Maintanence Amount',
                            'Billing Amount',
                            'Paid Amount'

                        ]
                    ],
                    body: [
                        [
                            String(data[0].productCode),
                            String(data[0].productName),
                            String(data[0].productSize),
                            String(data[0].productPrice),
                            String(data[0].quantity),
                            String(data[0].occasionDate),
                            String(data[0].returnDate),
                            String(data[0].returnTime),
                            String(data[0].advanceAmount),
                            String(data[0].rentalAmount),
                            String(data[0].refundAmount),
                            String(data[0].maintenanceAmount),
                            String(data[0].billingAmount),
                            String(data[0].paidAmount),

                        ],
                    ],
                })

                doc.save(String(data[0].invoiceId));
            })
    }
    console.log(String(454))

    return (
        <div>
        <Button color="primary" style={{marginTop:50,marginLeft: 20}} variant="contained" type="button" onClick={handleOpen}>
                Invoice
        </Button>
        <Modal open={open} onClose={handleClose}  
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div style={modalStyle} className={classes.paper}>
            <h2 style={{marginBottom:20}} id="simple-modal-title">Get your Invoice</h2>
            {/*<p id="simple-modal-description"></p>*/}
            <TextField style={{marginBottom:30}} value={getInvoiceCode.toUpperCase()} onChange={(e) => setGetInvoiceCode(e.target.value)} label="Type your invoice code" variant="filled" />
            <Button disabled={getInvoiceCode == ''} onClick={getInvoice} color="primary" variant="contained" type="button">
                Download
            </Button>
        </div>
        </Modal> 
         </div>
    );
}