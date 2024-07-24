import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SwalService } from "@services/swal.service";
import { Subscription } from "rxjs/Subscription";
import { RolesService } from "../roles.service";
import { AuthGuard } from "@core/guards/auth.guard";
import { SettingService } from "@modules/setting/setting.service";
import { roleBasedTxt } from "@core/language/role.constant";
const subscribersList: Array<Subscription> = [];

@Component({
    selector: "app-create-role",
    templateUrl: "./create-role.component.html",
    styleUrls: ["./create-role.component.scss"],
})
export class CreateRoleComponent implements OnInit, OnDestroy {
    allmods = [];
    errors: any = {};
    roleDetails: any = {
        name: "",
        description: "",
        is_default_role: 0,
    };
    viewPage: string = "permission";
    permissionId: string = null;
    allMenuList = [];
    submitsuccess: boolean;
    loginRedirectUrl: string = "";
    items = [];
    showNavigation: boolean;
    isSuperAdmin: boolean = false;

    constructor(
        private dataService: RolesService,
        private authGuard: AuthGuard,
        private route: ActivatedRoute,
        private router: Router,
        private swalService: SwalService,
        private settingService: SettingService
    ) {
        subscribersList.push(
            this.route.params.subscribe((resp: any) => {
                if (resp?.id) {
                    this.permissionId = resp.id;
                    if (this.permissionId && this.permissionId !== "-1") {
                        this.showNavigation = true;
                    }
                }
                this._ngOnInit();
                this.getMenuItem();
            })
        );
    }

    ngOnInit(): void {
        this.permissionId = this.route.snapshot.params.id;
        this.authGuard.getUserDetails().subscribe((resp: any) => {
            if (resp?.issuperadmin && resp.issuperadmin === 1) {
                this.isSuperAdmin = true;
            } else {
                this.isSuperAdmin = false;
            }
        });
    }

    async _ngOnInit() {
        this.allmods = [];
        const allmods = await this.getDefaulteRole();
        if (this.permissionId && this.permissionId !== "-1") {
            subscribersList.push(
                this.dataService
                    .getMethod("role/" + this.permissionId, [])
                    .subscribe((resp: any) => {
                        if (resp?.status) {
                            this.roleDetails.name = resp.data.name;
                            this.roleDetails.description =
                                resp.data.description;
                            this.roleDetails.mfa = resp.data.mfa
                                ? resp.data.mfa
                                : 0;
                            this.roleDetails.is_default_role =
                                resp.data.isDefaultRole;

                            if (resp.data?.permission) {
                                this.setPermission(
                                    allmods,
                                    resp.data.permission
                                );
                            }
                        }
                    })
            );
        } else {
            this.setPermission(allmods, {});
        }
    }

    getDefaulteRole() {
        let allRoles = {};
        return new Promise((resolve) => {
            subscribersList.push(
                this.dataService.getMethod("role/default", []).subscribe(
                    (resp: any) => {
                        allRoles = resp.data;
                        resolve(allRoles);
                    },
                    (resError: any) => {
                        resolve(allRoles);
                    }
                )
            );
        });
    }

    setPermission(allmods, updatedMods) {
        const dataSet = [];
        Object.keys(allmods).forEach((r, rk) => {
            const allmod = {
                id: rk,
                key: r,
                mod: [],
                select: false,
            };
            allmods[r].select = updatedMods[r]?.select || false;
            Object.keys(allmods[r]).forEach((o, k) => {
                const modPermission = {};
                const updatedModsPermission =
                    updatedMods && updatedMods[r] && updatedMods[r][o]
                        ? updatedMods[r][o]
                        : {};
                let permissionList = Object.keys(allmods[r][o]);

                for (let p of permissionList) {
                    modPermission[p] = updatedModsPermission[p] ? true : false;
                }
                allmod.select = allmods[r].select;
                allmod.mod.push({ key: o, mod: modPermission });
            });
            dataSet.push(allmod);
        });
        this.allmods = dataSet;
    }

