import crypto from 'crypto';

function getJazzCashDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, email, phone, name } = req.body;
    
    try {
      const merchantId = process.env.JAZZCASH_MERCHANT_ID;
      const password = process.env.JAZZCASH_PASSWORD;
      const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const returnUrl = `${baseUrl}/api/posttransaction`;

      const txnRefNo = Date.now().toString();
      const paymentAmount = parseFloat(amount);
      
      // ✅ Amount conversion - YEHI NORMAL HAI
      const amountInPaisas = Math.round(paymentAmount * 100).toString();
      
      console.log('Amount:', {
        'Aapka amount': paymentAmount + ' Rs.',
        'JazzCash ko jayega': amountInPaisas + ' paisas'
      });

      // ✅ SIMPLE PAYLOAD - without ppmpf fields
      const payload = {
        pp_Version: '1.1',
        pp_TxnType: '',
        pp_Language: 'EN',
        pp_MerchantID: merchantId,
        pp_Password: password,
        pp_BankID: '',
        pp_ProductID: '',
        pp_TxnRefNo: txnRefNo,
        pp_Amount: amountInPaisas, // ✅ YEH THEEK HAI - 379900 means 3799 Rs.
        pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: getJazzCashDateTime(),
        pp_BillReference: '',
        pp_Description: 'Order Payment',
        pp_TxnExpiryDateTime: getJazzCashDateTime(),
        pp_ReturnURL: returnUrl,
        pp_SecureHash: '',
        // ❌ NO ppmpf_1, ppmpf_2, etc.
      };

      // Secure hash
      const hashablePayload = { ...payload };
      delete hashablePayload.pp_SecureHash;
      
      const sortedValues = Object.values(hashablePayload)
        .filter(value => value !== '')
        .sort()
        .join('&');
      
      const secureHash = crypto
        .createHash('sha256')
        .update(sortedValues + integritySalt)
        .digest('hex')
        .toUpperCase();

      payload.pp_SecureHash = secureHash;

      res.status(200).json({
        success: true,
        orderId: txnRefNo,
        payload: payload,
        jazzcashUrl: process.env.JAZZCASH_GATEWAY_URL,
        amount: paymentAmount
      });

    } catch (error) {
      console.error('JazzCash pre-transaction error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Payment initialization failed: ' + error.message 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}