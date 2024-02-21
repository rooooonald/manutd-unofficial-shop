import HeroBanner from "@/components/home/hero-banner";
import Featured from "@/components/home/featured/featured";
import CustomiseKit from "@/components/home/customise-kit/customise-kit";
import EmailSubscription from "@/components/home/email-subscription";
import Promotions from "@/components/home/promotions";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Featured />
      <CustomiseKit />
      <Promotions />
      <EmailSubscription />
    </main>
  );
}
