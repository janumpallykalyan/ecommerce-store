import { Test, TestingModule } from "@nestjs/testing";
import { DiscountcodeService } from "./discountcode.service";

describe("DiscountcodeService", () => {
  let service: DiscountcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountcodeService],
    }).compile();

    service = module.get<DiscountcodeService>(DiscountcodeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
