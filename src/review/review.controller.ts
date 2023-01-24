import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";

import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { REVIEW_NOT_FOUND } from "./review.constants";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserEmail } from "../decorators/user-email.decorator";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Review')
@Controller("review")
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    @ApiOperation({summary: 'Create Review'})
    @ApiResponse({status: 200})
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @ApiOperation({summary: 'Delete Review (only for admin)'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async delete(@Param("id", IdValidationPipe) id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation({summary: 'Get Review By Product Id'})
    @ApiResponse({status: 200})
    @Get("byProduct/:productId")
    async getByProduct(@Param("productId", IdValidationPipe) productId: string, @UserEmail() email: string) {
        console.log(email);
        return this.reviewService.findByProductId(productId);
    }

}
