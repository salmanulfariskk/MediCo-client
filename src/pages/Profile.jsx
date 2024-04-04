import EditProfile from "@/components/EditProfile";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
function Profile() {
const {currentUser} = useSelector((state)=>state.user)
  return (
    <div>
      <Header2 />
      <div className="flex justify-center bg-[#EBF5FF]">
        <div className="w-[350px] sm:w-[600px] h-96 sm:h-[400px] bg-slate-300 my-32 rounded-lg shadow-2xl relative">
          <div class="flex justify-center items-center flex-col mt-10">
            <img src={currentUser.userData.photo} alt="image" class="w-20 h-20 rounded-full" />
            <h1 className="text-xl font-semibold mt-3">{currentUser.userData.name}</h1>
          </div>
          <div className="flex flex-col gap-3 mt-6 items-center justify-center">
            <p className="font-medium">Email:<span className="ml-2 font-medium">{currentUser.userData.email}</span></p>
            <p className="font-medium">Email:<span className="ml-2 font-medium">{currentUser.userData.mobile}</span></p>
            <p className="font-medium">Age:<span className={currentUser.userData.age ? "ml-2 font-medium" : "ml-2 font-medium text-red-600"}>{currentUser.userData.age ? currentUser.userData.age : "not added"}</span></p>
            <p className="font-medium">Gender:<span className={currentUser.userData.gender ? "ml-2 font-medium" : "ml-2 font-medium text-red-600"}>{currentUser.userData.gender ? currentUser.userData.gender : "not added"}</span></p>
          </div>
          <div className="absolute bottom-2 left-2">
            <EditProfile />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;