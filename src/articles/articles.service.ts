import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }

  async findOne(id: number) {
    return await this.prisma.article.findUnique({ 
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
