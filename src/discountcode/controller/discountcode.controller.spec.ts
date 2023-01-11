import { Test, TestingModule } from "@nestjs/testing";
import { DiscountcodeController } from "./discountcode.controller";

describe("DiscountcodeController", () => {
  let controller: DiscountcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountcodeController],
    }).compile();

    controller = module.get<DiscountcodeController>(DiscountcodeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
