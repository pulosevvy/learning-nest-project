import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { CreateReviewDto } from "../src/review/dto/create-review.dto";
import { Types, disconnect } from "mongoose";
import DoneCallback = jest.DoneCallback;

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Test Title',
    description: 'Description Test',
    rating: 5,
    productId
}

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/review/create (POST)", async () => {
        return request(app.getHttpServer())
          .post("/review/create")
          .send(testDto)
          .expect(201)
          .then(({  body  }: request.Response) => {
              createdId = body._id;
              expect(createdId).toBeDefined();
          })

    });

    it("/review/:id (DELETE)", () => {
        return request(app.getHttpServer())
            .delete('/review/'+ createdId)
            .expect(200)
    })

    afterAll(() => {
        disconnect();
    })

});
