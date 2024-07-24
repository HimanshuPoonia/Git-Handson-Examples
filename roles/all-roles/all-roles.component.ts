import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { RolesService } from "../roles.service";
import { SwalService } from "@services/swal.service";
import { UserPermissionService } from "@services/user-permission.service";
import { AuthGuard } from "@core/guards/auth.guard";
import { DataService } from "@core/services/data.service";
import { roleBasedTxt } from "@core/language/role.constant";
const subscribersList: Array<Subscription> = [];

@Component({
    selector: "app-all-roles",
    templateUrl: "./all-roles.component.html",
})
export class AllRolesComponent implements OnInit {
    roles: Array<any> = [];
    permission: any;
    isSuperAdmin: boolean = false;
    totalRecords = 0;
    enablePagination: boolean = true;
    tableHeaders = [
        {
            label: "Name",
            field: "name",
            displayType: "text",
            sort: true,
            filter: true,
            visible: true,
        },
        {
            label: "Created On",
            field: "createdOn",
            displayType: "dateTime",
            sort: true,
            filter: true,
            visible: true,
        },
        {
            label: "Two Factor Auth",
            field: "mfa",
            displayType: "number",
            sort: false,
            filter: false,
            visible: true,
        },
        {
            label: "Action",
            field: "TABLE-ACTIONS",
            sort: false,
            filter: false,
            visible: true,
        },
    ];

    defaultFilter = {
        filters: {},
        first: 0,
        forceUpdate: {},
        globalFilter: null,
        multiSortMeta: undefined,
        page: 1,
        rows: 10,
        sortField: "createdOn",
        sortOrder: -1,
    };
    constructor(
        private roleService: RolesService,
        private authGuard: AuthGuard,
        private permissionService: UserPermissionService,
        private swalService: SwalService,
        private dataService: DataService
    ) {}

    async ngOnInit() {
        this.authGuard.getUserDetails().subscribe((resp: any) => {
            if (resp?.issuperadmin && resp.issuperadmin === 1) {
                this.isSuperAdmin = true;
            } else {
                this.isSuperAdmin = false;
                this.tableHeaders.splice(2, 1);
            }
        });
        this.permission = await this.permissionService.getPermission([
            { moduleName: "roles", pageName: "role" },
            { moduleName: "users", pageName: "user" },
        ]);
    }

    async initTable(event?) {
        this.roles = [];
        let apiEndPoint = `role?rbav=all`;
        if (event && event !== undefined) {
            const { first, rows, sortOrder, sortField, filters, page } = event;
            apiEndPoint = `role?rbav=all&page=${page}&pageSize=${rows}&sortOrder=${sortOrder}&sortField=${
                sortField ? sortField : "createdOn"
            }&filters=${JSON.stringify(filters)}`;
        }
        this.dataService.reloadtableLoaderFlag({ loader: true });
        try {
            const resData = await this.roleService
                .getMethod(apiEndPoint, [])
                .toPromise();

            if (Array.isArray(resData.data) && resData.data.length > 0) {
                //this.roles = resData.data;
                this.roles = resData.data.map((item) => {
                    return {
                        ...item,
                        mfa: item.mfa === 1 ? "1" : "0",
                    };
                });
                this.dataService.reloadtableLoaderFlag({ loader: false });
            }

            this.totalRecords = resData.recordsTotal;
        } catch (error) {
            console.error(roleBasedTxt.ERR_IN, error);
            this.roles = [];
            this.dataService.reloadtableLoaderFlag({ loader: false });
        }
    }

    deleteAllSelected(event) {
        console.log(event);
    }

    getRoles() {
        subscribersList.push(
            this.roleService
                .getMethod(
                    `role?pagination=false`,
                    null,
                    this.permission[0].viewMode
                )
                .subscribe((resp: any) => {
                    if (resp.len) {
                        this.roles = resp;
                    }
                })
        );
    }

    async deleteRole(id) {
        const confirmResult = await this.swalService.confirm(
            roleBasedTxt.CNF_DL
        );
        if (!confirmResult) {
            return;
        }
        this.roleService
            .getMethod(`users/by-role/` + id, [])
            .subscribe((resp: any) => {
                if (resp.status) {
                    if (resp.data.length === 0) {
                        subscribersList.push(
                            this.roleService
                                .deleteMethod("role", {
                                    id: id,
                                })
                                .subscribe((resp2: any) => {
                                    if (resp2?.status) {
                                        this.initTable(this.defaultFilter);
                                        this.swalService.success(
                                            roleBasedTxt.SUC_DL
                                        );
                                    }
                                })
                        );
                    } else {
                        this.swalService.warning(roleBasedTxt.RL_DL_US);
                    }
                } else {
                    this.swalService.error(roleBasedTxt.SM_WRG);
                }
            });
    }

    ngOnDestroy() {
        subscribersList.forEach((subscriber) => {
            subscriber.unsubscribe();
        });
    }
}
