import Cookies from "js-cookie";

import { DATA_KEY_USER_TYPE, USER_INSTRUCTOR } from "@/lib/constants";
import { ApplyBtn } from "./ApplyBtn";
import { AddBtn } from "./AddBtn";

export function Buttons() {
  const userType = Cookies.get(DATA_KEY_USER_TYPE);

  return (
    <div className="grid gap-2">
      <ApplyBtn />
      {userType === USER_INSTRUCTOR && <AddBtn />}
    </div>
  );
}