    getModuleName(type) {
        let moduleName = "";
        switch (type) {
            case "dashboard":
                moduleName = "Dashboard";
                break;
            case "documents":
                moduleName = "Documents";
                break;
            case "pdf":
                moduleName = "PDF";
                break;
            case "automation":
                moduleName = "Automation";
                break;
            case "setting":
                moduleName = "Setting";
                break;
            case "users":
                moduleName = "Users";
                break;
            case "roles":
                moduleName = "Roles";
                break;
            case "customskinning":
                moduleName = "Custom Skinning";
                break;
            case "fireDetections":
                moduleName = " Fire Detection";
                break;
            case "datamigrators":
                moduleName = "Data Migrators";
                break;
            case "pagebuilder":
                moduleName = "Page Builder";
                break;
            case "genAI":
                moduleName = "Gen AI";
                break;
            case "Formmapper":
                moduleName = "Form Mapper";
                break;
            case "versionhistory":
                moduleName = "Version History";
                break;
            case "contractform":
                moduleName = "Contract Form";
                break;
            case "vendordata":
                moduleName = "Vendor Data";
                break;
            case "ocr":
                moduleName = "OCR";
                break;
            case "modules":
                moduleName = "Module";
                break;
            case "assessment":
                moduleName = "Assessment";
                break;
            case "inviteusers":
                moduleName = "Invite users";
                break;
            case "relationBuilder":
                moduleName = "Data Relation Builder";
                break;
            default:
                moduleName = type;
                break;
        }

        return moduleName;
    }

    getPageName(type) {
        let pageName = "";

        switch (type) {
            case "formEntry":
                pageName = "Form Entry";
                break;
            case "pdfForm":
                pageName = "PDF Form";
                break;
            case "pdfFormEntry":
                pageName = "PDF Form Entry";
                break;
            case "mailTemplate":
                pageName = "Mail Template";
                break;
            case "notificationTemplate":
                pageName = "Notification Template";
                break;
            case "processBuilder":
                pageName = "Process Builder";
                break;
            case "childCompanies":
                pageName = "Child Companies";
                break;
            case "basicsetting":
                pageName = "Basic Setting";
                break;
            case "typography":
                pageName = "Typography";
                break;
            case "sharedcomponenet":
                pageName = "Shared Components";
                break;
            case "themesaving":
                pageName = "Theme Saving";
                break;
            case "signupConfiguration":
                pageName = "Signup Configuration";
                break;
            case "defaultlandingpage":
                pageName = "Default landing page";
                break;
            case "analystad":
                pageName = "Analyst ad";
                break;
            case "crawlerindexer":
                pageName = "Crawler indexer";
                break;
            case "pagebuilder":
                pageName = "Page builder";
                break;
            case "datamigrator":
                pageName = "Data migrator";
                break;
            case "mailAccount":
                pageName = "Mail Account";
                break;
            case "keywordCategory":
                pageName = "Email keyword Category";
                break;
            case "escalationLevel":
                pageName = "Escalation Level";
                break;
            case "dataChat":
                pageName = "Data Chat";
                break;
            case "ocrConfig":
                pageName = "OCR Config";
                break;
            case "contractForm":
                pageName = "Contract Form Config ";
                break;
            case "inviteuser":
                pageName = "Invite user";
                break;
            case "activeSessions":
                pageName = "Active Sessions  ";
                break;
            case "vendordata":
                pageName = "Vendor Data ";
                break;
            case "contractform":
                pageName = "Contract form";
                break;
            case "customheader":
                pageName = "Custom Header";
                break;
            case "customNavigation":
                pageName = "Custom Navigation  ";
                break;
            case "customFooter":
                pageName = "Custom Footer    ";
                break;
            case "Componentstheming":
                pageName = "Components Theming   ";
                break;
            case "relationBuilder":
                pageName = "RelationBuilder ";
                break;
            case "versionhistory":
                pageName = "Version History   ";
                break;

            default:
                pageName = type;
                break;
        }

        return pageName;
    }

    isTypeOfPermission(permission) {
        return typeof permission !== "undefined";
    }

    updateValue(event, module, page, type) {
        this.allmods[module]["mod"][page]["mod"][type] = event;
    
        if (!event) {
            this.allmods[module][type] = false;
        } else {
            let ev = true;
            let newevent = true;

            this.allmods[module].mod.forEach((m, mK) => {
                Object.keys(m["mod"]).forEach((p) => {
                    if (this.allmods[module].mod[mK]["mod"][type] === false) {
                        ev = false; 
                        newevent = false; 

                    }
                    if (this.allmods[module].mod[mK]["mod"][p] === false) {
                        newevent = false; 
                        ev = false; 

                    }
                });
            });
            this.allmods[module][type] = ev;
        }
        // }
    }

