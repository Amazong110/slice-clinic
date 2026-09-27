import "../styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import HeaderServer from "../components/HeaderServer";
import Footer from "../components/footer";

export const metadata = {
  title: "Northvale Clinic",
  description:
    "Primary care and family medicine — demo site for Slice Lab. Not medical advice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderServer />
        <main>{children}</main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
