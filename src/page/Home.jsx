import ContactInfo from "../components/ContactInfo";
import EventFeatures from "../components/EventFeatures";
import FAQSection from "../components/FAQSection";
import HeroSection from "../components/HeroSection";
import OurReach from "../components/OurReach";

export default function Home() {
  return (
    <div>
    <HeroSection
      onRegisterClick={() => console.log("Register clicked!")}
      onLuckyDrawClick={() => console.log("Lucky Draw clicked!")}
    />
    {/* <EventCategories/> */}
    <EventFeatures/>
    <OurReach/>
    <ContactInfo/>
    <FAQSection/>
    </div>
  );
}
