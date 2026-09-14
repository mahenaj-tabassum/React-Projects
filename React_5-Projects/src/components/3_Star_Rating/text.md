# ⭐ Star Rating

## 🎯 Goal

Build a reusable **Star Rating** component where:

* Clicking a star selects that rating.
* Selected stars become **yellow**.
* Hovering over a star temporarily highlights that star and all previous stars.
* When the mouse leaves, the hover effect disappears.
* If a rating was already selected, the selected rating remains visible after leaving.

---

# 🧠 The Big Picture

There are two different things we need to track:

1. **Selected rating** → What rating did the user actually choose?
2. **Hovered star** → Which star is the user currently pointing at?

Because these are two different actions, we need **two different states**.

---

# 📦 State

### `rating`

Stores the star that the user has selected by clicking.

```js
const [rating, setRating] = useState(0);
```

Example:

```text
User clicks ⭐⭐⭐⭐⭐

rating = 5
```

---

### `hover`

Stores the star that the user's mouse is currently hovering over.

```js
const [hover, setHover] = useState(0);
```

Example:

```text
User moves mouse over the 4th star

hover = 4
```

The `hover` state is temporary.

---

# 🔢 Step 1 — Decide How Many Stars to Display

The component receives the number of stars through props.

```js
const StarRating = ({ numOfStars = 8 }) => {
```

If:

```js
numOfStars = 8
```

we need to display:

```text
⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
```

The default value is `8` in case no value is provided.

---

# 🔁 Step 2 — Create the Stars

We need to create an array whose length is equal to `numOfStars`.

For example:

```js
Array.from({ length: numOfStars })
```

If:

```js
numOfStars = 5
```

the array behaves like:

```text
[undefined, undefined, undefined, undefined, undefined]
```

We don't actually care about the values.

We mainly need the **index**.

Then:

```js
Array.from({ length: numOfStars }).map((_, index) => ...)
```

The `map()` gives us:

```text
index = 0
index = 1
index = 2
index = 3
index = 4
```

But users think about ratings as:

```text
1st star
2nd star
3rd star
4th star
5th star
```

So we use:

```js
index + 1
```

Now the values become:

```text
1
2
3
4
5
```

### Important idea

`index` starts from `0`, but our star position should start from `1`.

```js
index + 1
```

---

# ⭐ Step 3 — Render the Star Icon

Inside the `map()`, render the `StarIcon`.

Conceptually:

```text
map
 ↓
current star
 ↓
StarIcon
```

Each star needs to know its own position.

For example:

```text
Star 1 → index 1
Star 2 → index 2
Star 3 → index 3
Star 4 → index 4
Star 5 → index 5
```

This position will be used by the event handlers and styling logic.

---

# 🖱️ Step 4 — Handle Star Events

Each star needs three important event handlers:

```text
onClick
onMouseEnter
onMouseLeave
```

Each handler needs to know **which star** the user interacted with.

So we pass the current star's position.

---

# 🖱️ `onClick`

### Goal

When the user clicks a star, update the selected rating.

Example:

```text
User clicks star 4
        ↓
rating = 4
```

The basic idea:

```js
const handleClick = (currentIndex) => {
    setRating(currentIndex);
};
```

So:

```text
Click 1st star → rating = 1
Click 3rd star → rating = 3
Click 7th star → rating = 7
```

---

# 👆 `onMouseEnter`

### Goal

When the user moves the mouse over a star, store that star's position in `hover`.

Example:

```text
Mouse enters star 4
        ↓
hover = 4
```

Conceptually:

```js
const handleMouseEnter = (currentIndex) => {
    setHover(currentIndex);
};
```

Now the UI can temporarily highlight:

```text
⭐ ⭐ ⭐ ⭐
```

because the user is hovering over the 4th star.

---

# 🚪 `onMouseLeave`

### Goal

When the mouse leaves a star, remove the temporary hover state.

Conceptually:

```js
const handleMouseLeave = () => {
    setHover(0);
};
```