    // checkUncheck(event, module) {
    //     this.allmods[module].mod["select"] = event;
    //     this.allmods[module].mod.forEach((m, mK) => {
    //         Object.keys(m["mod"]).forEach((p) => {
    //             this.allmods[module].mod[mK]["mod"][p] = event;
    //         });
    //     });
    // }

    checkUncheckPermission(event, module, type) {
        this.allmods[module].mod["select"] = event;
        this.allmods[module].mod.forEach((m, mK) => {
            Object.keys(m["mod"]).forEach((p) => {
                console.log(p, "p event data");
                if (type == "select") {
                    this.allmods[module].mod[mK]["mod"][p] = event;
                    this.allmods[module][p]=event;
                } else if (type !== "select" && p === type) {
                    this.allmods[module].mod[mK]["mod"][p] = event;
                }

                
            });
            
        });
       

    }

    checkSaveError() {
        let errors = false;
        this.roleDetails.name = this.roleDetails.name.trim();
        this.roleDetails.description = this.roleDetails.description.trim();
        if (!this.roleDetails.name || this.roleDetails.name === "") {
            errors = true;
            this.errors["name"] = roleBasedTxt.REQ_AL;
        }
        if (
            !this.roleDetails.description ||
            this.roleDetails.description === ""
        ) {
            errors = true;
            this.errors["description"] = roleBasedTxt.REQ_AL;
        }
        return errors;
    }

    save() {
        if (this.roleDetails?.is_default_role === 1) {
            this.swalService.error(roleBasedTxt.SYS_ED);
            return;
        }
        this.errors = {};
        let errors = this.checkSaveError();
        if (errors) {
            return;
        }

        const allmods = {};
        this.allmods.forEach((r, rk) => {
            const allmod = {};
            r.mod.forEach((o) => {
                allmod[o.key] = o.mod;
            });
            allmods[r.key] = allmod;
            allmods[r.key]["select"] = r.mod?.select ? r.mod.select : r.select;
            allmods[r.key]["view"] = r.mod?.view ? r.mod.view : r.view;
            allmods[r.key]["add"] = r.mod?.add ? r.mod.add : r.add;
            allmods[r.key]["edit"] = r.mod?.edit ? r.mod.edit : r.edit;
            allmods[r.key]["delete"] = r.mod?.delete ? r.mod.delete : r.delete;
        });

        if (this.permissionId && this.permissionId !== "-1") {
            this.updateRole(allmods);
            return;
        }
        this.addRole(allmods);
    }

    updateRole(allmods) {
        subscribersList.push(
            this.dataService
                .patchMethodJson(`role/${this.permissionId}`, {
                    name: this.roleDetails.name,
                    description: this.roleDetails.description,
                    mfa: this.roleDetails.mfa ? this.roleDetails.mfa : 0,
                    permission: allmods,
                })
                .subscribe((resp: any) => {
                    if (resp?.status) {
                        this.swalService.success(roleBasedTxt.SUC_UP);
                    }
                })
        );
    }

    addRole(allmods) {
        subscribersList.push(
            this.dataService
                .postMethodJson("role", {
                    name: this.roleDetails.name,
                    description: this.roleDetails.description,
                    mfa: this.roleDetails.mfa ? this.roleDetails.mfa : 0,
                    permission: allmods,
                })
                .subscribe((resp: any) => {
                    if (resp?.status && resp?.data?.id) {
                        this.showNavigation = true;
                        this.permissionId = resp?.data?.id;
                        this.swalService.success(roleBasedTxt.SUC_SV);
                        this.router.navigateByUrl("/roles");
                    } else if (resp.error === "maxUserLimit") {
                        this.swalService.error(roleBasedTxt.MAX_LT_RD);
                    }
                })
        );
    }

    getMenuItem() {
        subscribersList.push(
            this.dataService.getMethod(`navigation`, null).subscribe(
                async (resData: any) => {
                    if (resData.data) {
                        let dataArray = JSON.parse(resData.data.menu);
                        const data =
                            await this.settingService.setParentChildComponent(
                                dataArray
                            );
                        this.items = data;
                        if (this.items[0].type !== "section") {
                            this.allMenuList.push({
                                name: "Section",
                                type: "section",
                                sectionTextColor: "#000000",
                                sectionBgColor: "#ffffff",
                                menuItems: data.map((a) => {
                                    if (!a["components"]) {
                                        a.components = [];
                                    }
                                    return a;
                                }),
                            });
                        } else {
                            this.allMenuList = data.map((ab) => {
                                if (!ab["components"]) {
                                    ab.components = [];
                                }
                                return ab;
                            });
                        }
                        if (resData.data?.loginRedirectUrl) {
                            this.loginRedirectUrl =
                                resData.data.loginRedirectUrl;
                        }
                    }
                },
                (resError: any) => {
                    console.error("resError", resError);
                }
            )
        );
    }

