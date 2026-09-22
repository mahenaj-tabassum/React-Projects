# 📸 React Image Slider

A simple React Image Slider that fetches images from an API and displays **one image at a time** with previous/next navigation and clickable indicator dots.

---

# 🧠 Logic: How an Image Slider Works

An image slider shows **only one image at a time**.

Instead of displaying all the images together, it keeps track of one question:

> **"Which image am I showing right now?"**

This is stored in the `currentSlide` state.

```jsx
const [currentSlide, setCurrentSlide] = useState(0);
```

### Visual Example

```text
Index:   0      1      2      3
       [📷1] [📷2] [📷3] [📷4]
          ↑
   currentSlide = 0
```

The displayed image is simply:

```jsx
images[currentSlide];
```

When `currentSlide` changes, React automatically shows the image at that index.

---

## 🔄 Navigation Logic

### Next Button

```jsx
setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
```

**Logic**

- If the current image is the **last image**, go back to the first image (`0`).
- Otherwise, move to the next image.

```text
0 → 1 → 2 → 3
↑             ↓
└─────────────┘
```

### Previous Button

```jsx
setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
```

**Logic**

- If the current image is the **first image**, jump to the last image.
- Otherwise, move one image backward.

```text
0 ← 1 ← 2 ← 3
↑             │
└─────────────┘
```

---

## 🔘 Indicator Dot Logic

Each dot represents one image.

```jsx
currentSlide === idx ? "bg-white" : "bg-gray-600";
```

- Active dot → White
- Inactive dot → Gray

Example:

```text
● ○ ○ ○
```

Clicking a dot updates `currentSlide` to that dot's index.

---

# ⚠️ Error Handling

When something goes wrong during `fetch()`, JavaScript creates an **Error object**.

Example:

```jsx
catch (err) {
  setErrorMsg(err.message);
}
```

### Where does `.message` come from?

`err` is an **Error object**, and `message` is one of its built-in properties.

Example Error object:

```js
{
  name: "TypeError",
  message: "Failed to fetch",
  stack: "..."
}
```

Using:

```jsx
err.message;
```

returns:

```text
"Failed to fetch"
```

---

## 🚀 Flow Summary

```text
Component Mounts
       │
       ▼
Fetch Images
       │
       ▼
Store in images[]
       │
       ▼
Show images[currentSlide]
       │
       ▼
User clicks:
   • Next
   • Previous
   • Dot Indicator
       │
       ▼
Update currentSlide
       │
       ▼
React re-renders the new image
```

---
