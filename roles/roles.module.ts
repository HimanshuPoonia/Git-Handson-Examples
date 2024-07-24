import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { RolesRoutingModule } from "./roles-routing.module";
import { PipesModule } from "../../core/pipes/pipes.module";
import { AllRolesComponent } from "./all-roles/all-roles.component";
import { CreateRoleComponent } from "./create-role/create-role.component";
import { SharedComponentsModule } from "../../shared/shared-components/shared-components.module";
import { TableModule } from "primeng/table";
import { RolesService } from "./roles.service";
import { SwalService } from "src/app/core/services/swal.service";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { HeaderPageSectionModule } from "@shared/header-page-section/header-page-section.module";
import {SharedDataGridModule} from "@shared/primeng-table/shared-data-grid.module";
import { TooltipModule } from "primeng/tooltip";
import {NoAccessModule} from "@shared/no-access/no-access.module";


@NgModule({
    declarations: [
        AllRolesComponent,
        CreateRoleComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RolesRoutingModule,
        PipesModule,
        DataTablesModule,
        TableModule,
        TooltipModule,
        SharedComponentsModule,
        HeaderPageSectionModule,
        SharedDataGridModule,
        NoAccessModule
    ],
    providers: [ RolesService, SwalService, AuthGuard],
})
export class RolesModule {}
