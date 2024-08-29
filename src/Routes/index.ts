import { User } from "firebase/auth";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePages = lazy(() =>
  import("@/Pages/Home").then(({ Home }) => ({ default: Home }))
);
const AuthPages = lazy(() =>
  import("@/Pages/Login").then(({ Login }) => ({ default: Login }))
);
const ProductPages = lazy(() =>
  import("@/Pages/Product").then(({ Product }) => ({ default: Product }))
);
const TalentPages = lazy(() =>
  import("@/Pages/Talent").then(({ Talent }) => ({ default: Talent }))
);
const QuizPages = lazy(() =>
  import("@/Pages/Quiz").then(({ Quiz }) => ({ default: Quiz }))
);

const routes = (isAuth: User | null): RouteObject[] => {
  return [
    {
      path: "/",
      Component: HomePages,
    },
    {
      path: "/login",
      Component: AuthPages,
    },
    {
      path: "/quiz",
      Component: isAuth ? QuizPages : AuthPages,
    },
    {
      path: "/products",
      Component: ProductPages,
    },
    {
      path: "/products/:productId",
      Component: ProductPages,
    },
    {
      path: "/talents",
      Component: TalentPages,
    },
  ];
};

export default routes;
