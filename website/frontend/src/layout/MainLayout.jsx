import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
      <Footer />
    </div>
  );
}
