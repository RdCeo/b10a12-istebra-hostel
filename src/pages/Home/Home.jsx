import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import MealsCategory from "../../components/MealsCategory/MealsCategory";
import MembershipSection from "../../components/MembershipSection/MembershipSection";
import WeeklyMealPlan from "../../components/WeeklyMealPlan/WeeklyMealPlan";

const Home = () => {
  return (
    <div className="pb-14">
      <Helmet>
        <title>Home || ISTEBRA HOSTEL</title>
      </Helmet>
      <Banner></Banner>
      <MembershipSection></MembershipSection>
      <MealsCategory></MealsCategory>
      <WeeklyMealPlan></WeeklyMealPlan>
    </div>
  );
};

export default Home;
