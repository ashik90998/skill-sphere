import Instructors from "@/components/hompage/Instructors";
import LearningTips from "@/components/hompage/LearningTips";
import PopulerCorses from "@/components/hompage/PopulerCorses";
import TrendingCourse from "@/components/hompage/TrendingCourse";

import Banner from "@/components/shared/Banner";


export default function Home() {
  return (
    <div>
      <Banner />
      <div className="container lg:w-10/12 mx-auto py-10 my-10 px-5">
        <PopulerCorses />
        
        <hr className="text-gray-200 mt-10" />
        <div>
          <LearningTips />

          <hr className="text-gray-200 mt-10" />
          <Instructors />

          <hr className="text-gray-200 mt-10" />
          <TrendingCourse />

          <hr className="text-gray-200 mt-10" />
        </div>
      </div>
    </div>
  );
}
