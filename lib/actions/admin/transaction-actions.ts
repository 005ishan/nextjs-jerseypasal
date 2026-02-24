"use server";

export async function handleGetAllTransactions(page: string = "1", size: string = "5", search: string = "") {
  try {
    const pageNum = parseInt(page);
    const pageSize = parseInt(size);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const result = await response.json();
    
    // Your API returns { success: true, data: transactions[] }
    const allTransactions = result.data || [];
    
    // Simple search filter
    let filteredTransactions = allTransactions;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTransactions = allTransactions.filter((t: any) => 
        t.productName?.toLowerCase().includes(searchLower) ||
        t.transactionId?.toLowerCase().includes(searchLower) ||
        t.userId?.toLowerCase().includes(searchLower)
      );
    }
    
    // Simple pagination
    const total = filteredTransactions.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredTransactions.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedData,
      pagination: {
        total,
        totalPages,
        currentPage: pageNum,
        pageSize
      }
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      success: false,
      data: [],
      pagination: {
        total: 0,
        totalPages: 1,
        currentPage: parseInt(page),
        pageSize: parseInt(size)
      }
    };
  }
}