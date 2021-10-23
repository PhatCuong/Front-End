import { PAGE_NAMES, ROUTE_PATHS } from "@/constants";
import Home from "@/components/pages/home/Home";
import Profile from "@/components/pages/profile/Profile";

const routes = [
    {
        name: PAGE_NAMES.HOME,
        path: ROUTE_PATHS[PAGE_NAMES.HOME],
        component: Home,
    },
    {
        name: PAGE_NAMES.PROFILE,
        path: ROUTE_PATHS[PAGE_NAMES.PROFILE],
        component: Profile,
    },
];

export { routes };
