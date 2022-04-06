import ProductUploads from "../pages/admin/ProductUploads";
import ForgotPass from "../pages/authentication/ForgotPass";
import ResetPass from "../pages/authentication/ResetPass";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import DashbordPage from "../pages/basic/DashbordPage";
import Home from "../pages/basic/Home";
import SubCategory from "../pages/products/001SubCategory";
import ProductCatagory from "../pages/products/002ProductCatagory";
import SingleProductview from "../pages/products/003SingleProduct";

// acess to all child props : RoutesObj.home.path
//OBJECT STRUCTURE:: {KEY: VALUE}
// RoutesObj contains elem with structure = {name: string, path:string, ex: boolean, comp: JSX.Element}
export const RoutesObj = {
  visual: {
    /*Auth*/
    sign_in: { name: "Sign In", path: "/signin", comp: <SignIn />, ex: true },
    sign_up: { name: "Sign Up", path: "/signup", comp: <SignUp />, ex: true },
    forgot_pass: { name: "Forgot Password", path: "/forgot", comp: <ForgotPass />, ex: true },

    dash: { name: "Dash ", path: "/dash", comp: <DashbordPage />, ex: true },
    /*Admin  */
    admin: { name: "Admin ", path: "/admin", comp: <ProductUploads />, ex: true },

    /*Basic*/
    home: { name: "Home", path: "/", comp: <Home />, ex: true }
  },
  non_visual: {
    /*Auth*/
    reset_pass: { name: "Reset Password", path: "/reset", comp: <ResetPass />, ex: true },

    catsLanding: { name: "Cats Landing", path: "/cat/:type", comp: <SubCategory />, ex: false },
    subCatsLanding: { name: "Sub Cats Landing", path: "/subcat/:cat/:subcat", comp: <ProductCatagory />, ex: false },
    productsLanding: { name: "Product Landing", path: "/prod/:cat/:subcat/:index_id", comp: <SingleProductview />, ex: false }
  }
};

// Convert Object to an Array using built in js function
/* takes obj iterates over it and pushes each value into an array and returns the array back to us to use */
export const AllRoutes = Object.values(RoutesObj.visual);
