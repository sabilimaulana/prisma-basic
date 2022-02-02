import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';
import type { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/responseFormatter';

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: Product[] = await prisma.product.findMany({
      include: { category: true }
    });

    successResponse(res, 200, products, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product: Product | null = await prisma.product.findUnique({
      where: { id: +id },
      include: { category: true }
    });

    if (!product) {
      return errorResponse(res, 404, product, 'Product Not Found');
    }

    successResponse(res, 200, product, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, categoryId, quantity } = req.body;

    const product: Product = await prisma.product.create({
      data: { name, price, categoryId, quantity }
    });

    successResponse(res, 200, product, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product: Product | null = await prisma.product.delete({
      where: { id: +id },
      include: { category: true }
    });

    if (!product) {
      return errorResponse(res, 404, product, 'Product Not Found');
    }

    successResponse(res, 200, product, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};

export const patchProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, categoryId, price, quantity } = req.body;

    const product: Product | null = await prisma.product.update({
      where: { id: +id },
      include: { category: true },
      data: { name, categoryId, price, quantity }
    });

    if (!product) {
      return errorResponse(res, 404, product, 'Product Not Found');
    }

    successResponse(res, 200, product, 'Success');
  } catch (error) {
    errorResponse(res, 500, [], 'Internal Server Error');
  }
};
