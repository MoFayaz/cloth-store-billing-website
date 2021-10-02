# Rental Store Billing Calculation 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Structure](#structure)
* [Setup](#setup)

## General info
A billing page of a cloth store which enables 
* Can get the product for purchase by product's unique ID
* Can choose quantity, size & variants of that product.
* Can select how many days for rental of that product
* It calculates the Rental amount (Daily/Weekly/Monthly), Advance amount & Maintenance amount, According to the number of days users chose.
* After the placement of order, User can get the invoice in pdf form
	
## Technologies
Project is created with:
* React 17.0.1 (Frontend)
* Django 3.1.7 (Backend)
* MySQL 8.0
* Bootstrap 4 

## Structure

| Codebase             |      Description      |
| :------------------- | :-------------------: |
| [Client](client)       |      React JS frontend      |
| [Server](server) |     Django API      |

## Setup
To run the client:
```
npm install
npm start
```
To run the server:
```
pip install -r requirements.txt
python manage.py runserver
```
Note: Change the database configuration in server/src/wege/settings.py  DATABASES.


