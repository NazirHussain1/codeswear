import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // JazzCash GET request mein data bhejta hai URL parameters ke through
      const responseData = req.query;
      const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;

      console.log('JazzCash Response:', responseData);

      if (!responseData.pp_ResponseCode) {
        return res.redirect(302, '/order-failed?error=invalid_response');
      }

      // Response verify karein
      const sortedValues = Object.values(responseData)
        .filter(value => value !== '' && value !== responseData.pp_SecureHash)
        .sort()
        .join('&');
      
      const calculatedHash = crypto
        .createHash('sha256')
        .update(sortedValues + integritySalt)
        .digest('hex')
        .toUpperCase();

      if (calculatedHash === responseData.pp_SecureHash) {
        // Hash verified
        if (responseData.pp_ResponseCode === '000') {
          // Payment successful
          console.log('Payment Successful for order:', responseData.pp_TxnRefNo);
          
          // Success page redirect karein
          res.redirect(302, `/order-success?orderId=${responseData.pp_TxnRefNo}&amount=${responseData.pp_Amount / 100}&txnId=${responseData.pp_TxnId}`);
        } else {
          // Payment failed
          console.log('Payment Failed. Response Code:', responseData.pp_ResponseCode);
          res.redirect(302, `/order-failed?orderId=${responseData.pp_TxnRefNo}&code=${responseData.pp_ResponseCode}&message=${responseData.pp_ResponseMessage}`);
        }
      } else {
        // Hash verification failed
        console.error('Hash verification failed');
        res.redirect(302, `/order-failed?orderId=${responseData.pp_TxnRefNo}&code=HASH_FAILED`);
      }
    } catch (error) {
      console.error('Post-transaction error:', error);
      res.redirect(302, '/order-failed?error=server_error');
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}