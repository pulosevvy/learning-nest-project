import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post, UseGuards,
    UsePipes, ValidationPipe
} from "@nestjs/common";
import { ProductModel } from "./product.model";
import { FindProductDto } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { PRODUCT_NOT_FOUND_ERROR } from "./product.constants";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";


@ApiTags('Product')
@Controller("product")
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Create Product'})
    @ApiResponse({status: 200})
    @Post("create")
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get One Product'})
    @ApiResponse({status: 200})
    @Get(":id")
    async get(@Param("id", IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
        return product;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Delete Product'})
    @ApiResponse({status: 200})
    @Delete(":id")
    async delete(@Param("id", IdValidationPipe) id: string) {
        const deletedProduct = await this.productService.deleteById(id)
        if (!deletedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Update Product'})
    @ApiResponse({status: 200})
    @Patch(":id")
    async patch(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
        const updatedProduct = await this.productService.updateById(id, dto);
        if (!updatedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
        return updatedProduct;
    }

    @ApiOperation({summary: 'Find Product'})
    @ApiResponse({status: 200})
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
