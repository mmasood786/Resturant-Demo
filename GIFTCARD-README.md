# 🎁 Gift Card System - Setup & Documentation

## Overview
Complete gift card system integrated with your restaurant website using **Supabase** as the backend.

---

## 📁 File Structure

```
sushiwarriors/
├── supabase-setup.sql                      ← SQL script for database setup
├── giftcard-purchase.html                  ← Purchase gift cards
├── giftcard-balance.html                   ← Check gift card balance
├── giftcard-success.html                   ← Purchase confirmation
├── admin/
│   ├── giftcards.html                      ← Admin panel
│   └── js/
│       └── giftcard-admin.js               ← Admin functionality
├── css/
│   └── giftcard.css                        ← Gift card styles
└── js/
    ├── supabase-config.js                  ← Supabase credentials
    ├── supabase-config-template.js         ← Configuration template
    ├── supabase-client.js                  ← Supabase API integration
    └── giftcard.js                         ← Gift card logic
```

---

## 🚀 Setup Instructions

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Sign up for a free account
3. Create a new project (or use existing one)
4. Wait for the database to be provisioned (~2 minutes)

### Step 2: Run Database Setup

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase-setup.sql` from your project
4. Copy the entire contents and paste into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. Verify success - you should see no errors

**What this creates:**
- `gift_cards` table - Stores all gift cards
- `gift_card_transactions` table - Transaction history
- `gift_card_settings` table - Configuration settings
- Database functions for validation, redemption, and creation
- Row Level Security (RLS) policies for data protection

### Step 3: Get API Credentials

1. In Supabase dashboard, go to **Project Settings** (gear icon)
2. Click on **API** in the left sidebar
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")

### Step 4: Configure Frontend

1. Open `js/supabase-config.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
  // Your Supabase project URL
  url: 'https://YOUR_PROJECT_ID.supabase.co',  // ← Replace this
  
  // Your Supabase anon/public key
  anonKey: 'YOUR_ANON_KEY_HERE',               // ← Replace this
  
  // Gift Card Settings (customize as needed)
  giftCard: {
    presetAmounts: [25, 50, 100, 200],
    minAmount: 10,
    maxAmount: 500,
    currencySymbol: '$',
    currencyCode: 'USD',
    enableExpiration: false,                    // Set true to enable
    expirationDays: 365,
    allowReload: true,
    maxCardsPerOrder: 3,
    whatsappNumber: '15551234567'              // ← Your WhatsApp number
  }
};
```

3. Save the file

### Step 5: Test the System

1. Open `giftcard-purchase.html` in your browser
2. Select an amount and fill in the form
3. Submit the form (will open WhatsApp with order details)
4. Check the admin panel at `admin/giftcards.html`

---

## 📖 Features

### For Customers

#### 1. **Purchase Gift Cards** (`giftcard-purchase.html`)
- Choose from preset amounts ($25, $50, $100, $200)
- Enter custom amount ($10 - $500)
- Add recipient details and personal message
- Live gift card preview
- Order via WhatsApp or pay at pickup

#### 2. **Check Balance** (`giftcard-balance.html`)
- Enter 16-digit gift card code
- View current balance and original amount
- See transaction history
- Check expiration date

#### 3. **Redeem at Checkout** (integrated in `cart.html`)
- Apply gift card code in cart
- Multiple gift cards per order (max 3)
- Partial payment support
- Real-time balance validation

#### 4. **Success Page** (`giftcard-success.html`)
- View gift card code after purchase
- Copy to clipboard
- Share via WhatsApp/email
- Next steps guidance

### For Admins

#### Admin Panel (`admin/giftcards.html`)

**Dashboard Statistics:**
- Total gift cards issued
- Active cards count
- Total outstanding balance
- Monthly transactions

**Gift Card Management:**
- View all gift cards in sortable table
- Search by code, recipient, or buyer
- Filter by active/inactive status
- Create new gift cards manually
- Activate/deactivate cards
- Export to CSV
- View transaction history

**Transaction Log:**
- Recent transactions across all cards
- Filter by type (purchase, redeem, reload, refund)
- Full audit trail

---

## 🔐 Security

### Row Level Security (RLS)

**Public Access:**
- ✅ Check gift card balance (read-only)
- ✅ View transaction history for specific card
- ✅ View settings

**Authenticated Users (Admins Only):**
- ✅ Create gift cards
- ✅ Update gift cards (activate/deactivate)
- ✅ Modify settings
- ✅ View all data

**Protected Operations:**
- Gift card creation uses database functions
- Redemption validates balance and status
- All transactions are logged immutably

### Best Practices

1. **Never expose your Supabase service_role key** in frontend code
2. **Keep RLS policies enabled** - they protect your data
3. **Regular backups** - Supabase provides automatic backups
4. **Monitor usage** - Check Supabase dashboard for unusual activity

---

## 💰 Payment Flow

### Current Implementation (WhatsApp Orders)

```
Customer purchases gift card
    ↓
