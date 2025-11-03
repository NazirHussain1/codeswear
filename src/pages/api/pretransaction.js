import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, email, phone } = req.body;
    
    try {
      // JazzCash credentials
      const merchantId = process.env.JAZZCASH_MERCHANT_ID;
      const password = process.env.JAZZCASH_PASSWORD;
      const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;
      
      // IMPORTANT: Base URL check karein
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const returnUrl = `${baseUrl}/api/posttransaction`;
      
      console.log('Return URL:', returnUrl);

      // Unique order ID
      const orderId = 'T' + Date.now() + Math.random().toString(36).substring(2, 8);
      
      // JazzCash payload - FIXED VALUES
      const payload = {
        pp_Version: '1.1',
        pp_TxnType: 'MWALLET',
        pp_Language: 'EN',
        pp_MerchantID: merchantId,
        pp_SubMerchantID: '',
        pp_Password: password,
        pp_BankID: 'TB',
        pp_ProductID: 'RETL',
        pp_TxnRefNo: orderId,
        pp_Amount: (amount * 100).toString(), // Convert to paisas
        pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: new Date().toISOString().replace(/[-:]/g, '').split('.')[0],
        pp_BillReference: 'billRef',
        pp_Description: 'Order Payment',
        pp_TxnExpiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0],
        pp_ReturnURL: returnUrl,
        pp_SecureHash: '',
        ppmpf_1: '1', // Integer value for customer email
        ppmpf_2: '2', // Integer value for customer mobile
        ppmpf_3: '3',
        ppmpf_4: '4',
        ppmpf_5: '5'
      };

      // Secure hash generate karein
      const sortedValues = Object.values(payload)
        .filter(value => value !== '' && value !== payload.pp_SecureHash)
        .sort()
        .join('&');
      
      const secureHash = crypto
        .createHash('sha256')
        .update(sortedValues + integritySalt)
        .digest('hex')
        .toUpperCase();

      payload.pp_SecureHash = secureHash;

      console.log('JazzCash Payload:', payload);

      res.status(200).json({
        success: true,
        orderId: orderId,
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