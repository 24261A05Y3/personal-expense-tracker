# PERSONAL EXPENSE TRACKER

LIVE DEMO- https://personalexpensetrackerdevops.netlify.app

A single-page expense tracker styled like a paper ledger sheet. Add, edit, filter, and sort expenses, with a running total, per-category breakdown, and entry count — all saved locally in the browser.

## Features

- **Add expenses** with a description, amount, and category.
- **Edit or delete** any entry from the table.  
- **Filter by category** using the chip buttons (All, Food, Travel, Education, Shopping, Other).
- **Sort** the table by description, amount, or category (click a column header; click again to reverse direction).
- **Category breakdown** — a bar for each category showing its share of total spend.
- **Balance out total** — the sum of all expenses, shown at the top.
- **Entry count** — the total number of expenses ("N entries"), shown alongside the total.
- **Highest expense badge** — automatically flags the largest single expense in the table.
- **Persistence** — data is saved to the browser's `localStorage`, so it survives page reloads.

## Files

| File          | Purpose                                              |
|---------------|-------------------------------------------------------|
| `index.html`  | Page structure and layout                             |
| `style.css`   | Visual styling (paper-ledger theme, fonts, colors)     |
| `script.js`   | App logic — state, rendering,  filtering, sorting, storage |

## Getting Started

No build step or server required...

1. Keep all three files (`index.html`, `style.css`, `script.js`) in the same folder.
2. Open `index.html` in a web browser.

That's it — the app runs entirely client-side...

## Usage

1. Fill in **Description**, **Amount**, and **Category** in the left panel.
2. Click **Add expense** to save it to the table.
3. Click **Edit** on any row to load it back into the form (the button becomes **Update expense**); click **Delete** to remove it.
4. Use the category chips to filter the table.
5. Click any column header (**Description**, **Amount**, **Category**) to sort; click again to reverse the sort direction.

## Data Storage

All expenses are stored in the  browser's `localStorage` under the key `expenses`, as a JSON array of objects:

```json
{ "description": "Groceries", "amount": 850, "category": "Food" }
```

Because storage is   per-browser and per-device, data does not sync across devices and will be lost if browser storage is cleared.

## Currencyy

Amounts are displayed in Indian Rupees (₹). To use a different currency, replace the `₹` symbol in `index.html` and `script.js`.

## Browser Support

Works in any modern browser (Chrome, Firefox, Safari, Edge) with JavaScript and `localStorage` enabled.

## Customizationnn

- **Categories**: edit the `CATEGORIES` array in `script.js` and the matching `<option>` / chip elements in `index.html`.
- **Theme colors and fonts**: adjust the CSS custom properties at the top of `style.css` (`:root` block).