    selectMenu(checked, tempId) {
        for (let allMenu of this.allMenuList) {
            if (allMenu?.menuItems?.length > 0) {
                this.selectMenuItems(checked, tempId, allMenu);
            }
            if (allMenu.tempId === tempId) {
                let newRole = allMenu.roles
                    ? JSON.parse(JSON.stringify(allMenu.roles))
                    : "";
                if (checked) {
                    allMenu.roles = newRole + ',"' + this.permissionId + '"';
                } else {
                    let roleArray = newRole.split(",");
                    roleArray.splice(
                        roleArray.indexOf('"' + this.permissionId + '"'),
                        1
                    );
                    allMenu.roles = roleArray.toString();
                }
            }
        }
        //this.allMenuList.findIndex
    }

    selectMenuItems(checked, tempId, allMenu) {
        for (const menuItems of allMenu.menuItems) {
            if (menuItems.tempId === tempId) {
                let newRole = menuItems.roles
                    ? JSON.parse(JSON.stringify(menuItems.roles))
                    : "";
                if (checked) {
                    menuItems.roles = newRole + ',"' + this.permissionId + '"';
                } else {
                    let role_Array = newRole.split(",");
                    role_Array.splice(
                        role_Array.indexOf('"' + this.permissionId + '"'),
                        1
                    );
                    menuItems.roles = role_Array.toString();
                }
            }
        }
    }

    submenuSelect(checked, tempId) {
        for (let menuList of this.allMenuList) {
            if (menuList?.menuItems && menuList?.menuItems.length > 0) {
                this.submeSelectMenuItems(menuList, tempId, checked);
            }
        }
    }

    submeSelectMenuItems(menuList, tempId, checked) {
        for (let menuItems of menuList.menuItems) {
            if (menuItems?.components && menuItems?.components.length > 0) {
                this.submenuSelectItems(menuItems, tempId, checked);
            }

            if (menuItems.tempId !== tempId) {
                continue;
            }
            let newRole = menuItems.roles
                ? JSON.parse(JSON.stringify(menuItems.roles))
                : "";
            if (checked) {
                menuItems.roles = newRole + ',"' + this.permissionId + '"';
                continue;
            }
            var roleArray = newRole.split(",");
            roleArray.splice(
                roleArray.indexOf('"' + this.permissionId + '"'),
                1
            );
            menuItems.roles = roleArray.toString();
        }
    }

    submenuSelectItems(menuItems, tempId, checked) {
        for (let m of menuItems.components) {
            if (m.tempId === tempId) {
                let newRole = m.roles
                    ? JSON.parse(JSON.stringify(m.roles))
                    : "";
                if (checked) {
                    m.roles = newRole + ',"' + this.permissionId + '"';
                } else {
                    let arrayRole = newRole.split(",");
                    arrayRole.splice(
                        arrayRole.indexOf('"' + this.permissionId + '"'),
                        1
                    );
                    m.roles = arrayRole.toString();
                }
            }
        }
    }

    async onSubmit() {
        let flatMenuList = await this.settingService.setFlatMenuList(
            this.allMenuList
        );
        subscribersList.push(
            this.dataService
                .patchMethodJson("navigation", {
                    menu: JSON.stringify(flatMenuList),
                })
                .subscribe(
                    (resData: any) => {
                        if (resData?.status) {
                            this.swalService.success(roleBasedTxt.MENU_UP_SUC);
                        }
                    },
                    (resError: any) => {
                        console.error("resError", resError);
                    }
                )
        );
    }

    getChecked(value) {
        let newRole = value ? JSON.parse(JSON.stringify(value)) : "";
        let roleArray = newRole.split(",");
        return roleArray.some((s) => s.includes(this.permissionId));
    }

    changeScreen(temp) {
        this.viewPage = temp;
    }

    ngOnDestroy() {
        subscribersList.forEach((subscriber) => {
            subscriber.unsubscribe();
        });
    }
}
