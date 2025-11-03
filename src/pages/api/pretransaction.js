import crypto from 'crypto';

// JazzCash ke liye proper date-time format function
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

function getJazzCashExpiryDateTime() {
  const now = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// JazzCash compatible transaction reference number
function generateJazzCashTxnRef() {
  // Simple numeric timestamp-based reference
  return Date.now().toString();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, email, phone, name } = req.body;
    
    try {
      // JazzCash credentials
      const merchantId = process.env.JAZZCASH_MERCHANT_ID;
      const password = process.env.JAZZCASH_PASSWORD;
      const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const returnUrl = `${baseUrl}/api/posttransaction`;
      
      console.log('Return URL:', returnUrl);

      // JazzCash compatible references - FIXED
      const txnRefNo = generateJazzCashTxnRef();
      const billReference = txnRefNo; // Same as transaction reference
      
      // JazzCash payload - ALL FIELDS CORRECTED
      const payload = {
        pp_Version: '1.1',
        pp_TxnType: 'MWALLET',
        pp_Language: 'EN',
        pp_MerchantID: merchantId,
        pp_SubMerchantID: '',
        pp_Password: password,
        pp_BankID: 'TB',
        pp_ProductID: 'RETL',
        pp_TxnRefNo: txnRefNo,
        pp_Amount: (amount * 100).toString(),
        pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: getJazzCashDateTime(),
        pp_BillReference: billReference, // FIXED: Same as TxnRefNo
        pp_Description: 'Product Purchase',
        pp_TxnExpiryDateTime: getJazzCashExpiryDateTime(),
        pp_ReturnURL: returnUrl,
        pp_SecureHash: '',
        ppmpf_1: name || 'Customer Name',
        ppmpf_2: email || 'customer@example.com',
        ppmpf_3: phone || '03001234567',
        ppmpf_4: '',
        ppmpf_5: ''
      };

      console.log('All References:', {
        txnRefNo: payload.pp_TxnRefNo,
        billReference: payload.pp_BillReference
      });

      // Secure hash generate karein
      const hashablePayload = { ...payload };
      delete hashablePayload.pp_SecureHash;
      
      const sortedValues = Object.values(hashablePayload)
        .filter(value => value !== '')
        .sort()
        .join('&');
      
      console.log('String for Hash:', sortedValues);
      
      const secureHash = crypto
        .createHash('sha256')
        .update(sortedValues + integritySalt)
        .digest('hex')
        .toUpperCase();

      payload.pp_SecureHash = secureHash;

      console.log('Generated Secure Hash:', secureHash);

      res.status(200).json({
        success: true,
        orderId: txnRefNo,
        payload: payload,
        jazzcashUrl: process.env.JAZZCASH_GATEWAY_URL,
        amount: amount
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