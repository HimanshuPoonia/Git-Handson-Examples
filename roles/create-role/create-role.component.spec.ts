import {
    ComponentFixture,
    TestBed,
    tick,
    fakeAsync,
} from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { CreateRoleComponent } from "./create-role.component";
import { RolesService } from "../roles.service";
import { SwalService } from "@services/swal.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("CreateRoleComponent", () => {
    let component: CreateRoleComponent;
    let fixture: ComponentFixture<CreateRoleComponent>;
    let mockRouter: any;
    let activatedRouteStub: any;
    let mockDataService: Partial<RolesService>;
    let mockSwalService: Partial<SwalService>;

    beforeEach(() => {
        mockDataService = {
            getMethod: jest.fn(() => of({})),
            deleteMethod: jest.fn(() => of({})),
            patchMethodJson: jest.fn(() => of({ status: true })),
            postMethodJson: jest.fn(() => of({ data: {}, status: true })),
        };

        mockSwalService = {
            success: jest.fn(),
            error: jest.fn(),
        };

        mockRouter = {
            navigateByUrl: jest.fn(),
        };

        activatedRouteStub = {
            params: of({ id: "1" }),
            snapshot: {
                params: {
                    id: "1",
                },
            },
        };

        TestBed.configureTestingModule({
            declarations: [CreateRoleComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [
                { provide: RolesService, useValue: mockDataService },
                { provide: SwalService, useValue: mockSwalService },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: mockRouter },
            ],
        });
        fixture = TestBed.createComponent(CreateRoleComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should get default role from getDefaulteRole", fakeAsync(() => {
        const defaultRole = [
            {
                key: "module1",
                mod: [{ key: "page1", mod: { permission1: true } }],
            },
        ];
        mockDataService.getMethod = jest.fn(() =>
            of({ data: defaultRole, status: true })
        );

        component.getDefaulteRole();
        tick();
    }));

    it("should initialize roleDetails and other properties in the constructor", () => {
        expect(component.roleDetails).toEqual({
            name: "",
            description: "",
            is_default_role: 0,
        });
        expect(component.viewPage).toEqual("permission");
        expect(component.permissionId).toEqual("1"); // Replace with the desired ID value
    });

    it("should initialize getModuleName", fakeAsync(() => {
        component.getModuleName("test");
        tick();
    }));

    it("should initialize getPageName", fakeAsync(() => {
        component.getPageName("test");
        tick();
    }));

    it("should initialize isTypeOfPermission", fakeAsync(() => {
        component.isTypeOfPermission("test");
        tick();
    }));

    it("should initialize isTypeOfPermission", fakeAsync(() => {
        component.isTypeOfPermission("test");
        tick();
    }));
    it("should fetch data on calling getMenuItem", fakeAsync(() => {
        const mockData = [
            {
                components: [],
                name: "Section",
                type: "section",
                sectionTextColor: "#000000",
                sectionBgColor: "#ffffff",
                menuItems: [],
            },
            {
                components: [],
                name: "Section",
                type: "section",
                sectionTextColor: "#000000",
                sectionBgColor: "#ffffff",
                menuItems: [],
            },
        ];

        // Update the mock response to return a valid JSON string
        mockDataService.getMethod = jest.fn(() =>
            of({ data: { menu: JSON.stringify(mockData) }, status: true })
        );
        component.getMenuItem();
        tick();

        expect(component.allMenuList).toEqual(mockData);
    }));

    it("should handle updating with valid data", () => {
        const mockRoleDetails = {
            name: "Test Role",
            description: "Test Description",
            is_default_role: 0,
        };

        component.roleDetails = mockRoleDetails;
        component.allmods = [
            {
                key: "module1",
                mod: [{ key: "page1", mod: { permission1: true } }],
            },
        ];
        component.permissionId = "123";

        jest.spyOn(mockDataService, "patchMethodJson").mockReturnValue(
            of({ status: true })
        ); // Using jest.spyOn to mock the method
        component.save();

        expect(mockDataService.patchMethodJson).toHaveBeenCalledWith(
            `role/123`,
            {
                name: "Test Role",
                description: "Test Description",
                permission: {
                    module1: {
                        page1: {
                            permission1: true,
                        },
                        select: undefined,
                    },
                },
            }
        );
        expect(mockSwalService.success).toHaveBeenCalledWith(
            "Role Updated Successfully !"
        );
    });

    it("should handle saving with valid data", fakeAsync(() => {
        const mockRoleDetails = {
            name: "Test Role",
            description: "Test Description",
            is_default_role: 0,
        };

        component.roleDetails = mockRoleDetails;
        component.allmods = [
            {
                key: "module1",
                mod: [{ key: "page1", mod: { permission1: true } }],
            },
        ];
        component.permissionId = "-1";

        jest.spyOn(mockDataService, "postMethodJson").mockReturnValue(
            of({ data: { id: "mockId" }, status: true })
        );

        component.save();
        tick();
        expect(mockDataService.postMethodJson).toHaveBeenCalledWith("role", {
            name: "Test Role",
            description: "Test Description",
            permission: {
                module1: {
                    page1: {
                        permission1: true,
                    },
                    select: undefined,
                },
            },
        });

        // Check that mockSwalService.success was called with the correct argument
        expect(mockSwalService.success).toHaveBeenCalledWith(
            "Role Created Successfully !"
        );
    }));

    it("should initialize roleDetails and allmods in _ngOnInit", async () => {
        mockDataService.getMethod = jest.fn(() =>
            of({
                data: {
                    name: "Test Role",
                    description: "Test Description",
                    permission: {
                        module1: {
                            page1: {
                                permission1: true,
                            },
                            select: undefined,
                        },
                    },
                },
                status: true,
            })
        );
        component._ngOnInit();
        expect(mockDataService.getMethod).toHaveBeenCalled();
    });
    it("should call ngOnInit", () => {
        //component.route.snapshot.params.id = "1";
        component.ngOnInit();
    });
    it("should get module name for dashboard", () => {
        let modulename = component.getModuleName("dashboard");
        expect(modulename).toEqual("Dashboard");
    });
    it("should get module name for documents", () => {
        let modulename = component.getModuleName("documents");
        expect(modulename).toEqual("Documents");
    });
    it("should get module name for pdf", () => {
        let modulename = component.getModuleName("pdf");
        expect(modulename).toEqual("PDF");
    });
    it("should get module name for automation", () => {
        let modulename = component.getModuleName("automation");
        expect(modulename).toEqual("Automation");
    });
    it("should get module name for setting", () => {
        let modulename = component.getModuleName("setting");
        expect(modulename).toEqual("Setting");
    });
    it("should get module name for users", () => {
        let modulename = component.getModuleName("users");
        expect(modulename).toEqual("Users");
    });
    it("should get module name for roles", () => {
        let modulename = component.getModuleName("roles");
        expect(modulename).toEqual("Roles");
    });
    it("should get module name for customskinning", () => {
        let modulename = component.getModuleName("customskinning");
        expect(modulename).toEqual("Custom Skinning");
    });
    it("should get module name for fireDetections", () => {
        let modulename = component.getModuleName("fireDetections");
        expect(modulename).toEqual(" Fire Detection");
    });
    it("should get page name for formEntry", () => {
        let pagename = component.getPageName("formEntry");
        expect(pagename).toEqual("Form Entry");
    });
    it("should get page name for pdfForm", () => {
        let pagename = component.getPageName("pdfForm");
        expect(pagename).toEqual("PDF Form");
    });
    it("should get page name for pdfFormEntry", () => {
        let pagename = component.getPageName("pdfFormEntry");
        expect(pagename).toEqual("PDF Form Entry");
    });
    it("should get page name for mailTemplate", () => {
        let pagename = component.getPageName("mailTemplate");
        expect(pagename).toEqual("Mail Template");
    });
    it("should get page name for notificationTemplate", () => {
        let pagename = component.getPageName("notificationTemplate");
        expect(pagename).toEqual("Notification Template");
    });
    it("should get page name for processBuilder", () => {
        let pagename = component.getPageName("processBuilder");
        expect(pagename).toEqual("Process Builder");
    });
    it("should get page name for childCompanies", () => {
        let pagename = component.getPageName("childCompanies");
        expect(pagename).toEqual("Child Companies");
    });
    it("should get page name for basicsetting", () => {
        let pagename = component.getPageName("basicsetting");
        expect(pagename).toEqual("Basic Setting");
    });
    it("should get page name for typography", () => {
        let pagename = component.getPageName("typography");
        expect(pagename).toEqual("Typography");
    });
    it("should get page name for sharedcomponenet", () => {
        let pagename = component.getPageName("sharedcomponenet");
        expect(pagename).toEqual("Shared Components");
    });
    it("should get page name for themesaving", () => {
        let pagename = component.getPageName("themesaving");
        expect(pagename).toEqual("Theme Saving");
    });

    it("should call selectMenu",()=>{
        component.allMenuList = [
            {
                components: [],
                name: "Section",
                type: "section",
                sectionTextColor: "#000000",
                sectionBgColor: "#ffffff",
                menuItems: [
                    {
                        id:1
                    }
                ],
                roles: [{ id: 1, name: "Admin"}],
                tempid:1
            },
            {
                components: [],
                name: "Section",
                type: "section",
                sectionTextColor: "#000000",
                sectionBgColor: "#ffffff",
                menuItems: [{id:2}],
                roles: [{ id: 1, name: "Admin"}],
                tempid:2
            },
        ];

        component.selectMenu(true,1);
        expect(component).toBeTruthy();
    });



    it("should call function onSubmit", async () => {
        component.onSubmit();
        component.allMenuList = [
            {
                components: [],
                name: "Section",
                type: "section",
                sectionTextColor: "#000000",
                sectionBgColor: "#ffffff",
                menuItems: [],
            },
            {
                components: [],
                name: "Section",
                type: "section",
                sectionTextColor: "#000000",
                sectionBgColor: "#ffffff",
                menuItems: [],
            },
        ];
        mockDataService
            .patchMethodJson("navigation", {
                menu: JSON.stringify(component.allMenuList),
            })
            .subscribe(
                (resData: any) => {
                    if (resData.status) {
                        expect(mockSwalService.error).toHaveBeenCalledWith(
                            "Menu Setting Updated Successfully !"
                        );
                    }
                },
                (resError: any) => {
                    console.error("resError", resError);
                }
            );
    });
    it("should call function changeScreen", () => {
        let temp = "navigation";
        component.changeScreen(temp);
        component.viewPage = temp;
    });
});
