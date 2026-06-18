import Page from '../components/Page.jsx';

export default function Contact() {
  return (
    <Page className="page-shell">
      <div className="page-title"><span className="eyebrow">Contact</span><h1>We are here for every craving</h1></div>
      <div className="checkout-layout">
        <form className="form-card" onSubmit={(event) => event.preventDefault()}>
          <label>Name<input required /></label>
          <label>Email<input type="email" required /></label>
          <label>Message<textarea rows="5" required /></label>
          <button className="button full">Send Message</button>
        </form>
        <section className="panel">
          <h2>About Us</h2>
          <p>Pratik Food Delivery connects customers with trusted local restaurants through a fast, simple, and reliable ordering experience.</p>
          <p>Email: support@pratikfood.com</p>
          <p>Phone: +91 98765 43210</p>
        </section>
      </div>
    </Page>
  );
}