Form submits to WhatsApp
    ↓
Restaurant confirms payment
    ↓
Restaurant creates gift card in admin panel
    ↓
Customer receives code via WhatsApp
    ↓
Customer redeems at checkout
```

### Future Enhancement (Online Payment)

To add online payments:

1. Integrate Stripe/PayPal
2. Add payment webhook handlers
3. Auto-create gift cards on successful payment
4. Email confirmation with gift card code

---

## 📊 Database Schema

### `gift_cards` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| card_code | VARCHAR(16) | Unique 16-digit code |
| balance | DECIMAL | Current balance |
| original_amount | DECIMAL | Initial purchase amount |
| is_active | BOOLEAN | Active/inactive status |
| purchased_by_* | VARCHAR | Buyer details |
| recipient_* | VARCHAR | Recipient details |
| personal_message | TEXT | Optional message |
| created_at | TIMESTAMP | Creation date |
| expires_at | TIMESTAMP | Expiration date (nullable) |

### `gift_card_transactions` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| gift_card_id | UUID | Foreign key |
| transaction_type | ENUM | purchase/redeem/reload/refund |
| amount | DECIMAL | Transaction amount |
| order_id | VARCHAR | Linked order reference |
| description | TEXT | Transaction description |
| created_at | TIMESTAMP | Transaction date |

### `gift_card_settings` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| setting_key | VARCHAR | Setting identifier |
| setting_value | JSONB | Setting value |
| description | TEXT | Setting description |

---

## 🛠️ Customization

### Change Preset Amounts

In `js/supabase-config.js`:
```javascript
presetAmounts: [25, 50, 100, 200]  // Change these values
```

Then update in `giftcard-purchase.html`:
```html
<button class="preset-btn" data-amount="25" onclick="GiftCardManager.selectPresetAmount(25)">$25</button>
<!-- Update amounts to match config -->
```

### Enable Expiration

In `js/supabase-config.js`:
```javascript
enableExpiration: true,           // Set to true
expirationDays: 365               // Days until expiration
```

Then run this in Supabase SQL Editor to update settings:
```sql
UPDATE gift_card_settings 
SET setting_value = '{"enabled": true, "days": 365}' 
WHERE setting_key = 'expiration';
```

### Change Currency

In `js/supabase-config.js`:
```javascript
currencySymbol: '€',              // Euro symbol
currencyCode: 'EUR',              // ISO currency code
```

### WhatsApp Number

Update to your business WhatsApp number (with country code, no + or spaces):
```javascript
whatsappNumber: '15551234567'     // Example: +1 (555) 123-4567
```

---

## 🐛 Troubleshooting

### "Supabase not initialized" Error

**Problem:** Gift card functions not working

**Solution:**
1. Check `js/supabase-config.js` has correct URL and anonKey
2. Verify Supabase SDK is loaded (check browser console)
3. Ensure internet connection is active

### Gift Card Not Found

**Problem:** "Invalid gift card code" when checking balance

**Solution:**
1. Verify code is entered correctly (16 digits)
2. Check if card exists in Supabase database
3. Verify RLS policies are configured correctly

### Cannot Create Gift Cards

**Problem:** Creation fails or shows error

**Solution:**
1. Check Supabase dashboard for errors
2. Verify database functions exist
3. Check browser console for detailed errors
4. Ensure RLS policies allow authenticated inserts

### Admin Panel Not Loading

**Problem:** Admin panel shows empty or errors

**Solution:**
1. Verify you're logged into Supabase (for authenticated access)
2. Check RLS policies allow admin operations
3. Review browser console for errors

---

## 📈 Analytics & Monitoring

### Supabase Dashboard

Monitor your gift card system:

1. **Database** - View table data and run queries
2. **Logs** - Check API usage and errors
3. **Auth** - Manage admin users (if enabled)
4. **Settings** - Configure project options

### Useful Queries

**Total gift cards issued:**
```sql
SELECT COUNT(*) FROM gift_cards;
```

**Total outstanding balance:**
```sql
SELECT SUM(balance) FROM gift_cards WHERE is_active = true;
```

**Most popular amounts:**
```sql
SELECT original_amount, COUNT(*) as count 
FROM gift_cards 
GROUP BY original_amount 
ORDER BY count DESC;
```

**Recent redemptions:**
```sql
SELECT * FROM gift_card_transactions 
WHERE transaction_type = 'redeem' 
ORDER BY created_at DESC 
LIMIT 20;
```

---

## 🚀 Deployment

### Local Testing

1. Open HTML files directly in browser
2. Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Visit `http://localhost:8000`

