
// import React, { useEffect, useState } from "react";

// const AdminDashboard = () => {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5004/api/payments")
//       .then(response => response.json())
//       .then(data => setPayments(data))
//       .catch(error => console.error("Error fetching payments:", error));
//   }, []);

//   return (
//     <div>
//       <h2>Payments</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Payer ID</th>
//             <th>Amount</th>
//             <th>Currency</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((payment) => (
//             <tr key={payment._id}>
//               <td>{payment.orderId}</td>
//               <td>{payment.payerId}</td>
//               <td>{payment.amount}</td>
//               <td>{payment.currency}</td>
//               <td>{payment.status}</td>
//               <td>{new Date(payment.createdAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5004/api/payments");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPayments(data); // Assuming the API returns an array of payments
      } catch (error) {
        setError(error.message);
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Payments</h2>
      {error && <p>Error fetching payments: {error}</p>} {/* Display error message if any */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Payer ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.orderId}</td>
              <td>{payment.payerId}</td>
              <td>{payment.amount}</td>
              <td>{payment.currency}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
