import { PrismaClient, Category } from '@prisma/client';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/responseFormatter';

const prisma = new PrismaClient();

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      include: { products: true }
    });

    successResponse(res, 200, categories, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const getCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category: Category | null = await prisma.category.findUnique({
      where: { id: +id },
      include: { products: true }
    });

    if (!category) {
      return errorResponse(res, 404, category, 'Category Not Found');
    }

    successResponse(res, 200, category, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const addCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    const category: Category = await prisma.category.create({
      data: { name },
      include: { products: true }
    });

    successResponse(res, 200, category, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category: Category | null = await prisma.category.delete({
      where: { id: +id },
      include: { products: true }
    });

    if (!category) {
      return errorResponse(res, 404, category, 'Category Not Found');
    }

    successResponse(res, 200, category, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const patchCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category: Category | null = await prisma.category.update({
      where: { id: +id },
      include: { products: true },
      data: { name }
    });

    if (!category) {
      return errorResponse(res, 404, category, 'Category Not Found');
    }

    successResponse(res, 200, category, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};