Now:

```text
hover = 0
```

The component goes back to showing the actual selected rating.

For example:

```text
Selected rating = 3

Before hover:
⭐ ⭐ ⭐ ☆ ☆

Hover over 5:
⭐ ⭐ ⭐ ⭐ ⭐

Mouse leaves:
⭐ ⭐ ⭐ ☆ ☆
```

---

# 🎨 Step 5 — Decide Which Stars Should Be Yellow

This is the most important part of the project.

For every star, we need to ask:

> "Should this star be highlighted?"

We compare the current star's position with:

```text
hover
rating
```

The basic condition is:

```js
currentIndex <= hover || currentIndex <= rating
```

In other words:

```text
If current star is before/equal to the hovered star
OR
current star is before/equal to the selected rating
```

then highlight it.

---

# 🧩 Why `hover` and `rating` Both Matter

Suppose the user has selected 3 stars:

```text
rating = 3
hover = 0
```

Display:

```text
⭐ ⭐ ⭐ ☆ ☆
```

Now the user moves the mouse over star 5:

```text
rating = 3
hover = 5
```

Display temporarily becomes:

```text
⭐ ⭐ ⭐ ⭐ ⭐
```

Now the mouse leaves:

```text
rating = 3
hover = 0
```

Display returns to:

```text
⭐ ⭐ ⭐ ☆ ☆
```

This is why we need **both states**.

---

# 🔄 Complete Interaction Flow

```text
                 STAR RATING
                      │
                      ▼
              How many stars?
                      │
                      ▼
              Create star array
                      │
                      ▼
              map through array
                      │
                      ▼
              index + 1
                      │
                      ▼
                Render Star
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       onClick    onMouseEnter  onMouseLeave
          │           │           │
          ▼           ▼           ▼
       rating       hover       hover = 0
          │           │
          └──────┬────┘
                 ▼
          Check styling
                 │
                 ▼
   currentIndex <= hover OR rating
                 │
          ┌──────┴──────┐
          ▼             ▼
       Highlight      Normal
          ⭐             ☆
```

---

# 🧠 Important Concepts Learned

This project is not only about creating stars.

### 1. State

We use two states for two different responsibilities:

```js
rating
hover
```

---

### 2. Rendering Dynamic Elements

Instead of manually writing:

```jsx
<StarIcon />
<StarIcon />
<StarIcon />
<StarIcon />
<StarIcon />
```

we dynamically create them using:

```js
Array.from({ length: numOfStars }).map(...)
```

---

### 3. Array Index

`map()` gives us an index starting at `0`.

Because our star positions start at `1`, we use:

```js
index + 1
```

---

### 4. Event Handlers

Each star responds to:

```text
click
mouse enter
mouse leave
```

And each event needs to know **which star** triggered it.

---

### 5. Conditional Styling

The visual state of each star depends on a condition.

```text
Is this star within the selected/hovered range?
        │
   ┌────┴────┐
  YES       NO
   │          │
 yellow     normal
```

---

# ⚠️ Edge Cases to Think About

Before considering the component finished, think about:

### `numOfStars = 0`

What should happen?

```text
No stars
```

---

### Negative number

What should happen if someone passes:

```js
numOfStars = -5
```

Should the component reject it or use a default?

---

### Very large number

What happens if:

```js
numOfStars = 100
```

The component technically can render them, but the UI may become awkward.

---

### Clicking the same star

Example:

```text
rating = 4

User clicks star 4 again
```

Should it:

```text
remain 4
```

or:

```text
reset to 0
```

This is a design decision.

---

# 🎯 Core Mental Model

The easiest way to remember this project:

```text
rating = What did I select?

hover = What am I currently pointing at?

currentIndex = Which star am I currently rendering?
```

Then:

```text
currentIndex
      │
      ▼
Compare with hover/rating
      │
      ▼
Should this star be highlighted?
```

That's the entire core logic of the Star Rating component.
