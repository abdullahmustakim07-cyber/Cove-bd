# COVE — Free Streetwear Store

This is a static storefront designed for GitHub Pages.

## Before publishing
1. Open `script.js`.
2. Find `whatsappNumber` near the top.
3. Replace `8801XXXXXXXXX` with your WhatsApp number including Bangladesh country code `880`, without `+` or spaces.
4. Edit the sample products in `STORE.products` (names, prices, categories, sizes).
5. The current product art uses typographic placeholders. Replace those with real product photos when ready.

## Publish free with GitHub Pages
1. Sign in to GitHub and create a new **Public** repository named `cove-store` (or any name).
2. Upload `index.html`, `style.css`, and `script.js` to the repository's root.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish. Your site URL will look like:
   `https://YOUR-USERNAME.github.io/cove-store/`

If you name the repository exactly `YOUR-USERNAME.github.io`, the URL can be:
`https://YOUR-USERNAME.github.io/`

## Ordering
The cart runs in the browser. Checkout creates a WhatsApp message containing the selected items and subtotal. It does not collect or store customer data on a server, and it does not process online payments. Confirm delivery charges and payment details directly with the customer.

## Free domain note
GitHub Pages provides a free `github.io` subdomain. A custom `.com` domain normally costs money.
