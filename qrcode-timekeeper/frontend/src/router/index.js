import { createRouter, createWebHistory } from "vue-router";
import Manager from "../components/ManagerHome.vue";
import ManagerError from "../components/ManagerError.vue";
import AccountError from "../components/AccountError.vue";
import NewAccount from "../components/NewAccount.vue";
import EditAccount from "../components/EditAccount.vue";
import ClockInSuccess from "../components/ClockInSuccess.vue";
import ClockOutSuccess from "../components/ClockOutSuccess.vue";
import ConfirmClockInAccess from "../components/ConfirmClockInAccess.vue";
import ConfirmClockOutAccess from "../components/ConfirmClockOutAccess.vue";
import timeLogVue from "../components/timeLog.vue";
import SpecificTimeLogVue from "../components/SpecificTimeLog.vue";
import Audits from "../components/Audits.vue";
import Admin from "../components/Admin.vue";
import UpdateManager from "../components/UpdateManager.vue";
import PromoteManager from "../components/PromoteManager.vue";
import RemoveManager from "../components/RemoveManager.vue";
// import QRCode from '../components/QRCode.vue'
import SpecificAudit from "../components/SpecificAudit.vue";
import Incompletes from "../components/Incompletes.vue";
import Home from "../components/Home.vue";
import IncompleteClockOutVue from "../components/IncompleteClockOut.vue";
const routes = [
  //   {
  //     path: '/manager',
  //     name: 'Home',
  //     component: QRCode
  //   },
  {
    path: "/manager",
    name: "Manager",
    component: Manager,
  },
  {
    path: "/managererror",
    name: "ManagerError",
    component: ManagerError,
  },
  {
    path: "/",
    name: "QRHome",
    component: Home,
  },
  {
    path: "/accounterror",
    name: "AccountError",
    component: AccountError,
  },
  {
    path: "/newaccount",
    name: "NewAccount",
    component: NewAccount,
  },
  {
    path: "/editaccount",
    name: "EditAccount",
    component: EditAccount,
  },
  {
    path: "/clockinsuccess",
    name: "ClockInSuccess",
    component: ClockInSuccess,
  },
  {
    path: "/timelog",
    name: "TimeLog",
    component: timeLogVue,
  },
  {
    path: "/specifictimelog/:entry_id",
    name: "SpecificTimeLog",
    component: SpecificTimeLogVue,
  },
  {
    path: "/clockoutsuccess",
    name: "ClockOutSuccess",
    component: ClockOutSuccess,
  },
  {
    path: "/confirmclockinaccess",
    name: "ConfirmClockInAccess",
    component: ConfirmClockInAccess,
  },
  {
    path: "/confirmclockoutaccess",
    name: "ConfirmClockOutAccess",
    component: ConfirmClockOutAccess,
  },
  {
    path: "/audits",
    name: "Audits",
    component: Audits,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/updatemanager",
    name: "Update Manager",
    component: UpdateManager,
  },
  {
    path: "/promotemanager",
    name: "Promote manager",
    component: PromoteManager,
  },
  {
    path: "/removemanager",
    name: "Remove manager",
    component: RemoveManager,
  },
  {
    path: "/specificaudit",
    name: "SpecificAudit",
    component: SpecificAudit,
  },
  {
    path: "/incompletes",
    name: "Incompletes",
    component: Incompletes,
  },
  {
    path: "/incompleteClockOut",
    name: "IncompleteClockOut",
    component: IncompleteClockOutVue,
  }

  //   {
  //     path: '/about',
  //     name: 'About',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: About  }
];
const router = createRouter({
  history: createWebHistory(""),
  routes,
});
export default router;
