import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post, UseGuards, UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TopPageService } from "./top-page.service";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { TOP_PAGE_NOT_FOUND } from "./top-page.constants";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@ApiTags('Top-Page')
@Controller("top-page")
export class TopPageController {

    constructor(private readonly topPageService: TopPageService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async get(@Param("id", IdValidationPipe) id: string) {
        const topPage = await this.topPageService.getById(id);
        if(!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND);
        }
        return topPage;
    }

    @Get("byAlias/:alias")
    async getByAlias(@Param("alias") alias: string) {
        const topPage = await this.topPageService.findByAlias(alias);
        if(!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND);
        }
        return topPage;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async delete(@Param("id", IdValidationPipe) id: string) {
        const deletedTopPage = await this.topPageService.delete(id);
        if(!deletedTopPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch(":id")
    async patch(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
        return this.topPageService.updateById(id, dto);
    }

    @UsePipes(new ValidationPipe())
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }


    @Get('textSearch/:text')
    async textSearch(@Param("text") text: string) {
        return this.topPageService.findByText(text);
    }
}
