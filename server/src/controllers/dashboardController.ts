import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDashboardMetrics = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        console.log("Getting Dashboard".blue)

        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc',
            },
        })
        

        // SALES SUMMARY
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        })

        // SALES SUMMARY
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        })

        // SALES SUMMARY
        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        })

        // SALES SUMMARY
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        })
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item:any) => ({
                ...item,
                amount: item.amount.toString()
            })
        )

        console.log("Dahsboard successfully retrieved".rainbow)

        res.json({
            success: true,
            message: "Dashboard successfully retrived",
            data: {
                popularProducts: popularProducts,
                salesSummary: salesSummary,
                purchaseSummary: purchaseSummary,
                expenseSummary: expenseSummary,
                expenseByCategorySummary: expenseByCategorySummary
            }
        })

    } catch (error) {
        console.log("Error fetching dashboard", error)
        res.status(500).json({
            success: false,
            message: "Error retrieving dashboard metrics"
        })
    }
}