import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { environment } from "@env/environment";
import { HttpParams, HttpClient } from "@angular/common/http";
import { RolesService } from "./roles.service";

describe("RolesService", () => {
    let service: RolesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RolesService, HttpClient],
        });
        service = TestBed.inject(RolesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should get", () => {
        const path = "path";
        const params = new HttpParams();
        const filters = [];
        const viewMode = "";
        service.getMethod(path, filters, viewMode).subscribe();
        const req = httpMock.expectOne(`${environment.baseurl}${path}`);
        expect(req.request.method).toBe("GET");
        expect(req.request.params).toEqual(params);
    });

    it("should put", () => {
        const path = "path";
        const body = {};
        service.putMethodJson(path, body).subscribe();
        const req = httpMock.expectOne(`${environment.baseurl}${path}`);
        expect(req.request.method).toBe("PUT");
        expect(req.request.body).toEqual(body);
    });

    it("should patch", () => {
        const path = "path";
        const body = {};
        service.patchMethodJson(path, body).subscribe();
        const req = httpMock.expectOne(`${environment.baseurl}${path}`);
        expect(req.request.method).toBe("PATCH");
        expect(req.request.body).toEqual(body);
    });

    it("should post", () => {
        const path = "path";
        const body = {};
        service.postMethodJson(path, body).subscribe();
        const req = httpMock.expectOne(`${environment.baseurl}${path}`);
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(body);
    });

    it("should delete", () => {
        const path = "path";
        const params = new HttpParams();
        service.deleteMethod(path, params).subscribe();
        const req = httpMock.expectOne(`${environment.baseurl}${path}`);
        expect(req.request.method).toBe("DELETE");
        expect(req.request.params).toEqual(params);
    });
});
