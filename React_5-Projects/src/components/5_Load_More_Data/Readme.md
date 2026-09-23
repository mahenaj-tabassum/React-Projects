# Load More Data Button

A React project that demonstrates how to implement a Load More button using useEffect, useState, and data fetching from the DummyJSON API. Instead of displaying all products at once, the application loads products in batches of 20, appending new data each time the button is clicked until 100 products have been displayed.

# Project Logic

## How the Load More Button Works

The application does not render all products immediately. Instead, it keeps track of how many batches have been requested and fetches the next batch whenever the user presses Load More.

## State Management

### 1. _products_

```
const [products, setProducts] = useState([]);
```

Purpose:

- Stores every fetched product.
- New products are appended instead of replacing existing ones.

#### Appending logic:

```
setProducts(prev => [...prev, ...result.products]);
```

- Why spread (...)?

* prev keeps old products.
* ...result.products adds every new product individually.
* Prevents nested arrays.

### 2. _count_

```
const [count, setCount] = useState(0);
```

Purpose:

- Tracks which batch should be fetched.

API uses:

```
skip = {count × 20}
```

## useEffect Logic

- Why useEffect?

* Data should be fetched after the component renders.
* The dependency array contains count.

Meaning:

- Runs once initially.
- Runs again whenever count changes.

## Data Fetching Logic

The API request:

```
https://dummyjson.com/products?limit=20&skip=${count * 20}
```

---
# "Load more Data" Button
A *Load More* button displays only a portion of the data initially instead of rendering everything at once.


## The implementation typically follows these steps:

1. Store the complete dataset in a state or variable.

2. Maintain a **visibleCount** state that determines how many items should currently be displayed.

3. Render only the required subset of the data using `Array.prototype.slice(0, visibleCount).`

4. When the user clicks the **Load More** button, increase `visibleCount` by a fixed increment, allowing additional items to become visible.

5. Hide or disable the button once `visibleCount` reaches or exceeds the total number of available items.



---

### Step - 1: Store all data
```
const products = [...]
```
### Step - 2: Track how may items are visible
```
const [visibleCount, setVisibleCount] = useState(6)
```
`visibleCount` represents the number of items currently displayed.
### Step - 3: Show only part of the array
```
products.slice(0, visibleCount)
```
### Step - 4: Increase the visible count
When the "Load More" Button gets clicked, load more data
```
setVisibleCount(prev => prev + 6)
```
Using `prev` ensures the state updates safely based on the previous value.
### Step - 5: Hide the button
Once every item has display, hide the button
```
visibleCount >= products.length => // Hide the button
```

