import Page from '../components/Page.jsx';

const faqs = [
  ['How fast is delivery?', 'Most orders arrive in 20-30 minutes depending on restaurant preparation and distance.'],
  ['Can I pay with UPI?', 'Yes, checkout supports Cash on Delivery, UPI, Credit Card, and Debit Card.'],
  ['Do you offer coupons?', 'Yes, coupons are automatically shown in the cart when an order qualifies.'],
  ['Can I track my order?', 'Yes, live tracking updates are part of the order flow and API design.']
];

export default function FAQ() {
  return (
    <Page className="page-shell">
      <div className="page-title"><span className="eyebrow">FAQ</span><h1>Answers before you order</h1></div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      </div>
    </Page>
  );
}
