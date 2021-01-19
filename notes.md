# Code Review II

* Minimalist styling (is okay, but defintiely want anything we show off to be styled)


* Responsive Design
    * This needs to work _any_ and _all_ possible viewport sizes
    1) Define your breakpoints using chrome console
    2) Implement Media Queries 

* Vs Adaptive Design
    * Design for _specific devices_

* Need some message when checkout/add to card succeeds
    * Disable Button
    * Toast Notifaction > Alert


* Remove Redux Logger from deployed code
* remove console.logs from client-side code
* Lets format price as well


## MVP

* Great job!
* Just clean up w/ above notes if we want to share w/ employers


## Code Quality

* In general, lets omit commented-out code from Master (just delete it)
* Schema design seems a little thin, but it's working
* Remove Cart if we don't need it, but I wonder if we should reconfigure associations? 
    * In capitalist America, Property own you? (Why do Users belong to Properties?)


```
User.hasManyProperty({through : Order-Items})

User

id  name
0   Kat
1   Yakov
2   Smirnov

Property

id      name            u_id
0       Russian Dacha   1
1       Peach Palace    0
2       Kremlin         1

Order-items
// This way Yakov can own both Dacha and Kremlin

id  u_id    prop_id
0   1          0
0   1          2
```

* Judicious use of react-redux, nice slim components!
* great use of ComponentDidUpdate in forms to prevent infinite mounting loops

* Would like to see more testing....
* Nice as a personal branding tactic

* Sequelize: mocha/chai
* Express: Supertest, if stubbing out entire API + mocha/chai
* React: Enzyme
    * Developed by AirBNB
    * Simulates Virtual DOM render cycle, on server-side
    * enzyme `shallow()` to mock components
    * Test if Component Hierarchy/contents is as expected
    * Simulate state-changing events, and ensure state updates as expected
* Redux: mocha/chai
    *Action Creators, do they return the Object which we expect?
    * Action + Reducer, does it return updated state as expected?

* `stub`
    * Replacing a chunk of data 
    ```javascript
    let fakeAdmin = {id: 400, name: "Warren Buffet", isAdmin: true}
    req.user = fakeAdmin
    // now we can pass thru Auth gates!
    ```
* `spy`
    * Wraps a fn, and tells if you if that callback was invoked
    * Use `sinon` or write your own!
    * Cam be handy to see if lifecycle hooks, middleware fns, etc. are invoked

* `mocks`
    * Replacement for existing function
    * Good to avoid polluting your db
    ```javascript

    let mockCreateProperty = () => {id: 0, name: "Stunning Estates", price: "1BTC"}
    const fakeProperty = mockCreateProperty() // no need for Property.create()

    ```

## Remaining Tasks

* Front-end for inventory admins
* Seed properties on a massive scale! (faker.js will help you here)

## Feature Roadmap

* Styling
* UX Improvements
* Testing
* Tier II

promo code = "DrogosABogo" 50% off total order

* Form for Promo Code
* Validate correctness
* Update total

BONUS
* Admin can CRUD promo code for future sales
* Hide Promo Code from snooping users in browser or github repo
* Track orders w/ Promo Code use for marketing team to analyze