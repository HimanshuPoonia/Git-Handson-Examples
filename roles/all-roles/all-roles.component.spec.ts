import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { RolesService } from "../roles.service";
import { SwalService } from "@services/swal.service";
import { UserPermissionService } from "@services/user-permission.service";
import { AllRolesComponent } from "./all-roles.component";

describe("AllRolesComponent", () => {
    let component: AllRolesComponent;
    let fixture: ComponentFixture<AllRolesComponent>;
    let dataServiceMock: Partial<RolesService>;
    let swalServiceMock: Partial<SwalService>;
    let userPermissionServiceMock: Partial<UserPermissionService>;

    beforeEach(() => {
        dataServiceMock = {
            getMethod: jest.fn().mockReturnValue(new Subject()),
            deleteMethod: jest.fn().mockReturnValue(new Subject()),
        };

        swalServiceMock = {
            confirm: jest.fn().mockResolvedValue(true),
            success: jest.fn(),
            warning: jest.fn(), // Make sure to include the warning function
            error: jest.fn(),
        };
        userPermissionServiceMock = {
            getPermission: jest.fn().mockReturnValue(true),
        };

        TestBed.configureTestingModule({
            declarations: [AllRolesComponent],
            providers: [
                { provide: RolesService, useValue: dataServiceMock },
                { provide: SwalService, useValue: swalServiceMock },
                {
                    provide: UserPermissionService,
                    useValue: userPermissionServiceMock,
                },
            ],
        });

        fixture = TestBed.createComponent(AllRolesComponent);
        component = fixture.componentInstance;
    });

    
    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should fetch data on calling getData", fakeAsync(() => {
        const mockData = [
            {
                id: "453e8b6a-8b00-4d63-a7bf-e395fa039448",
                clientId: 1,
                name: "New SR Roles",
                permission:
                    '{"dashboard":{"widget":{"view":true,"add":true,"configure":true,"permission":true,"clone":true,"move":true,"refresh":true,"delete":true},"dashboard":{"view":true,"add":true,"edit":true,"delete":true},"select":true},"documents":{"document":{"view":true,"add":true,"edit":true,"manageUser":true,"delete":true,"filters":true,"viewall":true},"form":{"view":true,"add":true,"edit":true,"delete":true,"formEmbed":true,"formShare":true,"viewall":true},"formEntry":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"pdf":{"pdfForm":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"pdfFormEntry":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"automation":{"mailTemplate":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"notificationTemplate":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"processBuilder":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"setting":{"general":{"view":true,"edit":true},"childCompanies":{"view":true,"add":true,"delete":true},"department":{"view":true,"add":true,"delete":true},"location":{"view":true,"add":true,"delete":true},"connectors":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"modules":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"navigation":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"users":{"user":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"roles":{"role":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"customskinning":{"basicsetting":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"typography":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"sharedcomponenet":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"themesaving":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true},"fireDetections":{"firemodule":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"select":true}}',
                isDefaultRole: 0,
                createdBy: "198adfd7-3659-4022-b58f-091d63247dd9",
                createdOn: "2023-07-11T08:22:49.252Z",
                appId: "1",
                description: null,
            },
            {
                id: "5e3b1198-9335-485e-a743-de7fa1e1e6c1",
                clientId: 1,
                name: "Test New Roles 2",
                permission:
                    '{"dashboard":{"widget":{"view":true,"add":true,"configure":true,"permission":true,"clone":true,"move":true,"refresh":true,"delete":true},"dashboard":{"view":true,"add":true,"edit":true,"delete":true}},"documents":{"document":{"view":false,"add":false,"edit":false,"manageUser":false,"delete":false,"filters":false,"viewall":false},"form":{"view":false,"add":false,"edit":false,"delete":false,"formEmbed":false,"formShare":false,"viewall":false},"formEntry":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}},"pdf":{"pdfForm":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"pdfFormEntry":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}},"automation":{"mailTemplate":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"notificationTemplate":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"processBuilder":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"select":false},"setting":{"general":{"view":true,"edit":true},"childCompanies":{"view":true,"add":true,"delete":true},"department":{"view":true,"add":true,"delete":true},"location":{"view":true,"add":true,"delete":true},"connectors":{"view":true,"add":true,"edit":true,"delete":true,"viewall":true},"modules":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"navigation":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}},"users":{"user":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}},"roles":{"role":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}},"customskinning":{"basicsetting":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"typography":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"sharedcomponenet":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false},"themesaving":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}},"fireDetections":{"firemodule":{"view":false,"add":false,"edit":false,"delete":false,"viewall":false}}}',
                isDefaultRole: 0,
                createdBy: "198adfd7-3659-4022-b58f-091d63247dd9",
                createdOn: "2023-07-11T08:41:19.540Z",
                appId: "1",
                description: null,
            },
        ];
        dataServiceMock.getMethod = jest.fn(() =>
            of({ data: mockData, status: true })
        );

        component.initTable();
        tick(); // Simulate passage of time for the observable

        expect(component.roles).toEqual(mockData);
    }));

    it("should delete a role successfully when confirmation is true and no users are assigned", fakeAsync(() => {
        const mockRoleData = {
            id: "role_id_1",
            // ... (other role data properties)
        };
        const mockUserData = {
            status: true,
            data: [],
        };
        const initTableStub = jest.fn();

        jest.spyOn(component, 'initTable').mockImplementation(initTableStub);

        dataServiceMock.getMethod = jest.fn(() =>
            of(mockUserData)
        );
        dataServiceMock.deleteMethod = jest.fn(() =>
            of({ status: true })
        );

        component.deleteRole(mockRoleData.id);
        tick();

        // Verify the calls
        expect(swalServiceMock.confirm).toHaveBeenCalled();
        expect(dataServiceMock.getMethod).toHaveBeenCalledWith(`users/by-role/${mockRoleData.id}`, []);
        expect(dataServiceMock.deleteMethod).toHaveBeenCalledWith("role", { id: mockRoleData.id });
        expect(component.initTable).toHaveBeenCalled(); // Check if it's been called
        expect(swalServiceMock.success).toHaveBeenCalledWith("Roles Delete successfully");
        expect(swalServiceMock.warning).not.toHaveBeenCalled();
        expect(swalServiceMock.error).not.toHaveBeenCalled();
    }));

    it("should show a warning message when confirmation is true and users are assigned", fakeAsync(() => {
        const mockRoleData = {
            id: "role_id_2",
            // ... (other role data properties)
        };
        const mockUserData = {
            status: true,
            data: [{}],
        };
    
        // Provide a stub implementation for initTable
        const initTableStub = jest.fn();
    
        // Create a spy using jest.spyOn and provide the stub implementation
        jest.spyOn(component, 'initTable').mockImplementation(initTableStub);
    
        dataServiceMock.getMethod = jest.fn(() =>
            of(mockUserData)
        );
    
        component.deleteRole(mockRoleData.id);
        tick();
    
        // Verify the calls
        expect(swalServiceMock.confirm).toHaveBeenCalled();
        expect(dataServiceMock.getMethod).toHaveBeenCalledWith(`users/by-role/${mockRoleData.id}`, []);
        expect(dataServiceMock.deleteMethod).not.toHaveBeenCalled();
        // expect(initTableStub).toHaveBeenCalled(); // Check if it's been called
        expect(swalServiceMock.warning).toHaveBeenCalledWith("Roles can't be deleted because its already assigned to some users.");
        expect(swalServiceMock.success).not.toHaveBeenCalled();
        expect(swalServiceMock.error).not.toHaveBeenCalled();
    }));
    
    
    


    //     swalServiceMock.confirm = jest.fn().mockResolvedValue(true);
    //     dataServiceMock.deleteMethod = jest.fn().mockReturnValue(new Subject());
    //     await component.deleteRole("5e3b1198-9335-485e-a743-de7fa1e1e6c1");
    //     const mockData = [
    //         {
    //             id: "c96ebc25-935e-438d-8eb1-7d1d1ffb0b95",
    //             clientId: 1,
    //             roleId: "5e3b1198-9335-485e-a743-de7fa1e1e6c1",
    //             isSuperAdmin: 0,
    //             userManager: null,
    //             firstName: "new ",
    //             lastName: "role_test",
    //             email: "rm89jj@mailinator.com",
    //             username: "new _role_test",
    //             state: "Uttar Pradesh",
    //             city: "varanasi",
    //             zipCode: "221010",
    //             address: "Ny",
    //             country: "India",
    //             mobile: "4445559999",
    //             isActive: 1,
    //             profileUrl: null,
    //             createdOn: "2023-08-03T03:35:09.580Z",
    //         },
    //     ];
    //     dataServiceMock.getMethod = jest.fn(() =>
    //         of({ data: mockData, status: true })
    //     );
    //   component.id =
    //     expect(swalServiceMock.confirm).toHaveBeenCalled();
    //     expect(dataServiceMock.deleteMethod).toHaveBeenCalledWith("role", {
    //         id: "5e3b1198-9335-485e-a743-de7fa1e1e6c1",
    //     });
    //     expect(swalServiceMock.success).toHaveBeenCalledWith(
    //         "Role deleted Successfully !"
    //     );
    //     // Test other assertions related to deleting entry
    // });
});
