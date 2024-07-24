import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AllRolesComponent } from "./all-roles/all-roles.component";
import { CreateRoleComponent } from "./create-role/create-role.component";

const routes: Routes = [
  {
    path: "",
    component: AllRolesComponent,
  },
  {
    path: "create-role/:id",
    component: CreateRoleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
