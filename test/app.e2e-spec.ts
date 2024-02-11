import { Test } from "@nestjs/testing";
import * as pactum from "pactum";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DbService } from "../src/db/db.service";
import { AuthDto } from "src/auth/dto";
import { EditUserDto } from "src/user/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let db: DbService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(5000);

    db = app.get(DbService);
    await db.cleanDb();

    pactum.request.setBaseUrl("http://localhost:5000");
  });

  afterAll(() => {
    app.close();
  });

  describe("Auth", () => {
    const dto: AuthDto = {
      email: "example@gmail.com",
      password: "12345",
    };
    describe("Register", () => {
      it("User registered", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody(dto)
          .expectStatus(201);
      });
      it("Email empty exception", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it("Password empty exception", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it("No request body exception", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({})
          .expectStatus(400);
      });
    });
    describe("Login", () => {
      it("User registered", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody(dto)
          .expectStatus(200)
          .stores("userAccessToken", "access_token");
      });
      it("Email empty exception", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it("Password empty exception", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it("No request body exception", () => {
        return pactum.spec().post("/auth/login").withBody({}).expectStatus(400);
      });
    });
  });

  describe("User", () => {
    describe("Get current user", () => {
      it("Current user got", () => {
        return pactum
          .spec()
          .get("/users/me")
          .withHeaders({ Authorization: "Bearer $S{userAccessToken}" })
          .expectStatus(200);
      });
    });
    describe("Edit user", () => {
      it("User edited", () => {
        const dto: EditUserDto = {
          firstName: "Balint",
          email: "balint.csefalvay@gmail.com",
        };
        return pactum
          .spec()
          .patch("/users")
          .withHeaders({ Authorization: "Bearer $S{userAccessToken}" })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe("Todos", () => {
    describe("Create todo", () => {});
    describe("Get todos", () => {});
    describe("Get todo by id", () => {});
    describe("Edit todo by id", () => {});
    describe("Delete todo by id", () => {});
  });
});