### Production Deployment

**Option 1: Netlify/Vercel**
```bash
# Push to GitHub
git add .
git commit -m "Add gift card system"
git push

# Connect repository to Netlify/Vercel
# Deploy automatically
```

**Option 2: Traditional Hosting**
- Upload all files via FTP to your hosting
- Ensure HTTPS is enabled for Supabase integration

---

## 📱 WhatsApp Integration

### How It Works

1. Customer fills out gift card purchase form
2. Form generates WhatsApp message with order details
3. Message opens in WhatsApp app/web
4. Customer sends message to restaurant
5. Restaurant confirms payment manually
6. Restaurant creates gift card in admin panel
7. Restaurant sends gift card code to customer

### WhatsApp Message Format

```
🎁 GIFT CARD ORDER

Amount: $100.00
━━━━━━━━━━━━━━━━━━

Purchased by: John Doe
Phone: (555) 123-4567

Recipient: Jane Smith

Message: Happy Birthday! Enjoy your meal!

━━━━━━━━━━━━━━━━━━

Please process this gift card order. Thank you! 🙏
```

---

## 🔮 Future Enhancements

### Phase 1: Payment Integration
- [ ] Stripe integration for online payments
- [ ] PayPal integration
- [ ] Auto-create gift cards on payment
- [ ] Email confirmations

### Phase 2: Advanced Features
- [ ] Email delivery of gift cards
- [ ] QR code generation
- [ ] Printable gift card designs
- [ ] Bulk gift card generation
- [ ] Gift card reload functionality

### Phase 3: Analytics
- [ ] Sales dashboard
- [ ] Redemption tracking
- [ ] Customer insights
- [ ] Revenue reports

### Phase 4: Mobile App
- [ ] iOS/Android app
- [ ] Push notifications
- [ ] Mobile wallet integration

---

## 📞 Support

### Getting Help

1. **Check this documentation** - Most issues are covered here
2. **Browser Console** - Check for JavaScript errors (F12)
3. **Supabase Logs** - Check database errors in dashboard
4. **Contact Support** - For technical issues

### Common Questions

**Q: Can I use this without Supabase?**
A: No, Supabase is required for the backend database. The free tier is sufficient for most restaurants.

**Q: How many gift cards can I issue?**
A: Unlimited! Supabase free tier allows 500MB database space (thousands of cards).

**Q: Can I customize the design?**
A: Yes! Edit `css/giftcard.css` and the HTML files to match your branding.

**Q: Is this secure?**
A: Yes, with RLS policies enabled, only you (admin) can create/modify cards. Customers can only check balances.

---

## 📄 License

This gift card system is provided as-is for your restaurant website. Feel free to modify and customize as needed.

---

## ✅ Checklist

Before going live:

- [ ] Supabase account created
- [ ] Database setup (ran `supabase-setup.sql`)
- [ ] API credentials configured in `supabase-config.js`
- [ ] WhatsApp number updated in config
- [ ] Tested gift card purchase flow
- [ ] Tested balance checking
- [ ] Tested cart redemption
- [ ] Admin panel accessible
- [ ] All pages have gift card navigation link
- [ ] RLS policies verified
- [ ] Mobile responsiveness tested
- [ ] Cross-browser testing completed

---

**🎉 Congratulations! Your gift card system is ready to use!**
