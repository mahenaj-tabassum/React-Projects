# 📂 React Project Notes – Accordion

## 🧠 Problem-Solving Mindset

Before writing any code, always ask:

- Always explain the approach that you are going to use.
- How are you going to solve this particular problem
- What approach am I going to use?
- How will I solve this particular problem?
- What are the possible edge cases?

### Edge Cases to Consider

- No accordion item is selected.
- Clicking an already opened accordion should close it.
- Switching between Single and Multi mode should behave correctly.
- Empty data should show **"No data found."**

---

## 📌 The Big Picture

This project has **one accordion**, but it can work in **two different modes**.

### 1. Single Selection Mode

- Only **one panel** can stay open at a time.
- Opening a new panel automatically closes the previous one.

### 2. Multi Selection Mode

- Multiple panels can stay open.
- Each panel opens and closes independently.

---

## 🗂️ State Management

The accordion uses **three pieces of state**, each with a different responsibility.

The state (3 pieces)
- selected             = holds one id          - "which panel is open"             // single mode
- multiSelect          = holds an array of ids - "which panels are open            // Multi mode
- enableMultiSelection = boolean               - "which mode are we in right now"  // Decides which of the above two to use


---

## 🔄 Overall Flow

The entire project works like this:

```text
Button changes the mode
        ↓
Mode decides which click handler should run
        ↓
Click handler updates the correct state
        ↓
React re-renders
        ↓
The render checks the updated state
        ↓
The correct accordion answer is shown or hidden
```

---

## 🎯 One-Sentence Summary

> The button switches the mode, the mode chooses the correct click handler, the click handler updates the appropriate state, and React re-renders to show or hide the correct accordion panel.



Example for Accordion:

01. Create the three states.
02. Make single selection work.
03. Make multi selection work.
04. Add the mode switch.